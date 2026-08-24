from app.api.crud import content_router
from app.models import CompanyContactCopy, CompanyMilestone, CompanyPartner, CompanySection, CompanyTeamMember
from app.schemas import (
    CompanyMilestoneCreate,
    CompanyMilestoneRead,
    CompanyMilestoneUpdate,
    CompanyPartnerCreate,
    CompanyPartnerRead,
    CompanyPartnerUpdate,
    CompanySectionCreate,
    CompanySectionRead,
    CompanySectionUpdate,
    CompanyTeamMemberCreate,
    CompanyTeamMemberRead,
    CompanyTeamMemberUpdate,
    CompanyContactCopyCreate,
    CompanyContactCopyRead,
    CompanyContactCopyUpdate,
)

router = content_router(
    model=CompanySection,
    prefix="/company",
    tags=["company"],
    read_schema=CompanySectionRead,
    create_schema=CompanySectionCreate,
    update_schema=CompanySectionUpdate,
)

milestones_router = content_router(
    model=CompanyMilestone,
    prefix="/milestones",
    tags=["company"],
    read_schema=CompanyMilestoneRead,
    create_schema=CompanyMilestoneCreate,
    update_schema=CompanyMilestoneUpdate,
)

team_router = content_router(
    model=CompanyTeamMember,
    prefix="/team",
    tags=["company"],
    read_schema=CompanyTeamMemberRead,
    create_schema=CompanyTeamMemberCreate,
    update_schema=CompanyTeamMemberUpdate,
)


partners_router = content_router(
    model=CompanyPartner,
    prefix="/partners",
    tags=["company"],
    read_schema=CompanyPartnerRead,
    create_schema=CompanyPartnerCreate,
    update_schema=CompanyPartnerUpdate,
)

contact_router = content_router(
    model=CompanyContactCopy,
    prefix="/contact-content",
    tags=["company"],
    read_schema=CompanyContactCopyRead,
    create_schema=CompanyContactCopyCreate,
    update_schema=CompanyContactCopyUpdate,
)
