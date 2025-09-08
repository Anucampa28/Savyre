from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from typing import Generator
import os

# Base class for application database models
class Base(DeclarativeBase):
    pass

# Database configurations
DATABASE_CONFIGS = {
    "app": {
        "url": os.getenv("APP_DATABASE_URL", "sqlite:///./savyre_app.db"),
        "description": "Application data (users, assessments, candidates)",
        "tables": ["users", "assessments", "code_review_submissions", "candidates"]
    },
    "content": {
        "url": os.getenv("CONTENT_DATABASE_URL", "sqlite:///./savyre_content.db"),
        "description": "Website content (static pages, marketing content)",
        "tables": ["content", "pages", "sections", "media"]
    }
}

# Create engines
engines = {}
for db_name, config in DATABASE_CONFIGS.items():
    engines[db_name] = create_engine(
        config["url"],
        connect_args={"check_same_thread": False} if "sqlite" in config["url"] else {}
    )

# Create session makers
SessionLocal = {
    "app": sessionmaker(autocommit=False, autoflush=False, bind=engines["app"]),
    "content": sessionmaker(autocommit=False, autoflush=False, bind=engines["content"])
}

def get_db(db_name: str = "app") -> Generator:
    """Get database session for specific database"""
    db = SessionLocal[db_name]()
    try:
        yield db
    finally:
        db.close()

def get_app_db():
    """Get application database session (users, assessments, candidates)"""
    return get_db("app")

def get_app_db_dependency():
    """FastAPI dependency for application database session"""
    db = SessionLocal["app"]()
    try:
        yield db
    finally:
        db.close()

def get_content_db():
    """Get content database session (website content, marketing)"""
    db = SessionLocal["content"]()
    try:
        yield db
    finally:
        db.close()

# Direct session access for testing
def get_content_session():
    """Get content database session directly (for testing)"""
    return SessionLocal["content"]()
