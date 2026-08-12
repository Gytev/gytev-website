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
    published_at: datetime | None = None


class BlogPostUpdate(BaseModel):
    locale: str | None = None
    slug: str | None = None
    title: str | None = None
    excerpt: str | None = None
    author: str | None = None
    tags: list[str] | None = None
    published_at: datetime | None = None


class BlogPostRead(ReadBase):
    locale: str
    slug: str
    title: str
    excerpt: str
    author: str
    tags: list[str]
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
