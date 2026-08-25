from fastapi import APIRouter

from app.api.routes import (
    admin,
    blog,
    company,
    contact,
    content,
    customers,
    developers,
    health,
    jobs,
    navigation,
    products,
    research,
    solutions,
)

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(content.router)
api_router.include_router(admin.router)
api_router.include_router(navigation.router)
api_router.include_router(products.router)
api_router.include_router(solutions.router)
api_router.include_router(research.router)
api_router.include_router(developers.router)
api_router.include_router(blog.router)
api_router.include_router(customers.router)
api_router.include_router(company.router)
api_router.include_router(company.milestones_router)
api_router.include_router(company.team_router)
api_router.include_router(company.partners_router)
api_router.include_router(company.contact_router)
api_router.include_router(contact.router)
api_router.include_router(jobs.router)
api_router.include_router(jobs.openings_router)
api_router.include_router(jobs.grouped_router)
