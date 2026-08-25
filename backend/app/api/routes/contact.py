import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from html import escape

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

from app.core.config import get_settings

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


TOPIC_EMAILS = {
    "team": "hello@gytev.com",
    "support": "support@gytev.com",
    "press": "press@gytev.com",
    "privacy": "sales@gytev.com",
    "vulnerability": "security@gytev.com",
    "jobs": "jobs@gytev.com",
}

TOPIC_LABELS = {
    "team": "Talk to our team",
    "support": "Support",
    "press": "Press",
    "privacy": "Privacy request",
    "vulnerability": "Vulnerability report",
    "jobs": "Job application",
}

TOPIC_SUBJECTS = {
    "team": lambda d: f"New contact from {d.firstname} {d.lastname}",
    "support": lambda d: f"Support request from {d.email}",
    "press": lambda d: f"Press inquiry from {d.email}",
    "privacy": lambda d: f"Privacy request from {d.email}",
    "vulnerability": lambda d: f"Vulnerability report from {d.email}",
    "jobs": lambda d: f"Job application: {d.role or 'General'} from {d.email}",
}


def build_fields_html(data: ContactForm) -> str:
    rows = ""
    if data.firstname:
        rows += _row("Name", f"{data.firstname} {data.lastname or ''}")
    if data.role:
        rows += _row("Role", data.role)
    if data.name:
        rows += _row("Name", data.name)
    if data.outlet:
        rows += _row("Outlet", data.outlet)
    if data.type:
        rows += _row("Type", data.type)
    if data.product:
        rows += _row("Product", data.product)
    if data.message:
        rows += _row("Message", data.message, multiline=True)
    if data.request:
        rows += _row("Request", data.request, multiline=True)
    if data.issue:
        rows += _row("Issue", data.issue, multiline=True)
    if data.details:
        rows += _row("Details", data.details, multiline=True)
    if data.report:
        rows += _row("Report", data.report, multiline=True)
    if data.updates:
        rows += _row("Updates", "Yes — user opted in")
    return rows


def _row(label: str, value: str, multiline: bool = False) -> str:
    escaped = escape(value).replace("\n", "<br>")
    if multiline:
        return f"""
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#0a0a0b;border-bottom:1px solid #e5e5e5;width:140px;vertical-align:top;">{label}</td>
          <td style="padding:12px 16px;color:#3f3f46;border-bottom:1px solid #e5e5e5;">{escaped}</td>
        </tr>"""
    return f"""
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#0a0a0b;border-bottom:1px solid #e5e5e5;width:140px;">{label}</td>
          <td style="padding:12px 16px;color:#3f3f46;border-bottom:1px solid #e5e5e5;">{escaped}</td>
        </tr>"""


def build_html_email(data: ContactForm) -> str:
    topic_label = TOPIC_LABELS.get(data.topic, data.topic)
    fields_html = build_fields_html(data)

    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f2ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2ec;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0a0a0b;padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">GYTEV</span>
                  </td>
                  <td align="right">
                    <span style="font-size:12px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">{topic_label}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 8px;font-size:18px;font-weight:600;color:#0a0a0b;">New form submission</h2>
              <p style="margin:0 0 24px;font-size:14px;color:#71717a;">
                Received from <strong>{escape(data.email)}</strong> via the {topic_label} form.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
                <tr>
                  <td style="padding:12px 16px;font-weight:600;color:#0a0a0b;border-bottom:1px solid #e5e5e5;width:140px;">Email</td>
                  <td style="padding:12px 16px;color:#3f3f46;border-bottom:1px solid #e5e5e5;">
                    <a href="mailto:{escape(data.email)}" style="color:#c45824;text-decoration:none;">{escape(data.email)}</a>
                  </td>
                </tr>
                {fields_html}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa;border-top:1px solid #e5e5e5;padding:20px 32px;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;text-align:center;">
                This message was sent via the Gytev contact form.<br>
                gytev.com &mdash; Intelligent systems for the real world.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def build_text_email(data: ContactForm) -> str:
    topic_label = TOPIC_LABELS.get(data.topic, data.topic)
    lines = [
        f"GYTEV — {topic_label}",
        f"New form submission from {data.email}",
        "",
    ]
    if data.firstname:
        lines.append(f"Name: {data.firstname} {data.lastname or ''}")
    if data.role:
        lines.append(f"Role: {data.role}")
    if data.name:
        lines.append(f"Name: {data.name}")
    if data.outlet:
        lines.append(f"Outlet: {data.outlet}")
    if data.message:
        lines.append(f"Message: {data.message}")
    if data.request:
        lines.append(f"Request: {data.request}")
    if data.issue:
        lines.append(f"Issue: {data.issue}")
    if data.type:
        lines.append(f"Type: {data.type}")
    if data.details:
        lines.append(f"Details: {data.details}")
    if data.product:
        lines.append(f"Product: {data.product}")
    if data.report:
        lines.append(f"Report: {data.report}")
    if data.updates:
        lines.append("User opted in for updates.")
    lines += ["", "—", "gytev.com — Intelligent systems for the real world."]
    return "\n".join(lines)


@router.post("")
async def submit_contact(form: ContactForm):
    settings = get_settings()
    smtp_host = settings.smtp_host
    smtp_port = settings.smtp_port
    smtp_user = settings.smtp_user
    smtp_pass = settings.smtp_pass
    from_email = settings.from_email

    to_email = TOPIC_EMAILS.get(form.topic, "hello@gytev.com")
    subject_fn = TOPIC_SUBJECTS.get(form.topic, lambda d: f"Contact form submission from {d.email}")
    subject = subject_fn(form)

    if smtp_host and smtp_user and smtp_pass:
        msg = MIMEMultipart("alternative")
        msg["From"] = f"Gytev <{from_email}>"
        msg["To"] = to_email
        msg["Subject"] = subject
        msg["Reply-To"] = form.email
        msg.attach(MIMEText(build_text_email(form), "plain"))
        msg.attach(MIMEText(build_html_email(form), "html"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

    return {"ok": True, "message": "Form submitted successfully"}
