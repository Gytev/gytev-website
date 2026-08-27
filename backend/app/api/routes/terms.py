from app.api.crud import content_router
from app.models import TermsPage
from app.schemas import TermsPageCreate, TermsPageRead, TermsPageUpdate

router = content_router(
    model=TermsPage,
    prefix="/terms",
    tags=["terms"],
    read_schema=TermsPageRead,
    create_schema=TermsPageCreate,
    update_schema=TermsPageUpdate,
)
