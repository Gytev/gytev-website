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


class NavigationItem(Base, TimestampMixin):
    __tablename__ = "navigation_items"
    __table_args__ = (UniqueConstraint("key", name="uq_navigation_items_key"),)

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    key = Column(String(64), nullable=False, index=True)
    label = Column(String(120), nullable=False)
    href = Column(String(255), nullable=False)
    sort_order = Column(Integer, nullable=False, default=0)
