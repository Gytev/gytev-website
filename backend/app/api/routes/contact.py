from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter(prefix="/contact", tags=["contact"])


class ContactForm(BaseModel):
    topic: str
    email: EmailStr
    firstname: str | None = None
    lastname: str | None = None
    role: str | None = None
    message: str | None = None
    name: str | None = None
    outlet: str | None = None
    request: str | None = None
    issue: str | None = None
    type: str | None = None
    details: str | None = None
    product: str | None = None
    report: str | None = None
    updates: bool = False


def get_topic_email(topic: str) -> str:
    emails = {
        "team": "hello@gytev.com",
        "support": "support@gytev.com",
        "press": "press@gytev.com",
        "privacy": "sales@gytev.com",
        "vulnerability": "security@gytev.com",
    }
    return emails.get(topic, "contact@gytev.com")


def build_subject(topic: str, data: ContactForm) -> str:
    subjects = {
        "team": f"New contact from {data.firstname} {data.lastname}",
        "support": f"Support request from {data.email}",
        "press": f"Press inquiry from {data.email}",
        "privacy": f"Privacy request from {data.email}",
        "vulnerability": f"Vulnerability report from {data.email}",
    }
    return subjects.get(topic, f"Contact form submission from {data.email}")


def build_body(data: ContactForm) -> str:
    lines = [f"Topic: {data.topic}", f"Email: {data.email}", ""]

    if data.firstname:
        lines.append(f"Name: {data.firstname} {data.lastname or ''}")
    if data.role:
        lines.append(f"Role: {data.role}")
    if data.message:
        lines.append(f"\nMessage:\n{data.message}")
    if data.name:
        lines.append(f"Name: {data.name}")
    if data.outlet:
        lines.append(f"Outlet: {data.outlet}")
    if data.request:
        lines.append(f"\nRequest:\n{data.request}")
    if data.issue:
        lines.append(f"\nIssue:\n{data.issue}")
    if data.type:
        lines.append(f"Type: {data.type}")
    if data.details:
        lines.append(f"\nDetails:\n{data.details}")
    if data.product:
        lines.append(f"Product: {data.product}")
    if data.report:
        lines.append(f"\nReport:\n{data.report}")
    if data.updates:
        lines.append("\nUser opted in for updates.")

    return "\n".join(lines)


@router.post("")
async def submit_contact(form: ContactForm):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    from_email = os.getenv("FROM_EMAIL", "noreply@gytev.com")

    to_email = get_topic_email(form.topic)
    subject = build_subject(form.topic, form)
    body = build_body(form)

    if smtp_host and smtp_user and smtp_pass:
        msg = MIMEMultipart()
        msg["From"] = from_email
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

    return {"ok": True, "message": "Form submitted successfully"}
