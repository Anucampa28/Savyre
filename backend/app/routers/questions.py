from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db import get_db
from app.schemas import Question, QuestionPreview, QuestionCreate
from app.models.question import Question as QuestionModel
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(tags=["questions"])

@router.get("/", response_model=List[QuestionPreview])
async def list_questions(
    db: Session = Depends(get_db),
    difficulty_level: Optional[str] = Query(None, description="Filter by difficulty level"),
    category: Optional[str] = Query(None, description="Filter by category"),
    programming_language: Optional[str] = Query(None, description="Filter by programming language"),
    search: Optional[str] = Query(None, description="Search in title and description"),
    limit: int = Query(50, le=100, description="Maximum number of questions to return"),
    offset: int = Query(0, ge=0, description="Number of questions to skip")
):
    """List questions with optional filtering and pagination"""
    query = db.query(QuestionModel).filter(QuestionModel.is_active == True)
    
    if difficulty_level:
        query = query.filter(QuestionModel.difficulty_level == difficulty_level)
    
    if category:
        query = query.filter(QuestionModel.category == category)
    
    if programming_language:
        query = query.filter(QuestionModel.programming_language == programming_language)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (QuestionModel.title.ilike(search_term)) |
            (QuestionModel.description.ilike(search_term))
        )
    
    questions = query.offset(offset).limit(limit).all()
    return questions

@router.get("/categories")
async def get_categories(db: Session = Depends(get_db)):
    """Get all available question categories"""
    categories = db.query(QuestionModel.category).distinct().all()
    return [cat[0] for cat in categories]

@router.get("/difficulty-levels")
async def get_difficulty_levels(db: Session = Depends(get_db)):
    """Get all available difficulty levels"""
    levels = db.query(QuestionModel.difficulty_level).distinct().all()
    return [level[0] for level in levels]

@router.get("/programming-languages")
async def get_programming_languages(db: Session = Depends(get_db)):
    """Get all available programming languages"""
    languages = db.query(QuestionModel.programming_language).distinct().filter(
        QuestionModel.programming_language.isnot(None)
    ).all()
    return [lang[0] for lang in languages]

@router.get("/{question_id}", response_model=Question)
async def get_question(question_id: int, db: Session = Depends(get_db)):
    """Get a specific question by ID"""
    question = db.query(QuestionModel).filter(
        QuestionModel.id == question_id,
        QuestionModel.is_active == True
    ).first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    return question

@router.post("/", response_model=Question)
async def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new question (admin only)"""
    # TODO: Add admin role check
    db_question = QuestionModel(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question
