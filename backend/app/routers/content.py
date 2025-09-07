from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..core.database import get_content_db
from ..models.content import Content, Page, Section
from ..schemas import ContentCreate, ContentRead, ContentUpdate

router = APIRouter()


@router.get("/", response_model=List[ContentRead])
def get_content(
    category: Optional[str] = Query(None, description="Filter by category"),
    language: str = Query("en", description="Language code"),
    is_active: bool = Query(True, description="Filter by active status"),
    db: Session = Depends(get_content_db)
):
    """Get all content items with optional filtering"""
    query = db.query(Content).filter(Content.language == language)
    
    if category:
        query = query.filter(Content.category == category)
    
    if is_active is not None:
        query = query.filter(Content.is_active == is_active)
    
    return query.all()


# Page endpoints (must come before /{key} to avoid conflicts)
@router.get("/pages", response_model=List[dict])
def get_pages(
    language: str = Query("en"),
    is_published: bool = Query(True),
    db: Session = Depends(get_content_db)
):
    """Get all pages with their sections"""
    query = db.query(Page).filter(Page.language == language)
    
    if is_published is not None:
        query = query.filter(Page.is_published == is_published)
    
    pages = query.all()
    
    # Load sections for each page
    result = []
    for page in pages:
        page_dict = {
            "id": page.id,
            "slug": page.slug,
            "title": page.title,
            "description": page.description,
            "content": page.content,
            "page_type": page.page_type,
            "language": page.language,
            "is_published": page.is_published,
            "seo_title": page.seo_title,
            "seo_description": page.seo_description,
            "meta_data": page.meta_data,
            "created_at": page.created_at.isoformat(),
            "updated_at": page.updated_at.isoformat(),
            "sections": []
        }
        
        # Get sections for this page
        sections = db.query(Section).filter(
            Section.page_id == page.id,
            Section.is_active == True
        ).order_by(Section.order).all()
        
        for section in sections:
            section_dict = {
                "id": section.id,
                "section_key": section.section_key,
                "title": section.title,
                "content": section.content,
                "content_type": section.content_type,
                "order": section.order,
                "is_active": section.is_active,
                "meta_data": section.meta_data,
                "created_at": section.created_at.isoformat(),
                "updated_at": section.updated_at.isoformat()
            }
            page_dict["sections"].append(section_dict)
        
        result.append(page_dict)
    
    return result


@router.get("/pages/{slug}", response_model=dict)
def get_page_by_slug(
    slug: str,
    language: str = Query("en"),
    db: Session = Depends(get_content_db)
):
    """Get a page by slug with its sections"""
    page = db.query(Page).filter(
        Page.slug == slug,
        Page.language == language,
        Page.is_published == True
    ).first()
    
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    page_dict = {
        "id": page.id,
        "slug": page.slug,
        "title": page.title,
        "description": page.description,
        "content": page.content,
        "page_type": page.page_type,
        "language": page.language,
        "is_published": page.is_published,
        "seo_title": page.seo_title,
        "seo_description": page.seo_description,
        "meta_data": page.meta_data,
        "created_at": page.created_at.isoformat(),
        "updated_at": page.updated_at.isoformat(),
        "sections": []
    }
    
    # Get sections for this page
    sections = db.query(Section).filter(
        Section.page_id == page.id,
        Section.is_active == True
    ).order_by(Section.order).all()
    
    for section in sections:
        section_dict = {
            "id": section.id,
            "section_key": section.section_key,
            "title": section.title,
            "content": section.content,
            "content_type": section.content_type,
            "order": section.order,
            "is_active": section.is_active,
            "meta_data": section.meta_data,
            "created_at": section.created_at.isoformat(),
            "updated_at": section.updated_at.isoformat()
        }
        page_dict["sections"].append(section_dict)
    
    return page_dict


@router.get("/pages/{page_id}/sections", response_model=List[dict])
def get_page_sections(
    page_id: int,
    db: Session = Depends(get_content_db)
):
    """Get all sections for a specific page"""
    sections = db.query(Section).filter(
        Section.page_id == page_id,
        Section.is_active == True
    ).order_by(Section.order).all()
    
    result = []
    for section in sections:
        section_dict = {
            "id": section.id,
            "section_key": section.section_key,
            "title": section.title,
            "content": section.content,
            "content_type": section.content_type,
            "order": section.order,
            "is_active": section.is_active,
            "meta_data": section.meta_data,
            "created_at": section.created_at.isoformat(),
            "updated_at": section.updated_at.isoformat()
        }
        result.append(section_dict)
    
    return result


@router.get("/pages/{page_id}/sections/{section_key}", response_model=dict)
def get_page_section(
    page_id: int,
    section_key: str,
    db: Session = Depends(get_content_db)
):
    """Get a specific section by page ID and section key"""
    section = db.query(Section).filter(
        Section.page_id == page_id,
        Section.section_key == section_key,
        Section.is_active == True
    ).first()
    
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    
    return {
        "id": section.id,
        "section_key": section.section_key,
        "title": section.title,
        "content": section.content,
        "content_type": section.content_type,
        "order": section.order,
        "is_active": section.is_active,
        "meta_data": section.meta_data,
        "created_at": section.created_at.isoformat(),
        "updated_at": section.updated_at.isoformat()
    }


@router.get("/{key}", response_model=ContentRead)
def get_content_by_key(key: str, language: str = Query("en"), db: Session = Depends(get_content_db)):
    """Get content by key"""
    content = db.query(Content).filter(
        Content.key == key,
        Content.language == language,
        Content.is_active == True
    ).first()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    return content


@router.post("/", response_model=ContentRead)
def create_content(content: ContentCreate, db: Session = Depends(get_content_db)):
    """Create new content"""
    # Check if content with same key and language already exists
    existing = db.query(Content).filter(
        Content.key == content.key,
        Content.language == content.language
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Content with this key and language already exists")
    
    db_content = Content(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    
    return db_content


@router.put("/{key}", response_model=ContentRead)
def update_content(
    key: str,
    content_update: ContentUpdate,
    language: str = Query("en"),
    db: Session = Depends(get_content_db)
):
    """Update content by key"""
    content = db.query(Content).filter(
        Content.key == key,
        Content.language == language
    ).first()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    update_data = content_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(content, field, value)
    
    content.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(content)
    
    return content


@router.delete("/{key}")
def delete_content(key: str, language: str = Query("en"), db: Session = Depends(get_content_db)):
    """Delete content by key"""
    content = db.query(Content).filter(
        Content.key == key,
        Content.language == language
    ).first()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    db.delete(content)
    db.commit()
    
    return {"message": "Content deleted successfully"}


@router.get("/category/{category}", response_model=List[ContentRead])
def get_content_by_category(
    category: str,
    language: str = Query("en"),
    is_active: bool = Query(True),
    db: Session = Depends(get_content_db)
):
    """Get all content in a specific category"""
    query = db.query(Content).filter(
        Content.category == category,
        Content.language == language,
        Content.is_active == is_active
    )
    
    return query.all()


