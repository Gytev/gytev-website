from app.api.crud import content_router
from app.models import CompanySection
from app.schemas import CompanySectionCreate, CompanySectionRead, CompanySectionUpdate

router = content_router(
    model=CompanySection,
    prefix="/company",
    tags=["company"],
    read_schema=CompanySectionRead,
    create_schema=CompanySectionCreate,
    update_schema=CompanySectionUpdate,
)
