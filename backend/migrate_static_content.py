#!/usr/bin/env python3
"""
Migration script to populate the content database with static content from frontend files.
This script extracts static content from React components and stores it in the content database.
"""

import os
import sys
import json
from datetime import datetime

# Add the backend directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import get_content_db
from app.models.content import Content, Page, Section

def migrate_home_content():
    """Migrate content from Home.tsx to the content database"""
    
    # Home page content
    home_page = {
        "slug": "home",
        "title": "Savyre Assessment Portal",
        "description": "Master Real-World Skills with On-Job Simulations",
        "content": "Savyre's comprehensive assessment portal features real-life workplace scenarios, industry-specific challenges, and practical problem-solving exercises that mirror actual job requirements.",
        "page_type": "home",
        "language": "en",
        "is_published": True,
        "seo_title": "Savyre - Real-World Skills Assessment Platform",
        "seo_description": "Master real-world skills with Savyre's comprehensive assessment portal featuring workplace scenarios and industry-specific challenges."
    }
    
    # Hero section content
    hero_section = {
        "section_key": "hero",
        "title": "Master Real-World Skills with On-Job Simulations",
        "content": "Savyre's comprehensive assessment portal features real-life workplace scenarios, industry-specific challenges, and practical problem-solving exercises that mirror actual job requirements.",
        "content_type": "html",
        "order": 1,
        "is_active": True,
        "meta_data": {
            "cta_primary": "Start Free Assessment",
            "cta_secondary": "Watch Demo",
            "stats": [
                {"value": "50K+", "label": "Professionals Assessed"},
                {"value": "200+", "label": "Real Scenarios"},
                {"value": "95%", "label": "Success Rate"}
            ]
        }
    }
    
    # Features section content
    features_section = {
        "section_key": "features",
        "title": "Why Choose Savyre?",
        "content": "Our platform combines cutting-edge technology with real-world scenarios to provide the most effective assessment experience.",
        "content_type": "html",
        "order": 2,
        "is_active": True,
        "meta_data": {
            "features": [
                {
                    "icon": "AcademicCapIcon",
                    "title": "Real-Life Scenarios",
                    "description": "Authentic workplace challenges that mirror actual job requirements"
                },
                {
                    "icon": "UserGroupIcon", 
                    "title": "Industry-Specific",
                    "description": "Tailored evaluations for different professional domains"
                },
                {
                    "icon": "ChartBarIcon",
                    "title": "Interactive Assessments", 
                    "description": "Dynamic content switching between multiple skill categories"
                },
                {
                    "icon": "ClockIcon",
                    "title": "Performance Tracking",
                    "description": "Monitor progress and identify areas for improvement"
                }
            ]
        }
    }
    
    # Assessment categories section
    assessments_section = {
        "section_key": "assessments",
        "title": "Comprehensive Assessment Categories",
        "content": "Choose from our diverse range of assessment types designed to evaluate every aspect of professional competency.",
        "content_type": "html",
        "order": 3,
        "is_active": True,
        "meta_data": {
            "categories": [
                {
                    "id": "leadership",
                    "title": "Leadership",
                    "description": "Develop essential leadership skills through real-world scenarios"
                },
                {
                    "id": "technical",
                    "title": "Technical", 
                    "description": "Master technical competencies with hands-on problem solving"
                },
                {
                    "id": "soft-skills",
                    "title": "Soft Skills",
                    "description": "Enhance communication, teamwork, and emotional intelligence"
                },
                {
                    "id": "industry",
                    "title": "Industry",
                    "description": "Industry-specific challenges tailored to your professional field"
                }
            ]
        }
    }
    
    # Industries section
    industries_section = {
        "section_key": "industries",
        "title": "Industry-Specific Solutions",
        "content": "Tailored assessments for professionals across diverse industries, ensuring relevance to your specific workplace challenges.",
        "content_type": "html",
        "order": 4,
        "is_active": True,
        "meta_data": {
            "industries": [
                {"name": "Technology", "icon": "💻", "description": "Software development, IT infrastructure, cybersecurity"},
                {"name": "Healthcare", "icon": "🏥", "description": "Patient care, medical procedures, healthcare management"},
                {"name": "Finance", "icon": "💰", "description": "Banking, investment, risk management, compliance"},
                {"name": "Education", "icon": "🎓", "description": "Teaching, curriculum development, student assessment"},
                {"name": "Manufacturing", "icon": "🏭", "description": "Production, quality control, supply chain management"},
                {"name": "Retail", "icon": "🛍️", "description": "Customer service, sales, inventory management"}
            ]
        }
    }
    
    # Pricing section
    pricing_section = {
        "section_key": "pricing",
        "title": "Choose Your Plan",
        "content": "Flexible pricing options designed to grow with your assessment needs, from individual professionals to enterprise teams.",
        "content_type": "html",
        "order": 5,
        "is_active": True,
        "meta_data": {
            "plans": [
                {
                    "name": "Starter",
                    "price": "$29",
                    "period": "/month",
                    "features": ["5 assessments per month", "Basic reporting", "Email support", "Standard scenarios"],
                    "popular": False
                },
                {
                    "name": "Professional",
                    "price": "$79", 
                    "period": "/month",
                    "features": ["Unlimited assessments", "Advanced analytics", "Priority support", "Custom scenarios", "Team collaboration"],
                    "popular": True
                },
                {
                    "name": "Enterprise",
                    "price": "Custom",
                    "period": "",
                    "features": ["Everything in Professional", "Custom integrations", "Dedicated support", "White-label options", "API access"],
                    "popular": False
                }
            ]
        }
    }
    
    # Contact section
    contact_section = {
        "section_key": "contact",
        "title": "Get in Touch",
        "content": "Ready to transform your assessment experience? Contact our team to learn more about how Savyre can help your organization.",
        "content_type": "html",
        "order": 6,
        "is_active": True,
        "meta_data": {
            "contact_info": {
                "email": "hello@savyre.com",
                "phone": "+1 (555) 123-4567",
                "address": "123 Innovation Drive<br />Tech City, TC 12345"
            }
        }
    }
    
    return home_page, [hero_section, features_section, assessments_section, industries_section, pricing_section, contact_section]

