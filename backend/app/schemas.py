from datetime import datetime
from typing import Union, List, Dict, Any, Optional
from pydantic import BaseModel, EmailStr, Field


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
class AssessmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    difficulty: str = "medium"
    duration_minutes: int = 30
    assessment_type: str = "coding"


class CodeReviewAssessmentCreate(AssessmentBase):
    github_repo_url: str
    pr_number: int
    review_guidelines: Optional[Dict[str, Any]] = None
    evaluation_criteria: Optional[Dict[str, Any]] = None


class AssessmentCreate(AssessmentBase):
    github_repo_url: Optional[str] = None
    pr_number: Optional[int] = None
    review_guidelines: Optional[Dict[str, Any]] = None
    evaluation_criteria: Optional[Dict[str, Any]] = None


class AssessmentRead(AssessmentBase):
    id: int
    created_at: datetime
    github_repo_url: Optional[str] = None
    pr_number: Optional[int] = None
    review_guidelines: Optional[Dict[str, Any]] = None
    evaluation_criteria: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


# Code Review Submission schemas
class CodeReviewSubmissionBase(BaseModel):
    comments: Dict[str, str]  # {line_number: comment_text}
    overall_feedback: Optional[str] = None


class CodeReviewSubmissionCreate(CodeReviewSubmissionBase):
    assessment_id: int


class CodeReviewSubmissionRead(CodeReviewSubmissionBase):
    id: int
    assessment_id: int
    candidate_id: int
    submitted_at: datetime
    is_evaluated: bool
    evaluation_score: Optional[float] = None
    evaluation_details: Optional[Dict[str, Any]] = None
    evaluated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# PR Data schemas
class PRFile(BaseModel):
    filename: str
    content: str
    additions: int
    deletions: int
    changes: int


class PRData(BaseModel):
    number: int
    title: str
    body: Optional[str] = None
    state: str
    created_at: datetime
    updated_at: datetime
    files: List[PRFile]
    diff_url: str


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


# Content schemas
class ContentBase(BaseModel):
    key: str = Field(..., description="Unique identifier for the content")
    title: Optional[str] = None
    content: str = Field(..., description="The actual content")
    content_type: str = Field(..., description="Type of content: text, html, markdown, json")
    category: Optional[str] = None
    language: str = Field(default="en", description="Language code")
    is_active: bool = Field(default=True)
    meta_data: Optional[Dict[str, Any]] = None


class ContentCreate(ContentBase):
    pass


class ContentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    content_type: Optional[str] = None
    category: Optional[str] = None
    language: Optional[str] = None
    is_active: Optional[bool] = None
    meta_data: Optional[Dict[str, Any]] = None


class ContentRead(ContentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


