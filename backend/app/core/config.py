import os
from functools import lru_cache


class Settings:
    api_prefix: str = "/api"
    secret_key: str = os.getenv("SECRET_KEY", "change-this-in-prod")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    database_url: str = os.getenv("DATABASE_URL", "postgresql://laksham:laksham@localhost:5432/laksham")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()


