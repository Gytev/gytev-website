from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="GYTEV_")

    app_name: str = "Gytev API"
    environment: str = "development"
    debug: bool = True

    database_url: str = "postgresql+psycopg://gytev:gytev@localhost:5432/gytev"

    cors_origins: list[str] = ["http://localhost:3000", "http://localhost:3001"]


@lru_cache
def get_settings() -> Settings:
    return Settings()
