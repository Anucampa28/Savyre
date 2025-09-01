from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List, Optional
import secrets
from app.db import get_db
from app.schemas import (
    Assessment, AssessmentCreate, AssessmentUpdate, AssessmentPreview,
    AssessmentAttempt, AssessmentAttemptCreate, AssessmentAnswer, AssessmentAnswerCreate
)
from app.models.assessment import (
    Assessment as AssessmentModel, AssessmentQuestion as AssessmentQuestionModel,
    AssessmentAttempt as AssessmentAttemptModel, AssessmentAnswer as AssessmentAnswerModel
)
from app.models.question import Question as QuestionModel
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/assessments", tags=["assessments"])

def generate_shareable_link():
    """Generate a unique shareable link for assessments"""
    return f"assessment-{secrets.token_urlsafe(16)}"

@router.post("/", response_model=Assessment)
async def create_assessment(
    assessment: AssessmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new assessment"""
    # Calculate total duration and max score
    total_duration = 0
    max_score = 0
    
    for q in assessment.questions:
        question = db.query(QuestionModel).filter(QuestionModel.id == q.question_id).first()
        if not question:
            raise HTTPException(status_code=400, detail=f"Question {q.question_id} not found")
        
        duration = q.custom_duration or question.estimated_duration
        total_duration += duration
        max_score += q.points
    
    # Create assessment
    db_assessment = AssessmentModel(
        **assessment.dict(exclude={'questions'}),
        creator_id=current_user.id,
        shareable_link=generate_shareable_link(),
        total_duration=total_duration,
        max_score=max_score
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    
    # Add questions
    for q in assessment.questions:
        db_question = AssessmentQuestionModel(
            assessment_id=db_assessment.id,
            **q.dict()
        )
        db.add(db_question)
    
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

@router.get("/", response_model=List[AssessmentPreview])
async def list_assessments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    is_template: Optional[bool] = Query(None, description="Filter by template status")
):
    """List user's assessments"""
    query = db.query(AssessmentModel).filter(AssessmentModel.creator_id == current_user.id)
    
    if is_template is not None:
        query = query.filter(AssessmentModel.is_template == is_template)
    
    assessments = query.order_by(AssessmentModel.created_at.desc()).all()
    return assessments

@router.get("/{assessment_id}", response_model=Assessment)
async def get_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific assessment"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id,
        AssessmentModel.creator_id == current_user.id
    ).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return assessment

@router.put("/{assessment_id}", response_model=Assessment)
async def update_assessment(
    assessment_id: int,
    assessment_update: AssessmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an assessment"""
    db_assessment = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id,
        AssessmentModel.creator_id == current_user.id
    ).first()
    
    if not db_assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Update basic fields
    update_data = assessment_update.dict(exclude_unset=True, exclude={'questions'})
    for field, value in update_data.items():
        setattr(db_assessment, field, value)
    
    # Update questions if provided
    if assessment_update.questions is not None:
        # Remove existing questions
        db.query(AssessmentQuestionModel).filter(
            AssessmentQuestionModel.assessment_id == assessment_id
        ).delete()
        
        # Add new questions
        total_duration = 0
        max_score = 0
        
        for q in assessment_update.questions:
            question = db.query(QuestionModel).filter(QuestionModel.id == q.question_id).first()
            if not question:
                raise HTTPException(status_code=400, detail=f"Question {q.question_id} not found")
            
            duration = q.custom_duration or question.estimated_duration
            total_duration += duration
            max_score += q.points
            
            db_question = AssessmentQuestionModel(
                assessment_id=assessment_id,
                **q.dict()
            )
            db.add(db_question)
        
        db_assessment.total_duration = total_duration
        db_assessment.max_score = max_score
    
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

@router.post("/{assessment_id}/copy", response_model=Assessment)
async def copy_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Copy an assessment to create a new one"""
    original = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id,
        AssessmentModel.creator_id == current_user.id
    ).first()
    
    if not original:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Create copy
    copy_data = {
        'title': f"{original.title} (Copy)",
        'description': original.description,
        'programming_language': original.programming_language,
        'difficulty_level': original.difficulty_level,
        'is_template': False
    }
    
    db_copy = AssessmentModel(
        **copy_data,
        creator_id=current_user.id,
        shareable_link=generate_shareable_link(),
        total_duration=original.total_duration,
        max_score=original.max_score
    )
    db.add(db_copy)
    db.commit()
    db.refresh(db_copy)
    
    # Copy questions
    original_questions = db.query(AssessmentQuestionModel).filter(
        AssessmentQuestionModel.assessment_id == assessment_id
    ).all()
    
    for q in original_questions:
        db_question = AssessmentQuestionModel(
            assessment_id=db_copy.id,
            question_id=q.question_id,
            order=q.order,
            points=q.points,
            custom_duration=q.custom_duration
        )
        db.add(db_question)
    
    db.commit()
    db.refresh(db_copy)
    return db_copy