def migrate_demo_content():
    """Migrate content from Demo.tsx to the content database"""
    
    # Demo page content
    demo_page = {
        "slug": "demo",
        "title": "Savyre Assessment Demo",
        "description": "Experience our real-world workplace scenarios and interactive assessments",
        "content": "Experience our real-world workplace scenarios and interactive assessments. Get a feel for how Savyre evaluates professional skills through practical challenges.",
        "page_type": "demo",
        "language": "en",
        "is_published": True,
        "seo_title": "Savyre Assessment Demo - Try Our Platform",
        "seo_description": "Experience Savyre's real-world workplace scenarios and interactive assessments. Get a feel for how we evaluate professional skills."
    }
    
    # Demo assessments section
    demo_assessments_section = {
        "section_key": "demo_assessments",
        "title": "Try Our Demo Assessments",
        "content": "Experience our real-world workplace scenarios and interactive assessments. Get a feel for how Savyre evaluates professional skills through practical challenges.",
        "content_type": "html",
        "order": 1,
        "is_active": True,
        "meta_data": {
            "assessments": [
                {
                    "id": 1,
                    "title": "Leadership Challenge",
                    "description": "Navigate through real-world leadership scenarios and make critical decisions.",
                    "duration": 20,
                    "questions": 8,
                    "category": "Leadership"
                },
                {
                    "id": 2,
                    "title": "Technical Problem Solving",
                    "description": "Solve complex technical problems with limited time and resources.",
                    "duration": 15,
                    "questions": 6,
                    "category": "Technical"
                },
                {
                    "id": 3,
                    "title": "Communication Skills",
                    "description": "Practice effective communication in various workplace situations.",
                    "duration": 12,
                    "questions": 5,
                    "category": "Soft Skills"
                },
                {
                    "id": 4,
                    "title": "Team Collaboration",
                    "description": "Work through team dynamics and collaboration challenges.",
                    "duration": 18,
                    "questions": 7,
                    "category": "Teamwork"
                }
            ]
        }
    }
    
    # CTA section
    cta_section = {
        "section_key": "cta",
        "title": "Ready for the Full Experience?",
        "content": "Create your account to access our complete assessment library and track your progress over time.",
        "content_type": "html",
        "order": 2,
        "is_active": True,
        "meta_data": {
            "cta_primary": "Create Account",
            "cta_secondary": "Learn More"
        }
    }
    
    return demo_page, [demo_assessments_section, cta_section]

