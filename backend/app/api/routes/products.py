from app.api.crud import content_router
from app.models import Product
from app.schemas import ProductCreate, ProductRead, ProductUpdate

router = content_router(
    model=Product,
    prefix="/products",
    tags=["products"],
    read_schema=ProductRead,
    create_schema=ProductCreate,
    update_schema=ProductUpdate,
)
