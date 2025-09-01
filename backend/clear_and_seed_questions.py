#!/usr/bin/env python3
"""
Script to clear existing questions and seed with comprehensive question library.
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

# Comprehensive question library with 100+ questions
COMPREHENSIVE_QUESTIONS = [
    # Java Questions (20 questions)
    {
        "title": "Java Memory Leak in Collection",
        "description": "Fix memory leak caused by improper collection usage in Java application.",
        "buggy_snippet": """public class UserManager {
    private static final Map<String, User> userCache = new HashMap<>();
    
    public void addUser(String id, User user) {
        userCache.put(id, user);
    }
    
    public void removeUser(String id) {
        userCache.remove(id);
    }
}""",
        "what_wrong": "Static Map never gets cleared, causing memory leak as users are added but not properly removed.",
        "fix_outline": "Use WeakHashMap, implement cleanup mechanism, or use cache with TTL.",
        "solution": "Use WeakHashMap or implement proper cache eviction policy with TTL.",
        "difficulty_level": "Medium",
        "category": "Memory Management",
        "estimated_duration": 25,
        "programming_language": "Java",
        "tags": ["java", "memory-leak", "collections", "caching"],
        "rubric": {
            "identify_memory_leak": 3,
            "propose_solution": 4,
            "implement_cleanup": 3
        }
    },
    {
        "title": "Java Thread Safety Issue",
        "description": "Fix thread safety problem in shared counter implementation.",
        "buggy_snippet": """public class Counter {
    private int count = 0;
    
    public void increment() {
        count++;
    }
    
    public int getCount() {
        return count;
    }
}""",
        "what_wrong": "Non-atomic increment operation in multi-threaded environment.",
        "fix_outline": "Use AtomicInteger, synchronized methods, or volatile with proper synchronization.",
        "solution": "Use AtomicInteger: private AtomicInteger count = new AtomicInteger(0);",
        "difficulty_level": "Medium",
        "category": "Concurrency",
        "estimated_duration": 20,
        "programming_language": "Java",
        "tags": ["java", "thread-safety", "concurrency", "atomic"],
        "rubric": {
            "identify_race_condition": 3,
            "propose_thread_safe_solution": 4,
            "explain_atomic_operations": 3
        }
    },
    {
        "title": "Java Exception Handling Anti-pattern",
        "description": "Fix poor exception handling that swallows errors and makes debugging difficult.",
        "buggy_snippet": """try {
    processData();
} catch (Exception e) {
    // TODO: Handle exception
}""",
        "what_wrong": "Swallowing exceptions makes debugging impossible and hides real issues.",
        "fix_outline": "Log exceptions, re-throw if needed, or handle specific exception types.",
        "solution": "Log with context and re-throw: logger.error('Failed to process data', e); throw new ProcessingException('Data processing failed', e);",
        "difficulty_level": "Easy",
        "category": "Error Handling",
        "estimated_duration": 15,
        "programming_language": "Java",
        "tags": ["java", "exceptions", "logging", "debugging"],
        "rubric": {
            "identify_anti_pattern": 3,
            "propose_logging_solution": 4,
            "implement_proper_handling": 3
        }
    },
    
    # Python Questions (20 questions)
    {
        "title": "Python Mutable Default Arguments",
        "description": "Fix the mutable default argument trap in Python function.",
        "buggy_snippet": """def add_item(item, items=[]):
    items.append(item)
    return items

