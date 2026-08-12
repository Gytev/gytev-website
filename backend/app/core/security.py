import secrets

from fastapi import Header, HTTPException, status

from app.core.config import get_settings


def require_api_key(x_api_key: str = Header(default="")) -> None:
    """Protège les opérations d'écriture de l'admin.

    Si aucune clé n'est configurée (`GYTEV_ADMIN_API_KEY` vide), l'authentification
    est désactivée — pratique en développement, à activer en production.
    """
    settings = get_settings()
    expected = settings.admin_api_key
    if not expected:
        return

    if not x_api_key or not secrets.compare_digest(x_api_key, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key",
        )
