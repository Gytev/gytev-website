from app.api.crud import content_router
from app.models import Customer
from app.schemas import CustomerCreate, CustomerRead, CustomerUpdate

router = content_router(
    model=Customer,
    prefix="/customers",
    tags=["customers"],
    read_schema=CustomerRead,
    create_schema=CustomerCreate,
    update_schema=CustomerUpdate,
)
