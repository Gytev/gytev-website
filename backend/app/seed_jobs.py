"""Seed job_departments + job_openings tables.

Usage (from backend/):
    uv run python -m app.seed_jobs
    uv run python -m app.seed_jobs --reset
"""

import argparse
import asyncio

from sqlalchemy import delete, select

from app.core.database import Base, SessionLocal, engine
from app.models import JobDepartment, JobOpening

DEPARTMENTS = [
    {
        "slug": "ai-research",
        "name": "AI & Research",
        "description": (
            "Pioneering machine learning models and digital twins that "
            "understand the physical world."
        ),
        "sort_order": 0,
        "jobs": [
            {
                "title": "Senior ML Engineer, Time Series",
                "location": "Cotonou / Remote",
                "type": "Full-time",
                "description": (
                    "Design and train time-series models that power our "
                    "environmental monitoring and agricultural intelligence "
                    "platforms. You'll work with massive sensor datasets to "
                    "build predictive systems that operate in real-time."
                ),
                "requirements": [
                    "5+ years in ML engineering",
                    "Strong experience with time-series data",
                    "Proficiency in Python, PyTorch",
                    "Experience deploying models to production",
                ],
                "sort_order": 0,
            },
            {
                "title": "Research Scientist, Computer Vision",
                "location": "Cotonou",
                "type": "Full-time",
                "description": (
                    "Develop computer vision models for satellite and drone "
                    "imagery analysis. Your work will directly impact crop "
                    "health monitoring, infrastructure assessment, and "
                    "environmental monitoring across Africa."
                ),
                "requirements": [
                    "PhD or equivalent experience in CV/ML",
                    "Published research in top venues",
                    "Experience with remote sensing data",
                    "Strong Python and deep learning skills",
                ],
                "sort_order": 1,
            },
            {
                "title": "Applied AI Engineer",
                "location": "Cotonou / Remote",
                "type": "Full-time",
                "description": (
                    "Bridge the gap between research and production. You'll "
                    "take cutting-edge models and make them work reliably in "
                    "harsh field conditions with limited connectivity and "
                    "compute."
                ),
                "requirements": [
                    "3+ years in applied ML",
                    "Experience with edge deployment",
                    "Strong software engineering skills",
                    "Comfort with ambiguity and rapid iteration",
                ],
                "sort_order": 2,
            },
        ],
    },
    {
        "slug": "engineering",
        "name": "Engineering",
        "description": (
            "Shipping the platforms, hardware, and infrastructure that bring "
            "intelligent systems to life."
        ),
        "sort_order": 1,
        "jobs": [
            {
                "title": "Embedded Systems Engineer (C/Rust)",
                "location": "Cotonou",
                "type": "Full-time",
                "description": (
                    "Build firmware for our sensor networks that operate in "
                    "remote environments. You'll design low-power, resilient "
                    "systems that collect and transmit environmental data "
                    "from farms and healthcare facilities."
                ),
                "requirements": [
                    "3+ years embedded C or Rust",
                    "Experience with low-power systems",
                    "Knowledge of wireless protocols",
                    "Comfort working with hardware",
                ],
                "sort_order": 0,
            },
            {
                "title": "Frontend Engineer (React/WebGL)",
                "location": "Remote (UTC+1)",
                "type": "Full-time",
                "description": (
                    "Build the dashboards and visualization tools that make "
                    "complex environmental data understandable. You'll work "
                    "with WebGL, real-time data streams, and interactive "
                    "mapping interfaces."
                ),
                "requirements": [
                    "3+ years React/TypeScript",
                    "Experience with WebGL or Three.js",
                    "Strong design sensibility",
                    "Experience with data visualization",
                ],
                "sort_order": 1,
            },
            {
                "title": "Platform Engineer",
                "location": "Cotonou / Remote",
                "type": "Full-time",
                "description": (
                    "Design and maintain the cloud infrastructure that "
                    "processes millions of sensor readings daily. You'll "
                    "build reliable, scalable systems that serve critical "
                    "applications in healthcare and agriculture."
                ),
                "requirements": [
                    "3+ years in DevOps/SRE",
                    "Experience with AWS or GCP",
                    "Strong Kubernetes skills",
                    "Experience with data pipelines",
                ],
                "sort_order": 2,
            },
            {
                "title": "Hardware Test Engineer",
                "location": "Cotonou",
                "type": "Full-time",
                "description": (
                    "Develop testing protocols and automated test rigs for "
                    "our sensor hardware. Ensure reliability of devices "
                    "deployed in harsh agricultural and healthcare "
                    "environments."
                ),
                "requirements": [
                    "2+ years in hardware testing",
                    "Experience with test automation",
                    "Knowledge of sensor calibration",
                    "Strong documentation skills",
                ],
                "sort_order": 3,
            },
        ],
    },
    {
        "slug": "gtm",
        "name": "GTM",
        "description": (
            "Empowering customers to solve real business challenges with our "
            "solutions."
        ),
        "sort_order": 2,
        "jobs": [
            {
                "title": "Solutions Engineer",
                "location": "Cotonou / West Africa",
                "type": "Full-time",
                "description": (
                    "Work directly with agricultural cooperatives and "
                    "healthcare organizations to deploy our solutions. "
                    "You'll understand their challenges, configure our "
                    "systems, and ensure successful adoption."
                ),
                "requirements": [
                    "3+ years in solutions engineering",
                    "Strong technical and communication skills",
                    "Experience in agriculture or healthcare",
                    "Comfort with field travel",
                ],
                "sort_order": 0,
            },
            {
                "title": "Business Development Manager",
                "location": "Cotonou",
                "type": "Full-time",
                "description": (
                    "Drive adoption of our intelligent systems across key "
                    "verticals. You'll build relationships with government "
                    "agencies, NGOs, and private sector partners to scale "
                    "our impact."
                ),
                "requirements": [
                    "5+ years in B2B sales",
                    "Network in West African markets",
                    "Experience with enterprise sales",
                    "Strong presentation skills",
                ],
                "sort_order": 1,
            },
        ],
    },
    {
        "slug": "corporate",
        "name": "Corporate",
        "description": (
            "Building the operational foundations for long-term success."
        ),
        "sort_order": 3,
        "jobs": [
            {
                "title": "Finance & Operations Manager",
                "location": "Cotonou",
                "type": "Full-time",
                "description": (
                    "Manage financial planning, reporting, and operational "
                    "processes for a fast-growing deep-tech company. You'll "
                    "build the systems that enable scale across multiple "
                    "countries."
                ),
                "requirements": [
                    "5+ years in finance/ops",
                    "Experience with multi-country operations",
                    "Strong analytical skills",
                    "CPA or equivalent preferred",
                ],
                "sort_order": 0,
            },
            {
                "title": "People & Culture Lead",
                "location": "Cotonou",
                "type": "Full-time",
                "description": (
                    "Design and implement HR processes for a distributed, "
                    "multicultural team. You'll own recruiting, onboarding, "
                    "performance management, and culture initiatives."
                ),
                "requirements": [
                    "4+ years in HR/people ops",
                    "Experience with remote teams",
                    "Strong interpersonal skills",
                    "Knowledge of West African labor law",
                ],
                "sort_order": 1,
            },
        ],
    },
    {
        "slug": "operations",
        "name": "Operations",
        "description": (
            "Deploying sensors, managing logistics, and ensuring real-world "
            "impact on the ground."
        ),
        "sort_order": 4,
        "jobs": [
            {
                "title": "Deployment Lead (Agriculture)",
                "location": "West Africa",
                "type": "Full-time",
                "description": (
                    "Lead field operations for sensor deployment across "
                    "agricultural sites. You'll manage teams, coordinate "
                    "with farmers, and ensure our hardware operates reliably "
                    "in real-world conditions."
                ),
                "requirements": [
                    "3+ years in field operations",
                    "Experience in agriculture",
                    "Strong project management skills",
                    "Comfort with rural fieldwork",
                ],
                "sort_order": 0,
            },
            {
                "title": "Sensor Network Technician",
                "location": "Cotonou / Benin",
                "type": "Full-time",
                "description": (
                    "Install, maintain, and troubleshoot sensor networks in "
                    "agricultural and healthcare settings. You'll be the "
                    "bridge between our technology and the real world."
                ),
                "requirements": [
                    "2+ years in technical fieldwork",
                    "Basic electronics knowledge",
                    "Strong problem-solving skills",
                    "Willingness to travel",
                ],
                "sort_order": 1,
            },
        ],
    },
    {
        "slug": "product",
        "name": "Product",
        "description": (
            "Designing the platforms and experiences that make complex "
            "systems understandable."
        ),
        "sort_order": 5,
        "jobs": [
            {
                "title": "Product Manager (Data Platform)",
                "location": "Cotonou / Remote",
                "type": "Full-time",
                "description": (
                    "Define and execute the product vision for our data "
                    "platform that processes millions of sensor readings. "
                    "You'll work at the intersection of AI, hardware, and "
                    "user experience."
                ),
                "requirements": [
                    "3+ years in product management",
                    "Experience with data platforms",
                    "Strong technical understanding",
                    "Experience with enterprise products",
                ],
                "sort_order": 0,
            },
            {
                "title": "UX Designer",
                "location": "Remote (UTC+1)",
                "type": "Full-time",
                "description": (
                    "Design intuitive interfaces for complex environmental "
                    "monitoring systems. Your work will make satellite "
                    "imagery, sensor data, and AI predictions accessible to "
                    "non-technical users."
                ),
                "requirements": [
                    "3+ years in UX design",
                    "Experience with data-heavy interfaces",
                    "Strong portfolio",
                    "Proficiency in Figma",
                ],
                "sort_order": 1,
            },
        ],
    },
]