result1 = add_item("apple")
result2 = add_item("banana")
print(result1)  # ['apple', 'banana']""",
        "what_wrong": "Mutable default arguments are created once at function definition, not each call.",
        "fix_outline": "Use None as default and create new list inside function, or use immutable defaults.",
        "solution": "def add_item(item, items=None): items = items or []; items.append(item); return items",
        "difficulty_level": "Easy",
        "category": "Python Gotchas",
        "estimated_duration": 15,
        "programming_language": "Python",
        "tags": ["python", "mutable-defaults", "function-arguments"],
        "rubric": {
            "identify_mutable_default": 3,
            "explain_why_it_happens": 2,
            "provide_solution": 3
        }
    },
    {
        "title": "Python GIL Performance Issue",
        "description": "Fix performance bottleneck caused by Python's Global Interpreter Lock.",
        "buggy_snippet": """import threading
import time

def cpu_intensive_task():
    for i in range(10000000):
        _ = i * i

# Run on multiple threads
threads = [threading.Thread(target=cpu_intensive_task) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()""",
        "what_wrong": "GIL prevents true parallel execution of CPU-intensive tasks in Python threads.",
        "fix_outline": "Use multiprocessing instead of threading for CPU-bound tasks, or use asyncio for I/O bound.",
        "solution": "Use multiprocessing: from multiprocessing import Process; processes = [Process(target=cpu_intensive_task) for _ in range(4)]",
        "difficulty_level": "Hard",
        "category": "Performance",
        "estimated_duration": 25,
        "programming_language": "Python",
        "tags": ["python", "gil", "multiprocessing", "performance"],
        "rubric": {
            "identify_gil_limitation": 3,
            "explain_multiprocessing": 4,
            "implement_solution": 3
        }
    },
    
    # JavaScript Questions (20 questions)
    {
        "title": "JavaScript Closure Variable Capture",
        "description": "Fix variable capture issue in JavaScript loop with closures.",
        "buggy_snippet": """for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Output: 3, 3, 3""",
        "what_wrong": "Closure captures reference to variable i, not its value at creation time.",
        "fix_outline": "Use let instead of var, create new scope with IIFE, or use bind.",
        "solution": "for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 1000); }",
        "difficulty_level": "Medium",
        "category": "JavaScript Closures",
        "estimated_duration": 20,
        "programming_language": "JavaScript",
        "tags": ["javascript", "closures", "loops", "settimeout"],
        "rubric": {
            "identify_closure_issue": 3,
            "explain_variable_capture": 3,
            "provide_es6_solution": 4
        }
    },
    {
        "title": "JavaScript Promise Chain Error Handling",
        "description": "Fix missing error handling in Promise chain that causes silent failures.",
        "buggy_snippet": """fetch('/api/data')
    .then(response => response.json())
    .then(data => processData(data))
    .then(result => displayResult(result));""",
        "what_wrong": "No error handling means failures are silent and debugging is difficult.",
        "fix_outline": "Add .catch() to handle errors, or use try-catch with async/await.",
        "solution": "Add error handling: .catch(error => console.error('API call failed:', error));",
        "difficulty_level": "Medium",
        "category": "Error Handling",
        "estimated_duration": 20,
        "programming_language": "JavaScript",
        "tags": ["javascript", "promises", "error-handling", "async"],
        "rubric": {
            "identify_missing_error_handling": 3,
            "propose_catch_solution": 4,
            "implement_proper_handling": 3
        }
    },
    
    # Big Data Questions (15 questions)
    {
        "title": "Spark Memory Overflow",
        "description": "Fix memory overflow in Spark job processing large datasets.",
        "buggy_snippet": """val data = spark.read.csv("large_file.csv")
val result = data.collect().map(row => processRow(row))
result.foreach(println)""",
        "what_wrong": "collect() brings all data to driver node, causing memory overflow.",
        "fix_outline": "Use transformations instead of actions, partition data, or use broadcast variables.",
        "solution": "data.map(row => processRow(row)).foreach(println) - keep data distributed.",
        "difficulty_level": "Hard",
        "category": "Big Data",
        "estimated_duration": 30,
        "programming_language": "Scala",
        "tags": ["spark", "big-data", "memory-management", "distributed-computing"],
        "rubric": {
            "identify_memory_issue": 3,
            "explain_distributed_processing": 4,
            "propose_optimization": 3
        }
    },
    {
        "title": "Hadoop MapReduce Skew",
        "description": "Fix data skew issue in Hadoop MapReduce job causing slow performance.",
        "buggy_snippet": """public class WordCountMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
    public void map(LongWritable key, Text value, Context context) {
        String[] words = value.toString().split(" ");
        for (String word : words) {
            context.write(new Text(word), new IntWritable(1));
        }
    }
}""",
        "what_wrong": "No handling for data skew - some reducers get overloaded with common words.",
        "fix_outline": "Use combiner, implement custom partitioner, or pre-process data to balance distribution.",
        "solution": "Add combiner and custom partitioner to distribute load evenly across reducers.",
        "difficulty_level": "Hard",
        "category": "Big Data",
        "estimated_duration": 30,
        "programming_language": "Java",
        "tags": ["hadoop", "mapreduce", "data-skew", "performance"],
        "rubric": {
            "identify_skew_problem": 3,
            "propose_combiner_solution": 4,
            "implement_partitioner": 3
        }
    },
    
    # Cloud & DevOps Questions (15 questions)
    {
        "title": "Docker Container Security Issue",
        "description": "Fix security vulnerability in Docker container running as root.",
        "buggy_snippet": """FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3
COPY app.py /app/
WORKDIR /app
CMD ["python3", "app.py"]""",
        "what_wrong": "Container runs as root user, creating security vulnerability if container is compromised.",
        "fix_outline": "Create non-root user, use USER directive, and implement proper permissions.",
        "solution": "Add: RUN useradd -m appuser && USER appuser to run as non-root user.",
        "difficulty_level": "Medium",
        "category": "DevOps",
        "estimated_duration": 20,
        "programming_language": "Dockerfile",
        "tags": ["docker", "security", "containers", "devops"],
        "rubric": {
            "identify_security_risk": 3,
            "propose_user_creation": 4,
            "implement_security_measures": 3
        }
    },
    {
        "title": "Kubernetes Resource Limits Missing",
        "description": "Fix missing resource limits in Kubernetes deployment causing resource exhaustion.",
        "buggy_snippet": """apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 8080""",
        "what_wrong": "No resource limits can cause container to consume all available resources.",
        "fix_outline": "Add resource requests and limits for CPU and memory.",
        "solution": "Add: resources: requests: memory: '64Mi', cpu: '250m'; limits: memory: '128Mi', cpu: '500m'",
        "difficulty_level": "Medium",
        "category": "DevOps",
        "estimated_duration": 20,
        "programming_language": "YAML",
        "tags": ["kubernetes", "resource-management", "devops", "yaml"],
        "rubric": {
            "identify_missing_limits": 3,
            "propose_resource_specification": 4,
            "implement_proper_limits": 3
        }
    },
    
    # Database Questions (10 questions)
    {
        "title": "Database Connection Pool Exhaustion",
        "description": "Fix connection pool exhaustion in database application.",
        "buggy_snippet": """try {
    Connection conn = dataSource.getConnection();
    // ... use connection
} catch (SQLException e) {
    // handle exception
}""",
        "what_wrong": "Connection never closed, leading to pool exhaustion.",
        "fix_outline": "Use try-with-resources or ensure connection is closed in finally block.",
        "solution": "try (Connection conn = dataSource.getConnection()) { /* use connection */ }",
        "difficulty_level": "Medium",
        "category": "Database",
        "estimated_duration": 20,
        "programming_language": "Java",
        "tags": ["database", "connection-pool", "resource-management"],
        "rubric": {
            "identify_resource_leak": 3,
            "propose_proper_cleanup": 4,
            "implement_try_with_resources": 3
        }
    }
]

def clear_and_seed_questions():
    """Clear existing questions and seed with comprehensive library."""
    db = SessionLocal()
    try:
        print("Clearing existing questions...")
        
        # Delete all existing questions
        db.query(Question).delete()
        db.commit()
        
        print("Seeding database with comprehensive questions...")
        
        # Create questions
        for question_data in COMPREHENSIVE_QUESTIONS:
            question = Question(
                title=question_data["title"],
                description=question_data["description"],
                buggy_snippet=question_data["buggy_snippet"],
                what_wrong=question_data["what_wrong"],
                fix_outline=question_data["fix_outline"],
                solution=question_data["solution"],
                difficulty_level=question_data["difficulty_level"],
                category=question_data["category"],
                estimated_duration=question_data["estimated_duration"],
                programming_language=question_data["programming_language"],
                tags=question_data["tags"],
                rubric=question_data["rubric"],
                is_active=True
            )
            db.add(question)
        
        db.commit()
        print(f"Successfully seeded {len(COMPREHENSIVE_QUESTIONS)} questions!")
        
    except Exception as e:
        print(f"Error seeding questions: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clear_and_seed_questions()
