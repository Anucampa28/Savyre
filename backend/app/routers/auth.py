from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError
from typing import Optional

from ..db import get_db
from ..models.user import User
from ..schemas import UserCreate, UserRead, LoginRequest, Token
from ..core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    decode_access_token,
    is_password_pwned,
)
from fastapi import BackgroundTasks
import secrets
from datetime import datetime, timedelta
from sqlalchemy import String
from sqlalchemy.orm import mapped_column
import os
from ..services.email import send_verification_email


router = APIRouter()

# Simple in-memory verification token store for demo (use DB/Redis in prod)
verification_tokens: dict[str, dict] = {}


@router.post("/signup", response_model=UserRead)
def signup(payload: UserCreate, background: BackgroundTasks, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    if is_password_pwned(payload.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password found in data breach. Please use a stronger password.")

    user = User(
        email=payload.email,
        first_name=payload.first_name,
        last_name=payload.last_name,
        hashed_password=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # create verify token and send email
    token = secrets.token_urlsafe(32)
    verification_tokens[token] = {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=12)}
    app_base = os.getenv('APP_BASE_URL', 'http://localhost:8001')
    verify_link = f"{app_base}/api/auth/verify?token={token}"
    background.add_task(send_verification_email, user.email, verify_link)
    print(f"[VERIFY_LINK] {verify_link}")

    return user


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not user.is_verified:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email not verified")
    token = create_access_token(str(user.id))
    return Token(access_token=token)


@router.get("/me", response_model=UserRead)
def me(authorization: Optional[str] = None, db: Session = Depends(get_db)):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        payload = decode_access_token(token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.get(User, int(payload["sub"]))
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.get("/verify")
def verify_account(token: str, db: Session = Depends(get_db)):
    data = verification_tokens.get(token)
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    if data["exp"] < datetime.utcnow():
        verification_tokens.pop(token, None)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token expired")
    user = db.get(User, data["user_id"])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_verified = True
    db.commit()
    verification_tokens.pop(token, None)
    return {"detail": "Account verified successfully"}


@router.post("/resend-verification")
def resend_verification(email: str, background: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.is_verified:
        return {"detail": "Account already verified"}
    token = secrets.token_urlsafe(32)
    verification_tokens[token] = {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=12)}
    app_base = os.getenv('APP_BASE_URL', 'http://localhost:8001')
    verify_link = f"{app_base}/api/auth/verify?token={token}"
    background.add_task(send_verification_email, user.email, verify_link)
    return {"detail": "Verification email sent"}


