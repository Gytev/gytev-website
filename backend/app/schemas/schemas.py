from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ReadBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime


class ProductCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=120)
    name: str = Field(min_length=1, max_length=120)
    tagline: str = Field(min_length=1, max_length=255)
    description: str
    href: str = ""


class ProductUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    name: str | None = None
    tagline: str | None = None
    description: str | None = None
    href: str | None = None


class ProductRead(ReadBase):
    locale: str
    slug: str
    name: str
    tagline: str
    description: str
    href: str


class SolutionCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=120)
    name: str = Field(min_length=1, max_length=120)
    description: str
    industries: list[str] = Field(default_factory=list)
    href: str = ""


class SolutionUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    name: str | None = None
    description: str | None = None
    industries: list[str] | None = None
    href: str | None = None


class SolutionRead(ReadBase):
    locale: str
    slug: str
    name: str
    description: str
    industries: list[str]
    href: str


class ResearchTopicCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=120)
    title: str = Field(min_length=1, max_length=200)
    summary: str
    status: str = Field(default="in-progress", pattern="^(published|in-progress|internal)$")
    href: str = ""


class ResearchTopicUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    title: str | None = None
    summary: str | None = None
    status: str | None = Field(default=None, pattern="^(published|in-progress|internal)$")
    href: str | None = None


class ResearchTopicRead(ReadBase):
    locale: str
    slug: str
    title: str
    summary: str
    status: str
    href: str


class DeveloperResourceCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=120)
    title: str = Field(min_length=1, max_length=200)
    description: str
    kind: str = Field(default="api", pattern="^(api|sdk|docs|graphql)$")
    href: str = ""


class DeveloperResourceUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    title: str | None = None
    description: str | None = None
    kind: str | None = Field(default=None, pattern="^(api|sdk|docs|graphql)$")
    href: str | None = None


class DeveloperResourceRead(ReadBase):
    locale: str
    slug: str
    title: str
    description: str
    kind: str
    href: str


class BlogPostCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=160)
    title: str = Field(min_length=1, max_length=200)
    excerpt: str
    author: str = Field(min_length=1, max_length=120)
    tags: list[str] = Field(default_factory=list)
    image: str | None = None
    featured: bool = False
    published_at: datetime | None = None


class BlogPostUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    title: str | None = None
    excerpt: str | None = None
    author: str | None = None
    tags: list[str] | None = None
    image: str | None = None
    featured: bool | None = None
    published_at: datetime | None = None


class BlogPostRead(ReadBase):
    locale: str
    slug: str
    title: str
    excerpt: str
    author: str
    tags: list[str]
    image: str | None
    featured: bool
    published_at: datetime | None


class CustomerCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=120)
    name: str = Field(min_length=1, max_length=200)
    sector: str = Field(min_length=1, max_length=120)
    country: str = Field(min_length=1, max_length=120)
    quote: str


class CustomerUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    name: str | None = None
    sector: str | None = None
    country: str | None = None
    quote: str | None = None


class CustomerRead(ReadBase):
    locale: str
    slug: str
    name: str
    sector: str
    country: str
    quote: str


class CompanySectionCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    key: str = Field(min_length=1, max_length=64)
    title: str | None = None
    content: str


class CompanySectionUpdate(BaseModel):
    locale: str | None = None
    key: str | None = None
    title: str | None = None
    content: str | None = None


class CompanySectionRead(ReadBase):
    locale: str
    key: str
    title: str | None
    content: str


EVENT_TYPES = ("launch", "funding", "leadership", "milestone")


class CompanyMilestoneCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    date_label: str = Field(min_length=1, max_length=64)
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    event_type: str = Field(default="milestone", pattern="^(launch|funding|leadership|milestone)$")
    sort_order: int = 0


class CompanyMilestoneUpdate(BaseModel):
    locale: str | None = None
    date_label: str | None = None
    title: str | None = None
    description: str | None = None
    event_type: str | None = Field(default=None, pattern="^(launch|funding|leadership|milestone)$")
    sort_order: int | None = None


class CompanyMilestoneRead(ReadBase):
    locale: str
    date_label: str
    title: str
    description: str | None
    event_type: str
    sort_order: int


class CompanyTeamMemberCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    name: str = Field(min_length=1, max_length=120)
    role: str = Field(min_length=1, max_length=120)
    photo_url: str | None = Field(default=None, max_length=255)
    sort_order: int = 0


class CompanyTeamMemberUpdate(BaseModel):
    locale: str | None = None
    name: str | None = None
    role: str | None = None
    photo_url: str | None = Field(default=None, max_length=255)
    sort_order: int | None = None


class CompanyTeamMemberRead(ReadBase):
    locale: str
    name: str
    role: str
    photo_url: str | None
    sort_order: int


class CompanyPartnerCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    name: str = Field(min_length=1, max_length=120)
    logo_url: str | None = Field(default=None, max_length=255)
    sort_order: int = 0


class CompanyPartnerUpdate(BaseModel):
    locale: str | None = None
    name: str | None = None
    logo_url: str | None = Field(default=None, max_length=255)
    sort_order: int | None = None


class CompanyPartnerRead(ReadBase):
    locale: str
    name: str
    logo_url: str | None
    sort_order: int


class NavigationItemCreate(BaseModel):
    key: str = Field(min_length=1, max_length=64)
    label: str = Field(min_length=1, max_length=120)
    href: str = Field(min_length=1, max_length=255)
    sort_order: int = 0


class NavigationItemUpdate(BaseModel):
    key: str | None = None
    label: str | None = None
    href: str | None = None
    sort_order: int | None = None


class NavigationItemRead(ReadBase):
    key: str
    label: str
    href: str
    sort_order: int


class OverviewItem(BaseModel):
    count: int


class Overview(BaseModel):
    products: int
    solutions: int
    research: int
    developers: int
    blog: int
    customers: int
    company: int
    navigation: int


class ContentBundle(BaseModel):
    """Assembled content for a locale, mirroring content/*.json."""

    products: list[ProductRead]
    solutions: list[SolutionRead]
    research: list[ResearchTopicRead]
    developerResources: list[DeveloperResourceRead]
    blog: list[BlogPostRead]
    customers: list[CustomerRead]
    company: dict[str, Any]


class CompanyContactCopyCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    heroEyebrow: str = Field(default="", max_length=500)
    heroTitle: str = Field(default="", max_length=500)
    heroSub: str = Field(default="", max_length=500)
    helpHeading: str = Field(default="", max_length=500)
    titleTeam: str = Field(default="", max_length=500)
    titleSupport: str = Field(default="", max_length=500)
    titlePress: str = Field(default="", max_length=500)
    titlePrivacy: str = Field(default="", max_length=500)
    titleVulnerability: str = Field(default="", max_length=500)
    supportHelpPrefix: str = Field(default="", max_length=500)
    supportHelpLink: str = Field(default="", max_length=500)
    supportLoginLink: str = Field(default="", max_length=500)
    supportLoginSuffix: str = Field(default="", max_length=500)
    supportDiscordPrefix: str = Field(default="", max_length=500)
    supportDiscordLabel: str = Field(default="", max_length=500)
    supportDiscordSuffix: str = Field(default="", max_length=500)
    supportCta: str = Field(default="", max_length=500)
    pressPrefix: str = Field(default="", max_length=500)
    pressEmail: str = Field(default="", max_length=500)
    privacyText: str = Field(default="", max_length=500)
    privacyCta: str = Field(default="", max_length=500)
    vulnText: str = Field(default="", max_length=500)
    vulnSmallPrint: str = Field(default="", max_length=500)
    vulnCta: str = Field(default="", max_length=500)
    formThanks: str = Field(default="", max_length=500)
    formSending: str = Field(default="", max_length=500)
    formLegal: str = Field(default="", max_length=500)
    formUpdates: str = Field(default="", max_length=500)
    formSubmit: str = Field(default="", max_length=500)
    formError: str = Field(default="", max_length=500)
    teamFirstnameLabel: str = Field(default="", max_length=500)
    teamFirstnamePlaceholder: str = Field(default="", max_length=500)
    teamLastnameLabel: str = Field(default="", max_length=500)
    teamLastnamePlaceholder: str = Field(default="", max_length=500)
    teamEmailLabel: str = Field(default="", max_length=500)
    teamEmailPlaceholder: str = Field(default="", max_length=500)
    teamRoleLabel: str = Field(default="", max_length=500)
    teamRolePlaceholder: str = Field(default="", max_length=500)
    teamMessageLabel: str = Field(default="", max_length=500)
    teamMessagePlaceholder: str = Field(default="", max_length=500)
    supportEmailLabel: str = Field(default="", max_length=500)
    supportEmailPlaceholder: str = Field(default="", max_length=500)
    supportIssueLabel: str = Field(default="", max_length=500)
    supportIssuePlaceholder: str = Field(default="", max_length=500)
    pressFormNameLabel: str = Field(default="", max_length=500)
    pressFormNamePlaceholder: str = Field(default="", max_length=500)
    pressFormEmailLabel: str = Field(default="", max_length=500)
    pressFormEmailPlaceholder: str = Field(default="", max_length=500)
    pressOutletLabel: str = Field(default="", max_length=500)
    pressOutletPlaceholder: str = Field(default="", max_length=500)
    pressRequestLabel: str = Field(default="", max_length=500)
    pressRequestPlaceholder: str = Field(default="", max_length=500)
    privacyFormEmailLabel: str = Field(default="", max_length=500)
    privacyFormEmailPlaceholder: str = Field(default="", max_length=500)
    privacyTypeLabel: str = Field(default="", max_length=500)
    privacyTypePlaceholder: str = Field(default="", max_length=500)
    privacyDetailsLabel: str = Field(default="", max_length=500)
    privacyDetailsPlaceholder: str = Field(default="", max_length=500)
    vulnFormEmailLabel: str = Field(default="", max_length=500)
    vulnFormEmailPlaceholder: str = Field(default="", max_length=500)
    vulnProductLabel: str = Field(default="", max_length=500)
    vulnProductPlaceholder: str = Field(default="", max_length=500)
    vulnReportLabel: str = Field(default="", max_length=500)
    vulnReportPlaceholder: str = Field(default="", max_length=500)


class CompanyContactCopyUpdate(BaseModel):
    locale: str | None = None
    heroEyebrow: str | None = None
    heroTitle: str | None = None
    heroSub: str | None = None
    helpHeading: str | None = None
    titleTeam: str | None = None
    titleSupport: str | None = None
    titlePress: str | None = None
    titlePrivacy: str | None = None
    titleVulnerability: str | None = None
    supportHelpPrefix: str | None = None
    supportHelpLink: str | None = None
    supportLoginLink: str | None = None
    supportLoginSuffix: str | None = None
    supportDiscordPrefix: str | None = None
    supportDiscordLabel: str | None = None
    supportDiscordSuffix: str | None = None
    supportCta: str | None = None
    pressPrefix: str | None = None
    pressEmail: str | None = None
    privacyText: str | None = None
    privacyCta: str | None = None
    vulnText: str | None = None
    vulnSmallPrint: str | None = None
    vulnCta: str | None = None
    formThanks: str | None = None
    formSending: str | None = None
    formLegal: str | None = None
    formUpdates: str | None = None
    formSubmit: str | None = None
    formError: str | None = None
    teamFirstnameLabel: str | None = None
    teamFirstnamePlaceholder: str | None = None
    teamLastnameLabel: str | None = None
    teamLastnamePlaceholder: str | None = None
    teamEmailLabel: str | None = None
    teamEmailPlaceholder: str | None = None
    teamRoleLabel: str | None = None
    teamRolePlaceholder: str | None = None
    teamMessageLabel: str | None = None
    teamMessagePlaceholder: str | None = None
    supportEmailLabel: str | None = None
    supportEmailPlaceholder: str | None = None
    supportIssueLabel: str | None = None
    supportIssuePlaceholder: str | None = None
    pressFormNameLabel: str | None = None
    pressFormNamePlaceholder: str | None = None
    pressFormEmailLabel: str | None = None
    pressFormEmailPlaceholder: str | None = None
    pressOutletLabel: str | None = None
    pressOutletPlaceholder: str | None = None
    pressRequestLabel: str | None = None
    pressRequestPlaceholder: str | None = None
    privacyFormEmailLabel: str | None = None
    privacyFormEmailPlaceholder: str | None = None
    privacyTypeLabel: str | None = None
    privacyTypePlaceholder: str | None = None
    privacyDetailsLabel: str | None = None
    privacyDetailsPlaceholder: str | None = None
    vulnFormEmailLabel: str | None = None
    vulnFormEmailPlaceholder: str | None = None
    vulnProductLabel: str | None = None
    vulnProductPlaceholder: str | None = None
    vulnReportLabel: str | None = None
    vulnReportPlaceholder: str | None = None
