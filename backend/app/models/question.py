from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, Boolean
from sqlalchemy.sql import func
from app.db import Base

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    buggy_snippet = Column(Text, nullable=False)
    what_wrong = Column(Text, nullable=False)
    fix_outline = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)  # Hidden from users
    rubric = Column(JSON, nullable=False)  # Scoring criteria
    difficulty_level = Column(String(50), nullable=False)  # Easy, Medium, Hard
    category = Column(String(100), nullable=False)  # e.g., "Database", "Security", "Concurrency"
    estimated_duration = Column(Integer, nullable=False)  # in minutes
    programming_language = Column(String(50), nullable=True)  # Language-specific if applicable
    tags = Column(JSON, nullable=True)  # Array of tags
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
