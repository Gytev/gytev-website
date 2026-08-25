from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.crud import content_router, Db
from app.core.database import get_db
from app.core.security import require_api_key
from app.models import JobDepartment, JobOpening
from app.schemas import (
    JobDepartmentCreate,
    JobDepartmentRead,
    JobDepartmentUpdate,
    JobOpeningCreate,
    JobOpeningRead,
    JobOpeningUpdate,
)

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("", response_model=list[JobDepartmentRead])
async def list_departments(
    db: Db,
    locale: str | None = Query(default=None, max_length=8),
) -> list[JobDepartmentRead]:
    query = select(JobDepartment).order_by(JobDepartment.sort_order, JobDepartment.created_at)
    if locale:
        query = query.where(JobDepartment.locale == locale)
    result = await db.execute(query)
    return list(result.scalars().all())


router.include_router(
    content_router(
        model=JobDepartment,
        prefix="/jobs/departments",
        tags=["jobs"],
        read_schema=JobDepartmentRead,
        create_schema=JobDepartmentCreate,
        update_schema=JobDepartmentUpdate,
    )
)

router.include_router(
    content_router(
        model=JobOpening,
        prefix="/jobs/openings",
        tags=["jobs"],
        read_schema=JobOpeningRead,
        create_schema=JobOpeningCreate,
        update_schema=JobOpeningUpdate,
    )
)


class DepartmentWithJobs(JobDepartmentRead):
    jobs: list[JobOpeningRead] = []


@router.get("/grouped", response_model=list[DepartmentWithJobs])
async def list_grouped(
    db: Db,
    locale: str | None = Query(default=None, max_length=8),
) -> list[DepartmentWithJobs]:
    query = select(JobDepartment).order_by(JobDepartment.sort_order, JobDepartment.created_at)
    if locale:
        query = query.where(JobDepartment.locale == locale)
    result = await db.execute(query)
    departments = list(result.scalars().all())

    job_query = select(JobOpening).order_by(JobOpening.sort_order, JobOpening.created_at)
    if locale:
        job_query = job_query.where(JobOpening.locale == locale)
    job_result = await db.execute(job_query)
    all_jobs = list(job_result.scalars().all())

    jobs_by_dept: dict[str, list[JobOpeningRead]] = {}
    for job in all_jobs:
        dept_id = str(job.department_id)
        if dept_id not in jobs_by_dept:
            jobs_by_dept[dept_id] = []
        jobs_by_dept[dept_id].append(
            JobOpeningRead.model_validate(job)
        )

    output: list[DepartmentWithJobs] = []
    for dept in departments:
        dept_jobs = jobs_by_dept.get(str(dept.id), [])
        output.append(
            DepartmentWithJobs(
                **JobDepartmentRead.model_validate(dept).model_dump(),
                jobs=dept_jobs,
            )
        )
    return output