def migrate_candidate_home_content():
    """Migrate content from CandidateHome.tsx to the content database"""
    
    # Candidate home page content
    candidate_home_page = {
        "slug": "candidate-home",
        "title": "Candidate Dashboard - Savyre",
        "description": "Your personal assessment dashboard for tracking progress and accessing assessments",
        "content": "Welcome to your personal assessment dashboard. Track your progress, access new assessments, and showcase your skills to employers.",
        "page_type": "candidate_dashboard",
        "language": "en",
        "is_published": True,
        "seo_title": "Candidate Dashboard - Savyre Assessment Portal",
        "seo_description": "Access your personal assessment dashboard, track progress, and take new assessments on Savyre."
    }
    
    # Hero section content
    hero_section = {
        "section_key": "hero",
        "title": "Level Up Your Career Skills",
        "content": "Take real-world assessments, track your progress, and showcase your expertise to top employers. Your journey to professional excellence starts here.",
        "content_type": "html",
        "order": 1,
        "is_active": True,
        "meta_data": {
            "welcome_message": "Welcome back, {user_name}!",
            "cta_primary": "View My Assessments",
            "cta_secondary": "Update Profile"
        }
    }
    
    # Stats section content
    stats_section = {
        "section_key": "stats",
        "title": "Your Progress Overview",
        "content": "Track your assessment progress and skill development",
        "content_type": "html",
        "order": 2,
        "is_active": True,
        "meta_data": {
            "stats": [
                {
                    "icon": "ChartBarIcon",
                    "value": "5",
                    "label": "Total Assessments",
                    "color": "primary"
                },
                {
                    "icon": "CheckCircleIcon", 
                    "value": "2",
                    "label": "Completed",
                    "color": "green"
                },
                {
                    "icon": "StarIcon",
                    "value": "85%",
                    "label": "Average Score",
                    "color": "blue"
                },
                {
                    "icon": "TrophyIcon",
                    "value": "3",
                    "label": "Skills Mastered",
                    "color": "yellow"
                }
            ]
        }
    }
    
    # Features section content
    features_section = {
        "section_key": "features",
        "title": "Why Choose Savyre Assessments?",
        "content": "Our platform is designed to help you showcase your skills and advance your career",
        "content_type": "html",
        "order": 3,
        "is_active": True,
        "meta_data": {
            "features": [
                {
                    "icon": "AcademicCapIcon",
                    "title": "Real-World Scenarios",
                    "description": "Practice with assessments that mirror actual workplace challenges and industry standards."
                },
                {
                    "icon": "ChartBarIcon",
                    "title": "Progress Tracking",
                    "description": "Monitor your improvement with detailed analytics and performance insights."
                },
                {
                    "icon": "BriefcaseIcon",
                    "title": "Career Growth",
                    "description": "Build a portfolio of verified skills that employers recognize and value."
                }
            ]
        }
    }
    
    # Assessment categories section
    categories_section = {
        "section_key": "assessment_categories",
        "title": "Assessment Categories",
        "content": "Explore assessments across different domains and skill levels",
        "content_type": "html",
        "order": 4,
        "is_active": True,
        "meta_data": {
            "categories": [
                {"title": "Frontend Development", "icon": "💻", "count": 12, "color": "bg-blue-100 text-blue-800"},
                {"title": "Backend Engineering", "icon": "⚙️", "count": 15, "color": "bg-green-100 text-green-800"},
                {"title": "Data Science", "icon": "📊", "count": 8, "color": "bg-purple-100 text-purple-800"},
                {"title": "DevOps", "icon": "🚀", "count": 10, "color": "bg-orange-100 text-orange-800"},
                {"title": "Mobile Development", "icon": "📱", "count": 6, "color": "bg-pink-100 text-pink-800"},
                {"title": "System Design", "icon": "🏗️", "count": 9, "color": "bg-indigo-100 text-indigo-800"},
                {"title": "Database Design", "icon": "🗄️", "count": 7, "color": "bg-teal-100 text-teal-800"},
                {"title": "Security", "icon": "🔒", "count": 5, "color": "bg-red-100 text-red-800"}
            ]
        }
    }
    
    # CTA section content
    cta_section = {
        "section_key": "cta",
        "title": "Ready to Take Your Next Assessment?",
        "content": "Join thousands of professionals who are advancing their careers with Savyre assessments.",
        "content_type": "html",
        "order": 5,
        "is_active": True,
        "meta_data": {
            "cta_primary": "Start Assessment",
            "cta_secondary": "Complete Profile"
        }
    }
    
    return candidate_home_page, [hero_section, stats_section, features_section, categories_section, cta_section]

