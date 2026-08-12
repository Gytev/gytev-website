from app.api.crud import content_router
from app.models import NavigationItem
from app.schemas import NavigationItemCreate, NavigationItemRead, NavigationItemUpdate

router = content_router(
    model=NavigationItem,
    prefix="/navigation",
    tags=["navigation"],
    read_schema=NavigationItemRead,
    create_schema=NavigationItemCreate,
    update_schema=NavigationItemUpdate,
)
