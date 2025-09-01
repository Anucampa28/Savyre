#!/usr/bin/env python3
"""
Script to seed the database with debugging challenges from the assessment file.
Run this after setting up the database and models.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db import SessionLocal, engine
from app.models.question import Question
from app.models.assessment import Assessment, AssessmentQuestion
from app.models.user import User
from app.core.security import get_password_hash
import json

# Sample questions based on the assessment file
SAMPLE_QUESTIONS = [
    {
        "title": "Pagination off-by-one & duplicate/skip bug",
        "description": "Fix pagination logic that skips the first page and causes duplicates when clients switch sizes.",
        "buggy_snippet": """// GET /orders?page=p&size=s
function listOrders(p, s):
    if p < 1: p = 1
    start = p * s
    rows = db.query("SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?", [s, start])
    return rows""",
        "what_wrong": "Offset should be `(p-1)*s`. Current code skips first page and causes duplicates when clients switch sizes.",
        "fix_outline": "Use `offset = (p-1) * s` (guard s > 0), validate `size` max, add deterministic order (id, created_at). Prefer keyset/cursor pagination for large tables.",
        "solution": "Corrected SQL: SELECT * FROM orders ORDER BY id, created_at DESC LIMIT ? OFFSET ? with offset = (page-1) * size",
        "difficulty_level": "Easy",
        "category": "Database",
        "estimated_duration": 15,
        "programming_language": "SQL",
        "tags": ["pagination", "sql", "offset", "limit"],
        "rubric": {
            "identify_off_by_one": 3,
            "validate_page_size": 2,
            "deterministic_order": 1,
            "corrected_sql": 2,
            "cursor_pagination": 2
        }
    },
    {
        "title": "N+1 query via ORM includes",
        "description": "Fix the classic N+1 query problem that will hammer the database.",
        "buggy_snippet": """function getPosts():
    posts = ORM.findAll("Post", orderBy="created_at DESC")
    for post in posts:
        post.comments = ORM.findAll("Comment", where="post_id = ?", args=[post.id])
    return posts""",
        "what_wrong": "Classic N+1. Will hammer DB.",
        "fix_outline": "Use eager loading/join/fetch graph, e.g., `include=Comments` or `JOIN comments ON`. Or batch: `WHERE post_id IN (...)`.",
        "solution": "Use eager loading: ORM.findAll('Post', include='Comments', orderBy='created_at DESC')",
        "difficulty_level": "Medium",
        "category": "Database",
        "estimated_duration": 20,
        "programming_language": "JavaScript",
        "tags": ["n+1", "orm", "eager-loading", "performance"],
        "rubric": {
            "spot_n_plus_one": 3,
            "eager_batch_solution": 4,
            "maintain_order": 2,
            "pagination_consideration": 1
        }
    },
    {
        "title": "SQL injection in search endpoint",
        "description": "Fix the SQL injection vulnerability caused by string concatenation.",
        "buggy_snippet": """function searchUsers(q):
    sql = "SELECT * FROM users WHERE name LIKE '%" + q + "%'"
    return db.query(sql)""",
        "what_wrong": "String concatenation → injection.",
        "fix_outline": "Parameterized query: `WHERE name LIKE ?` with `%q%`. Escape wildcards, limit rows, add index and case-insensitive collation.",
        "solution": "Use parameterized query: SELECT * FROM users WHERE name LIKE ? LIMIT 100 with ['%' + q + '%']",
        "difficulty_level": "Easy",
        "category": "Security",
        "estimated_duration": 15,
        "programming_language": "SQL",
        "tags": ["sql-injection", "security", "parameterized-queries"],
        "rubric": {
            "identify_injection": 4,
            "use_parameters": 3,
            "escape_wildcards": 1,
            "add_limit_index": 2
        }
    },
    {
        "title": "Money math using float",
        "description": "Fix the binary float precision issue that causes rounding errors in financial calculations.",
        "buggy_snippet": """price = 19.99
qty = 3
total = price * qty   // stored in DOUBLE""",
        "what_wrong": "Binary float → rounding errors.",
        "fix_outline": "Use integer minor units (cents) or decimal/money type; round at boundaries.",
        "solution": "Use integer cents: price_cents = 1999, total_cents = price_cents * qty",
        "difficulty_level": "Medium",
        "category": "Data Types",
        "estimated_duration": 20,
        "programming_language": "Python",
        "tags": ["floating-point", "precision", "financial", "rounding"],
        "rubric": {
            "identify_float_issue": 4,
            "propose_decimal_int_cents": 4,
            "rounding_strategy": 2
        }
    },
    {
        "title": "Timezone & DST bug in daily report",
        "description": "Fix the timezone and daylight saving time issues in the daily reporting function.",
        "buggy_snippet": """function reportDay(dateStr): // "2025-08-27"
    start = parse(dateStr + " 00:00:00")
    end   = parse(dateStr + " 24:00:00")
    return sum(queryBetween(start, end))""",
        "what_wrong": "\"24:00:00\" invalid; DST days can be 23/25h; no timezone.",
        "fix_outline": "Use timezone-aware start at local midnight, end = start + 1 day (ZDT). Query `[start, end)`.",
        "solution": "Use timezone-aware: start = parse(dateStr + 'T00:00:00Z'), end = start + 1 day",
        "difficulty_level": "Hard",
        "category": "Time & Date",
        "estimated_duration": 25,
        "programming_language": "JavaScript",
        "tags": ["timezone", "dst", "datetime", "boundaries"],
        "rubric": {
            "identify_dst_window_issue": 4,
            "use_start_start_plus_1d": 3,
            "make_times_tz_aware": 3
        }
    }
]

def seed_questions():
    """Seed the database with sample questions"""
    db = SessionLocal()
    
    try:
        # Check if questions already exist
        existing_count = db.query(Question).count()
        if existing_count > 0:
            print(f"Database already contains {existing_count} questions. Skipping seed.")
            return
        
        # Create questions
        for question_data in SAMPLE_QUESTIONS:
            question = Question(**question_data)
            db.add(question)
        
        db.commit()
        print(f"Successfully seeded {len(SAMPLE_QUESTIONS)} questions.")
        
    except Exception as e:
        print(f"Error seeding questions: {e}")
        db.rollback()
    finally:
        db.close()

def create_sample_user():
    """Create a sample user if none exists"""
    db = SessionLocal()
    
    try:
        existing_user = db.query(User).first()
        if existing_user:
            print("Sample user already exists. Skipping user creation.")
            return existing_user
        
        # Create sample user
        user = User(
            email="admin@laksham.com",
            hashed_password=get_password_hash("admin123"),
            first_name="Admin",
            last_name="User",
            is_verified=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print("Successfully created sample user: admin@laksham.com / admin123")
        return user
        
    except Exception as e:
        print(f"Error creating sample user: {e}")
        db.rollback()
        return None
    finally:
        db.close()

if __name__ == "__main__":
    print("Seeding database with sample questions...")
    create_sample_user()
    seed_questions()
    print("Database seeding completed!")
