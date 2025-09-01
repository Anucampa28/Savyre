from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserRead(UserBase):
    id: int
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Assessment schemas
class QuestionPreview(BaseModel):
    id: int
    title: str
    description: str
    difficulty_level: str
    category: str
    estimated_duration: int
    programming_language: Optional[str] = None
    tags: Optional[List[str]] = None

    class Config:
        from_attributes = True

class AssessmentQuestionBase(BaseModel):
    question_id: int
    order: int
    points: int = 10
    custom_duration: Optional[int] = None

class AssessmentQuestionCreate(AssessmentQuestionBase):
    pass

class AssessmentQuestion(AssessmentQuestionBase):
    id: int
    assessment_id: int
    question: QuestionPreview

    class Config:
        from_attributes = True

class AssessmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    programming_language: str
    difficulty_level: str
    is_template: bool = False

class AssessmentCreate(AssessmentBase):
    questions: List[AssessmentQuestionCreate]

class AssessmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    programming_language: Optional[str] = None
    difficulty_level: Optional[str] = None
    questions: Optional[List[AssessmentQuestionCreate]] = None

class Assessment(AssessmentBase):
    id: int
    creator_id: int
    shareable_link: str
    total_duration: int
    max_score: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    questions: List[AssessmentQuestion]

    class Config:
        from_attributes = True

class AssessmentPreview(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    programming_language: str
    difficulty_level: str
    total_duration: int
    max_score: int
    is_template: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AssessmentAttemptBase(BaseModel):
    candidate_email: EmailStr
    candidate_name: Optional[str] = None

class AssessmentAttemptCreate(AssessmentAttemptBase):
    pass

class AssessmentAttempt(AssessmentAttemptBase):
    id: int
    assessment_id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    total_score: Optional[int] = None
    max_score: int
    status: str

    class Config:
        from_attributes = True

class AssessmentAnswerBase(BaseModel):
    question_id: int
    answer_text: str

class AssessmentAnswerCreate(AssessmentAnswerBase):
    pass

class AssessmentAnswer(AssessmentAnswerBase):
    id: int
    attempt_id: int
    score: Optional[int] = None
    max_score: int
    feedback: Optional[str] = None
    submitted_at: datetime

    class Config:
        from_attributes = True


# Candidate schemas
class CandidateBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class CandidateCreate(CandidateBase):
    pass


class CandidateRead(CandidateBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class QuestionBase(BaseModel):
    title: str
    description: str
    buggy_snippet: str
    what_wrong: str
    fix_outline: str
    difficulty_level: str
    category: str
    estimated_duration: int
    programming_language: Optional[str] = None
    tags: Optional[List[str]] = None

class QuestionCreate(QuestionBase):
    solution: str
    rubric: Dict[str, Any]

class Question(QuestionBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True






