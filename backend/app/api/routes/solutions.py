from app.api.crud import content_router
from app.models import Solution
from app.schemas import SolutionCreate, SolutionRead, SolutionUpdate

router = content_router(
    model=Solution,
    prefix="/solutions",
    tags=["solutions"],
    read_schema=SolutionRead,
    create_schema=SolutionCreate,
    update_schema=SolutionUpdate,
)
