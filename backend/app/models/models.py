from uuid import uuid4

from sqlalchemy import UUID, Column, DateTime, String, Text, func

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    slug = Column(String(120), unique=True, nullable=False, index=True)
    name = Column(String(120), nullable=False)
    tagline = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    slug = Column(String(160), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    excerpt = Column(Text, nullable=False)
    author = Column(String(120), nullable=False)
    published_at = Column(DateTime(timezone=True), nullable=True)
