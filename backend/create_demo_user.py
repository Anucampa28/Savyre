#!/usr/bin/env python3
"""
Script to create the demo user for login testing.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def create_demo_user():
    """Create the demo user"""
    db = SessionLocal()
    
    try:
        # Check if demo user already exists
        existing_user = db.query(User).filter(User.email == "demo@laksham.com").first()
        if existing_user:
            print("Demo user already exists. Skipping creation.")
            return existing_user
        
        # Create demo user
        demo_user = User(
            email="demo@laksham.com",
            hashed_password=get_password_hash("demo123"),
            first_name="Demo",
            last_name="User",
            is_verified=True
        )
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)
        print("Successfully created demo user: demo@laksham.com / demo123")
        return demo_user
        
    except Exception as e:
        print(f"Error creating demo user: {e}")
        db.rollback()
        return None
    finally:
        db.close()

if __name__ == "__main__":
    print("Creating demo user...")
    create_demo_user()
    print("Demo user creation completed!")