@router.delete("/{assessment_id}")
async def delete_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an assessment"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id,
        AssessmentModel.creator_id == current_user.id
    ).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    db.delete(assessment)
    db.commit()
    return {"message": "Assessment deleted successfully"}

@router.get("/share/{shareable_link}", response_model=Assessment)
async def get_shared_assessment(shareable_link: str, db: Session = Depends(get_db)):
    """Get a shared assessment by shareable link"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.shareable_link == shareable_link,
        AssessmentModel.is_active == True
    ).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return assessment

@router.post("/{assessment_id}/attempts", response_model=AssessmentAttempt)
async def start_assessment_attempt(
    assessment_id: int,
    attempt: AssessmentAttemptCreate,
    db: Session = Depends(get_db)
):
    """Start a new assessment attempt"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id,
        AssessmentModel.is_active == True
    ).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    db_attempt = AssessmentAttemptModel(
        assessment_id=assessment_id,
        max_score=assessment.max_score,
        **attempt.dict()
    )
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    return db_attempt

@router.post("/attempts/{attempt_id}/answers", response_model=AssessmentAnswer)
async def submit_answer(
    attempt_id: int,
    answer: AssessmentAnswerCreate,
    db: Session = Depends(get_db)
):
    """Submit an answer for an assessment attempt"""
    attempt = db.query(AssessmentAttemptModel).filter(
        AssessmentAttemptModel.id == attempt_id
    ).first()
    
    if not attempt:
        raise HTTPException(status_code=404, detail="Assessment attempt not found")
    
    if attempt.status != "in_progress":
        raise HTTPException(status_code=400, detail="Assessment attempt is not in progress")
    
    # Get the question and max score
    question = db.query(QuestionModel).filter(QuestionModel.id == answer.question_id).first()
    if not question:
        raise HTTPException(status_code=400, detail="Question not found")
    
    # TODO: Implement answer validation and scoring logic
    # For now, just store the answer
    db_answer = AssessmentAnswerModel(
        attempt_id=attempt_id,
        max_score=10,  # Default score, should come from assessment question
        **answer.dict()
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

@router.post("/attempts/{attempt_id}/complete")
async def complete_assessment_attempt(
    attempt_id: int,
    db: Session = Depends(get_db)
):
    """Mark an assessment attempt as completed"""
    attempt = db.query(AssessmentAttemptModel).filter(
        AssessmentAttemptModel.id == attempt_id
    ).first()
    
    if not attempt:
        raise HTTPException(status_code=404, detail="Assessment attempt not found")
    
    if attempt.status != "in_progress":
        raise HTTPException(status_code=400, detail="Assessment attempt is not in progress")
    
    attempt.status = "completed"
    attempt.completed_at = func.now()
    
    db.commit()
    db.refresh(attempt)
    return {"message": "Assessment completed successfully"}

@router.get("/attempts/{attempt_id}", response_model=AssessmentAttempt)
async def get_assessment_attempt(
    attempt_id: int,
    db: Session = Depends(get_db)
):
    """Get assessment attempt details"""
    attempt = db.query(AssessmentAttemptModel).filter(
        AssessmentAttemptModel.id == attempt_id
    ).first()
    
    if not attempt:
        raise HTTPException(status_code=404, detail="Assessment attempt not found")
    
    return attempt

@router.get("/attempts/recent", response_model=List[AssessmentAttempt])
async def get_recent_attempts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    limit: int = Query(10, le=50, description="Maximum number of attempts to return")
):
    """Get recent assessment attempts for user's assessments"""
    # Get all assessments created by the user
    user_assessments = db.query(AssessmentModel).filter(
        AssessmentModel.creator_id == current_user.id
    ).all()
    
    if not user_assessments:
        return []
    
    assessment_ids = [a.id for a in user_assessments]
    
    # Get recent attempts for these assessments
    attempts = db.query(AssessmentAttemptModel).filter(
        AssessmentAttemptModel.assessment_id.in_(assessment_ids)
    ).order_by(AssessmentAttemptModel.started_at.desc()).limit(limit).all()
    
    return attempts