class CompanyContactCopyRead(ReadBase):
    locale: str
    heroEyebrow: str
    heroTitle: str
    heroSub: str
    helpHeading: str
    titleTeam: str
    titleSupport: str
    titlePress: str
    titlePrivacy: str
    titleVulnerability: str
    supportHelpPrefix: str
    supportHelpLink: str
    supportLoginLink: str
    supportLoginSuffix: str
    supportDiscordPrefix: str
    supportDiscordLabel: str
    supportDiscordSuffix: str
    supportCta: str
    pressPrefix: str
    pressEmail: str
    privacyText: str
    privacyCta: str
    vulnText: str
    vulnSmallPrint: str
    vulnCta: str
    formThanks: str
    formSending: str
    formLegal: str
    formUpdates: str
    formError: str
    formSubmit: str
    teamFirstnameLabel: str
    teamFirstnamePlaceholder: str
    teamLastnameLabel: str
    teamLastnamePlaceholder: str
    teamEmailLabel: str
    teamEmailPlaceholder: str
    teamRoleLabel: str
    teamRolePlaceholder: str
    teamMessageLabel: str
    teamMessagePlaceholder: str
    supportEmailLabel: str
    supportEmailPlaceholder: str
    supportIssueLabel: str
    supportIssuePlaceholder: str
    pressFormNameLabel: str
    pressFormNamePlaceholder: str
    pressFormEmailLabel: str
    pressFormEmailPlaceholder: str
    pressOutletLabel: str
    pressOutletPlaceholder: str
    pressRequestLabel: str
    pressRequestPlaceholder: str
    privacyFormEmailLabel: str
    privacyFormEmailPlaceholder: str
    privacyTypeLabel: str
    privacyTypePlaceholder: str
    privacyDetailsLabel: str
    privacyDetailsPlaceholder: str
    vulnFormEmailLabel: str
    vulnFormEmailPlaceholder: str
    vulnProductLabel: str
    vulnProductPlaceholder: str
    vulnReportLabel: str
    vulnReportPlaceholder: str


class JobDepartmentCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    slug: str = Field(min_length=1, max_length=120)
    name: str = Field(min_length=1, max_length=120)
    description: str = ""
    sort_order: int = 0


class JobDepartmentUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    name: str | None = None
    description: str | None = None
    sort_order: int | None = None


class JobDepartmentRead(ReadBase):
    locale: str
    slug: str
    name: str
    description: str
    sort_order: int


class JobOpeningCreate(BaseModel):
    locale: str = Field(default="en", min_length=2, max_length=8)
    department_id: UUID
    title: str = Field(min_length=1, max_length=200)
    location: str = Field(min_length=1, max_length=120)
    type: str = Field(default="Full-time", max_length=64)
    description: str = ""
    requirements: list[str] = Field(default_factory=list)
    sort_order: int = 0


class JobOpeningUpdate(BaseModel):
    locale: str | None = None
    department_id: UUID | None = None
    title: str | None = None
    location: str | None = None
    type: str | None = None
    description: str | None = None
    requirements: list[str] | None = None
    sort_order: int | None = None


class JobOpeningRead(ReadBase):
    locale: str
    department_id: UUID
    title: str
    location: str
    type: str
    description: str
    requirements: list[str]
    sort_order: int


class TrackEventCreate(BaseModel):
    session_id: str = Field(min_length=8, max_length=64)
    path: str = Field(min_length=1, max_length=500)
    event_type: str = Field(default="view", pattern="^(view|leave)$")
    locale: str | None = None
    referrer: str | None = None
    timezone: str | None = None
