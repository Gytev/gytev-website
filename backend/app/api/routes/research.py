from app.api.crud import content_router
from app.models import ResearchTopic
from app.schemas import ResearchTopicCreate, ResearchTopicRead, ResearchTopicUpdate

router = content_router(
    model=ResearchTopic,
    prefix="/research",
    tags=["research"],
    read_schema=ResearchTopicRead,
    create_schema=ResearchTopicCreate,
    update_schema=ResearchTopicUpdate,
)
