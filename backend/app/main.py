from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, assessments, candidates, questions
from .db import init_database


def create_app() -> FastAPI:
    app = FastAPI(title="Laksham Assessment Portal API", version="0.1.0")

    # CORS (adjust origins as needed)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:8000", "http://127.0.0.1:8000", "*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
    app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
    app.include_router(candidates.router, prefix="/api/candidates", tags=["candidates"])
    app.include_router(questions.router, prefix="/api/questions", tags=["questions"])

    @app.get("/api/health")
    def health_check():
        return {"status": "ok"}

    return app


app = create_app()

# Trigger DB initialization on import (idempotent)
init_database()


