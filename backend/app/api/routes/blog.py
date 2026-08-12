from app.api.crud import content_router
from app.models import BlogPost
from app.schemas import BlogPostCreate, BlogPostRead, BlogPostUpdate

router = content_router(
    model=BlogPost,
    prefix="/blog",
    tags=["blog"],
    read_schema=BlogPostRead,
    create_schema=BlogPostCreate,
    update_schema=BlogPostUpdate,
)
