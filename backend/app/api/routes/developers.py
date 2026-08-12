from app.api.crud import content_router
from app.models import DeveloperResource
from app.schemas import DeveloperResourceCreate, DeveloperResourceRead, DeveloperResourceUpdate

router = content_router(
    model=DeveloperResource,
    prefix="/developers",
    tags=["developers"],
    read_schema=DeveloperResourceRead,
    create_schema=DeveloperResourceCreate,
    update_schema=DeveloperResourceUpdate,
)
