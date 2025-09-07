from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from typing import Optional, Dict, Any, List
from datetime import datetime

from sqlalchemy.ext.declarative import declarative_base

# Separate base for content database
ContentBase = declarative_base()


class Content(ContentBase):
    __tablename__ = "content"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    key: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(500))
    content: Mapped[str] = mapped_column(Text, nullable=False)
    content_type: Mapped[str] = mapped_column(String(50), nullable=False)  # 'text', 'html', 'markdown', 'json'
    category: Mapped[Optional[str]] = mapped_column(String(100))  # 'hero', 'features', 'testimonials', etc.
    language: Mapped[str] = mapped_column(String(10), default='en')
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    meta_data: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<Content(key='{self.key}', type='{self.content_type}')>"


class Page(ContentBase):
    __tablename__ = "pages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    page_type: Mapped[str] = mapped_column(String(50), nullable=False)  # 'home', 'about', 'pricing', etc.
    language: Mapped[str] = mapped_column(String(10), default='en')
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    seo_title: Mapped[Optional[str]] = mapped_column(String(500))
    seo_description: Mapped[Optional[str]] = mapped_column(Text)
    meta_data: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to sections
    sections: Mapped[List["Section"]] = relationship("Section", back_populates="page", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Page(slug='{self.slug}', title='{self.title}')>"


class Section(ContentBase):
    __tablename__ = "sections"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    page_id: Mapped[int] = mapped_column(Integer, ForeignKey("pages.id"), nullable=False)
    section_key: Mapped[str] = mapped_column(String(255), nullable=False)  # 'hero', 'features', 'testimonials'
    title: Mapped[Optional[str]] = mapped_column(String(500))
    content: Mapped[str] = mapped_column(Text, nullable=False)
    content_type: Mapped[str] = mapped_column(String(50), nullable=False)  # 'text', 'html', 'markdown'
    order: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    meta_data: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to page
    page: Mapped["Page"] = relationship("Page", back_populates="sections")

    def __repr__(self):
        return f"<Section(key='{self.section_key}', page_id={self.page_id})>"
