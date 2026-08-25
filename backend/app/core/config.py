from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="GYTEV_")

    app_name: str = "Gytev API"
    environment: str = "development"
    debug: bool = True

    database_url: str = "postgresql+psycopg://gytev:gytev@localhost:5432/gytev"

    cors_origins: list[str] = ["http://localhost:3000", "http://localhost:3001"]

    # Clé API pour les mutations admin (X-API-Key). Vide = auth désactivée (dev).
    admin_api_key: str = ""

    # Email (contact form)
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_pass: str = ""
    from_email: str = "noreply@gytev.com"

    @field_validator("database_url", mode="before")
    @classmethod
    def _force_async_driver(cls, value: object) -> object:
        """Accepte les URLs standards (Neon, Supabase...) et force le driver async psycopg."""
        if not isinstance(value, str):
            return value
        if value.startswith("postgres://"):
            return f"postgresql+psycopg://{value.removeprefix('postgres://')}"
        if value.startswith("postgresql://"):
            return f"postgresql+psycopg://{value.removeprefix('postgresql://')}"
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