def main():
    """Main migration function"""
    print("🚀 Starting static content migration...")
    
    # Get content database session
    content_db = next(get_content_db())
    
    try:
        # Migrate home page content
        print("📄 Migrating home page content...")
        home_page_data, home_sections = migrate_home_content()
        
        # Create or update home page
        existing_home_page = content_db.query(Page).filter(Page.slug == 'home').first()
        if existing_home_page:
            for key, value in home_page_data.items():
                setattr(existing_home_page, key, value)
            home_page = existing_home_page
        else:
            home_page = Page(**home_page_data)
            content_db.add(home_page)
        content_db.commit()
        content_db.refresh(home_page)
        
        # Create or update home page sections
        for section_data in home_sections:
            section_data["page_id"] = home_page.id
            existing_section = content_db.query(Section).filter(
                Section.page_id == home_page.id,
                Section.section_key == section_data["section_key"]
            ).first()
            if existing_section:
                for key, value in section_data.items():
                    setattr(existing_section, key, value)
            else:
                section = Section(**section_data)
                content_db.add(section)
        
        # Migrate demo page content
        print("🎯 Migrating demo page content...")
        demo_page_data, demo_sections = migrate_demo_content()
        
        # Create or update demo page
        existing_demo_page = content_db.query(Page).filter(Page.slug == 'demo').first()
        if existing_demo_page:
            for key, value in demo_page_data.items():
                setattr(existing_demo_page, key, value)
            demo_page = existing_demo_page
        else:
            demo_page = Page(**demo_page_data)
            content_db.add(demo_page)
        content_db.commit()
        content_db.refresh(demo_page)
        
        # Create or update demo page sections
        for section_data in demo_sections:
            section_data["page_id"] = demo_page.id
            existing_section = content_db.query(Section).filter(
                Section.page_id == demo_page.id,
                Section.section_key == section_data["section_key"]
            ).first()
            if existing_section:
                for key, value in section_data.items():
                    setattr(existing_section, key, value)
            else:
                section = Section(**section_data)
                content_db.add(section)
        
        # Migrate candidate home page content
        print("👤 Migrating candidate home page content...")
        candidate_home_page_data, candidate_home_sections = migrate_candidate_home_content()
        
        # Create or update candidate home page
        existing_candidate_home_page = content_db.query(Page).filter(Page.slug == 'candidate-home').first()
        if existing_candidate_home_page:
            for key, value in candidate_home_page_data.items():
                setattr(existing_candidate_home_page, key, value)
            candidate_home_page = existing_candidate_home_page
        else:
            candidate_home_page = Page(**candidate_home_page_data)
            content_db.add(candidate_home_page)
        content_db.commit()
        content_db.refresh(candidate_home_page)
        
        # Create or update candidate home page sections
        for section_data in candidate_home_sections:
            section_data["page_id"] = candidate_home_page.id
            existing_section = content_db.query(Section).filter(
                Section.page_id == candidate_home_page.id,
                Section.section_key == section_data["section_key"]
            ).first()
            if existing_section:
                for key, value in section_data.items():
                    setattr(existing_section, key, value)
            else:
                section = Section(**section_data)
                content_db.add(section)
        
        # Create some reusable content blocks
        print("📦 Creating reusable content blocks...")
        
        content_blocks = [
            {
                "key": "hero_cta_primary",
                "title": "Primary CTA Button",
                "content": "Start Free Assessment",
                "content_type": "text",
                "category": "cta",
                "language": "en",
                "is_active": True
            },
            {
                "key": "hero_cta_secondary", 
                "title": "Secondary CTA Button",
                "content": "Watch Demo",
                "content_type": "text",
                "category": "cta",
                "language": "en",
                "is_active": True
            },
            {
                "key": "footer_copyright",
                "title": "Footer Copyright",
                "content": "© 2024 Savyre. All rights reserved.",
                "content_type": "text",
                "category": "footer",
                "language": "en",
                "is_active": True
            },
            {
                "key": "nav_home",
                "title": "Navigation Home Link",
                "content": "Home",
                "content_type": "text",
                "category": "navigation",
                "language": "en",
                "is_active": True
            },
            {
                "key": "nav_demo",
                "title": "Navigation Demo Link", 
                "content": "Demo",
                "content_type": "text",
                "category": "navigation",
                "language": "en",
                "is_active": True
            }
        ]
        
        for content_data in content_blocks:
            existing_content = content_db.query(Content).filter(
                Content.key == content_data["key"],
                Content.language == content_data["language"]
            ).first()
            if existing_content:
                for key, value in content_data.items():
                    setattr(existing_content, key, value)
            else:
                content = Content(**content_data)
                content_db.add(content)
        
        # Commit all changes
        content_db.commit()
        
        print("✅ Static content migration completed successfully!")
        print(f"📊 Created:")
        print(f"   - 3 pages (home, demo, candidate-home)")
        print(f"   - {len(home_sections) + len(demo_sections) + len(candidate_home_sections)} sections")
        print(f"   - {len(content_blocks)} content blocks")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        content_db.rollback()
        raise
    finally:
        content_db.close()

if __name__ == "__main__":
    main()
