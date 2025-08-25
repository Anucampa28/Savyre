from datetime import datetime
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
    description: str | None = None
    difficulty: str = "medium"
    duration_minutes: int = 30


class AssessmentCreate(AssessmentBase):
    pass


class AssessmentRead(AssessmentBase):
    id: int
    created_at: datetime

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