LOCALES = ("en", "fr")


async def seed_jobs(reset: bool) -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as db:
        if reset:
            await db.execute(delete(JobOpening))
            await db.execute(delete(JobDepartment))
            await db.commit()

        for locale in LOCALES:
            # Check if departments already exist for this locale
            existing = await db.execute(
                select(JobDepartment).where(JobDepartment.locale == locale)
            )
            if existing.scalars().first() is not None:
                print(f"[skip] {locale}: departments already seeded")
                continue

            dept_ids: dict[str, str] = {}
            for dept_data in DEPARTMENTS:
                dept = JobDepartment(
                    locale=locale,
                    slug=dept_data["slug"],
                    name=dept_data["name"],
                    description=dept_data["description"],
                    sort_order=dept_data["sort_order"],
                )
                db.add(dept)
                await db.flush()
                dept_ids[dept_data["slug"]] = str(dept.id)

                for job_data in dept_data["jobs"]:
                    job = JobOpening(
                        locale=locale,
                        department_id=dept.id,
                        title=job_data["title"],
                        location=job_data["location"],
                        type=job_data["type"],
                        description=job_data["description"],
                        requirements=job_data["requirements"],
                        sort_order=job_data["sort_order"],
                    )
                    db.add(job)

            await db.commit()
            total_jobs = sum(len(d["jobs"]) for d in DEPARTMENTS)
            print(
                f"[ok] {locale}: {len(DEPARTMENTS)} departments "
                f"+ {total_jobs} jobs seeded"
            )


async def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--reset", action="store_true", help="vider les tables avant de re-seed"
    )
    args = parser.parse_args()
    await seed_jobs(reset=args.reset)
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
