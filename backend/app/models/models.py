from uuid import uuid4

from sqlalchemy import JSON, UUID, Column, DateTime, Integer, String, Text, UniqueConstraint, func

from app.core.database import Base


class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Product(Base, TimestampMixin):
    __tablename__ = "products"
    __table_args__ = (UniqueConstraint("locale", "slug", name="uq_products_locale_slug"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(120), nullable=False, index=True)
    name = Column(String(120), nullable=False)
    tagline = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    href = Column(String(255), nullable=False, default="")


class Solution(Base, TimestampMixin):
    __tablename__ = "solutions"
    __table_args__ = (UniqueConstraint("locale", "slug", name="uq_solutions_locale_slug"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(120), nullable=False, index=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    industries = Column(JSON, default=list)
    href = Column(String(255), nullable=False, default="")


class ResearchTopic(Base, TimestampMixin):
    __tablename__ = "research_topics"
    __table_args__ = (UniqueConstraint("locale", "slug", name="uq_research_topics_locale_slug"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(120), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    summary = Column(Text, nullable=False)
    status = Column(String(32), nullable=False, default="in-progress")
    href = Column(String(255), nullable=False, default="")


class DeveloperResource(Base, TimestampMixin):
    __tablename__ = "developer_resources"
    __table_args__ = (
        UniqueConstraint("locale", "slug", name="uq_developer_resources_locale_slug"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(120), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    kind = Column(String(32), nullable=False, default="api")
    href = Column(String(255), nullable=False, default="")


class BlogPost(Base, TimestampMixin):
    __tablename__ = "blog_posts"
    __table_args__ = (UniqueConstraint("locale", "slug", name="uq_blog_posts_locale_slug"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(160), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    excerpt = Column(Text, nullable=False)
    author = Column(String(120), nullable=False)
    tags = Column(JSON, default=list)
    published_at = Column(DateTime(timezone=True), nullable=True)


class Customer(Base, TimestampMixin):
    __tablename__ = "customers"
    __table_args__ = (UniqueConstraint("locale", "slug", name="uq_customers_locale_slug"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(120), nullable=False, index=True)
    name = Column(String(200), nullable=False)
    sector = Column(String(120), nullable=False)
    country = Column(String(120), nullable=False)
    quote = Column(Text, nullable=False)


class CompanySection(Base, TimestampMixin):
    __tablename__ = "company_sections"
    __table_args__ = (UniqueConstraint("locale", "key", name="uq_company_sections_locale_key"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    key = Column(String(64), nullable=False, index=True)
    title = Column(String(200), nullable=True)
    content = Column(Text, nullable=False)


class CompanyMilestone(Base, TimestampMixin):
    __tablename__ = "company_milestones"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    date_label = Column(String(64), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    event_type = Column(String(32), nullable=False, default="milestone", index=True)
    sort_order = Column(Integer, nullable=False, default=0)


class CompanyTeamMember(Base, TimestampMixin):
    __tablename__ = "company_team_members"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    name = Column(String(120), nullable=False)
    role = Column(String(120), nullable=False)
    photo_url = Column(String(255), nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)


class CompanyPartner(Base, TimestampMixin):
    __tablename__ = "company_partners"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    name = Column(String(120), nullable=False)
    logo_url = Column(String(255), nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)


class NavigationItem(Base, TimestampMixin):
    __tablename__ = "navigation_items"
    __table_args__ = (UniqueConstraint("key", name="uq_navigation_items_key"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    key = Column(String(64), nullable=False, index=True)
    label = Column(String(120), nullable=False)
    href = Column(String(255), nullable=False)
    sort_order = Column(Integer, nullable=False, default=0)


class CompanyContactCopy(Base, TimestampMixin):
    """Contenu éditable de la page Contact (une ligne par locale)."""

    __tablename__ = "company_contact_copy"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    heroEyebrow = Column(String(500), nullable=False, default="")
    heroTitle = Column(String(500), nullable=False, default="")
    heroSub = Column(String(500), nullable=False, default="")
    helpHeading = Column(String(500), nullable=False, default="")
    titleTeam = Column(String(500), nullable=False, default="")
    titleSupport = Column(String(500), nullable=False, default="")
    titlePress = Column(String(500), nullable=False, default="")
    titlePrivacy = Column(String(500), nullable=False, default="")
    titleVulnerability = Column(String(500), nullable=False, default="")
    supportHelpPrefix = Column(String(500), nullable=False, default="")
    supportHelpLink = Column(String(500), nullable=False, default="")
    supportLoginLink = Column(String(500), nullable=False, default="")
    supportLoginSuffix = Column(String(500), nullable=False, default="")
    supportDiscordPrefix = Column(String(500), nullable=False, default="")
    supportDiscordLabel = Column(String(500), nullable=False, default="")
    supportDiscordSuffix = Column(String(500), nullable=False, default="")
    supportCta = Column(String(500), nullable=False, default="")
    pressPrefix = Column(String(500), nullable=False, default="")
    pressEmail = Column(String(500), nullable=False, default="")
    privacyText = Column(String(500), nullable=False, default="")
    privacyCta = Column(String(500), nullable=False, default="")
    vulnText = Column(String(500), nullable=False, default="")
    vulnSmallPrint = Column(String(500), nullable=False, default="")
    vulnCta = Column(String(500), nullable=False, default="")
    formThanks = Column(String(500), nullable=False, default="")
    formSending = Column(String(500), nullable=False, default="")
    formLegal = Column(String(500), nullable=False, default="")
    formUpdates = Column(String(500), nullable=False, default="")
    formSubmit = Column(String(500), nullable=False, default="")
    formError = Column(String(500), nullable=False, default="")
    teamFirstnameLabel = Column(String(500), nullable=False, default="")
    teamFirstnamePlaceholder = Column(String(500), nullable=False, default="")
    teamLastnameLabel = Column(String(500), nullable=False, default="")
    teamLastnamePlaceholder = Column(String(500), nullable=False, default="")
    teamEmailLabel = Column(String(500), nullable=False, default="")
    teamEmailPlaceholder = Column(String(500), nullable=False, default="")
    teamRoleLabel = Column(String(500), nullable=False, default="")
    teamRolePlaceholder = Column(String(500), nullable=False, default="")
    teamMessageLabel = Column(String(500), nullable=False, default="")
    teamMessagePlaceholder = Column(String(500), nullable=False, default="")
    supportEmailLabel = Column(String(500), nullable=False, default="")
    supportEmailPlaceholder = Column(String(500), nullable=False, default="")
    supportIssueLabel = Column(String(500), nullable=False, default="")
    supportIssuePlaceholder = Column(String(500), nullable=False, default="")
    pressFormNameLabel = Column(String(500), nullable=False, default="")
    pressFormNamePlaceholder = Column(String(500), nullable=False, default="")
    pressFormEmailLabel = Column(String(500), nullable=False, default="")
    pressFormEmailPlaceholder = Column(String(500), nullable=False, default="")
    pressOutletLabel = Column(String(500), nullable=False, default="")
    pressOutletPlaceholder = Column(String(500), nullable=False, default="")
    pressRequestLabel = Column(String(500), nullable=False, default="")
    pressRequestPlaceholder = Column(String(500), nullable=False, default="")
    privacyFormEmailLabel = Column(String(500), nullable=False, default="")
    privacyFormEmailPlaceholder = Column(String(500), nullable=False, default="")
    privacyTypeLabel = Column(String(500), nullable=False, default="")
    privacyTypePlaceholder = Column(String(500), nullable=False, default="")
    privacyDetailsLabel = Column(String(500), nullable=False, default="")
    privacyDetailsPlaceholder = Column(String(500), nullable=False, default="")
    vulnFormEmailLabel = Column(String(500), nullable=False, default="")
    vulnFormEmailPlaceholder = Column(String(500), nullable=False, default="")
    vulnProductLabel = Column(String(500), nullable=False, default="")
    vulnProductPlaceholder = Column(String(500), nullable=False, default="")
    vulnReportLabel = Column(String(500), nullable=False, default="")


class JobDepartment(Base, TimestampMixin):
    __tablename__ = "job_departments"
    __table_args__ = (UniqueConstraint("locale", "slug", name="uq_job_departments_locale_slug"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    slug = Column(String(120), nullable=False, index=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=False, default="")
    sort_order = Column(Integer, nullable=False, default=0)


class JobOpening(Base, TimestampMixin):
    __tablename__ = "job_openings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    locale = Column(String(8), nullable=False, default="en", index=True)
    department_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    location = Column(String(120), nullable=False)
    type = Column(String(64), nullable=False, default="Full-time")
    description = Column(Text, nullable=False, default="")
    requirements = Column(JSON, default=list)
    sort_order = Column(Integer, nullable=False, default=0)
    vulnReportPlaceholder = Column(String(500), nullable=False, default="")
