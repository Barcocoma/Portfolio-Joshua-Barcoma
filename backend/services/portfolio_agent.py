from __future__ import annotations

import json
import os
from dataclasses import dataclass
from urllib.parse import quote


@dataclass(frozen=True)
class Profile:
    name: str
    role: str
    focus: str
    location: str
    email: str
    github: str


PROFILE = Profile(
    name="Joshua Barcoma",
    role="Software Developer",
    focus=(
        "Aspiring Software Developer focused on building practical, clean, and responsive "
        "web systems based on real project experience, with strong skills in frontend "
        "development, backend APIs, and database-driven applications."
    ),
    location="Philippines",
    email=os.getenv("CONTACT_EMAIL", "barcomajoshua87@gmail.com"),
    github="https://github.com/Barcocoma",
)

PROJECTS = [
    {
        "title": "AI & Automation Experience",
        "category": "AI-powered implementation",
        "description": (
            "Built AI-assisted and automated workflows using memory, vector search, "
            "API integrations, and backend logic."
        ),
        "stack": ["AI Assistant", "pgvector", "APIs", "Automation"],
    },
    {
        "title": "Real Systems Built",
        "category": "Applied software systems",
        "description": (
            "Developed practical systems for recruitment workflows, habit tracking, "
            "analytics, reminders, and dynamic data collection."
        ),
        "stack": ["Authentication", "CRUD", "Analytics", "Deployment"],
    },
    {
        "title": "Student Information System",
        "category": "Full-stack system",
        "description": "Manages student records, subjects, enrollment data, grades, and reports.",
        "stack": ["React", "Node.js", "MySQL"],
    },
    {
        "title": "Inventory Management System",
        "category": "Business system",
        "description": "Tracks products, stock movement, suppliers, and low-stock alerts.",
        "stack": ["Laravel", "PHP", "Bootstrap"],
    },
    {
        "title": "Online Appointment System",
        "category": "Scheduling app",
        "description": "Handles appointment requests, confirmations, and schedule monitoring.",
        "stack": ["React", "Express", "MongoDB"],
    },
    {
        "title": "Capstone / Thesis System",
        "category": "Academic project",
        "description": "Includes authentication, user roles, records, and reports.",
        "stack": ["HTML", "CSS", "JavaScript"],
    },
]

SKILLS = [
    {
        "type": "Frontend Development",
        "tools": ["React", "Vite", "JavaScript", "HTML", "CSS"],
    },
    {
        "type": "Backend Development",
        "tools": ["Node.js", "PHP", "Python", "REST API Development", "Authentication (JWT)"],
    },
    {
        "type": "Database Management",
        "tools": ["MySQL", "MongoDB", "PostgreSQL (basic)", "CRUD Operations", "Schema Design"],
    },
    {
        "type": "System Development",
        "tools": ["Full-stack Applications", "API Integration", "Automation Scripts (Python)"],
    },
    {"type": "Workflow", "tools": ["Git", "GitHub", "VS Code", "Postman"]},
    {
        "type": "Quality & Deployment",
        "tools": ["Debugging", "Validation", "Clean Code Structure", "Deployment Preparation"],
    },
]


class AssistantConfigurationError(RuntimeError):
    pass


def _load_env() -> None:
    try:
        from dotenv import load_dotenv
    except ModuleNotFoundError as exc:
        raise AssistantConfigurationError(
            "Install backend dependencies first: pip install -r requirements.txt"
        ) from exc

    load_dotenv()


def _client():
    _load_env()

    if os.getenv("OPENAI_API_KEY") in (None, "", "your_openai_api_key_here"):
        raise AssistantConfigurationError(
            "Set OPENAI_API_KEY in your .env file before using the AI assistant."
        )

    try:
        from openai import OpenAI
    except ModuleNotFoundError as exc:
        raise AssistantConfigurationError(
            "Install backend dependencies first: pip install -r requirements.txt"
        ) from exc

    return OpenAI()


def _gmail_href(subject: str, body: str) -> str:
    contact_email = os.getenv("CONTACT_EMAIL", PROFILE.email)
    return (
        "https://mail.google.com/mail/?view=cm&fs=1"
        f"&to={quote(contact_email)}"
        f"&su={quote(subject)}"
        f"&body={quote(body)}"
    )


def _portfolio_context() -> str:
    projects = "\n".join(
        (
            f"- {project['title']} ({project['category']}): {project['description']} "
            f"Stack: {', '.join(project['stack'])}."
        )
        for project in PROJECTS
    )
    skills = "\n".join(
        f"- {skill['type']}: {', '.join(skill['tools'])}" for skill in SKILLS
    )

    return (
        f"Profile:\n"
        f"Name: {PROFILE.name}\n"
        f"Role: {PROFILE.role}\n"
        f"Focus: {PROFILE.focus}\n"
        f"Location: {PROFILE.location}\n"
        f"Email: {os.getenv('CONTACT_EMAIL', PROFILE.email)}\n"
        f"GitHub: {PROFILE.github}\n\n"
        f"Projects:\n{projects}\n\n"
        f"Skills:\n{skills}"
    )


def _parse_model_json(value: str) -> dict[str, str | bool | None]:
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError:
        return {
            "text": value,
            "wantsEmailDraft": False,
            "emailSubject": None,
            "emailBody": None,
        }

    if not isinstance(parsed, dict):
        return {
            "text": value,
            "wantsEmailDraft": False,
            "emailSubject": None,
            "emailBody": None,
        }

    return parsed


def create_reply(prompt: str) -> dict[str, str | None]:
    clean_prompt = prompt.strip()

    if not clean_prompt:
        return {
            "text": "Ask me about Joshua's systems, skills, projects, or contact details.",
            "actionLabel": None,
            "href": None,
        }

    client = _client()
    model = os.getenv("OPENAI_MODEL", "gpt-5.2")
    instructions = (
        "You are Joshua Barcoma's portfolio chatbot. Answer naturally and briefly. "
        "Use only the provided portfolio context for facts about Joshua. "
        "If the visitor asks to contact Joshua, hire him, email him, or gives a message "
        "they want sent, create a professional Gmail draft. Return only JSON with these "
        'keys: "text", "wantsEmailDraft", "emailSubject", "emailBody". '
        '"text" is the chat answer shown to the visitor. '
        '"wantsEmailDraft" is true only when a Gmail draft should be offered. '
        '"emailSubject" and "emailBody" must be useful, polished, and addressed to Joshua. '
        "Do not claim that an email was sent; only say a Gmail draft can be opened."
    )

    response = client.responses.create(
        model=model,
        instructions=f"{instructions}\n\nPortfolio context:\n{_portfolio_context()}",
        input=clean_prompt,
    )
    parsed = _parse_model_json(response.output_text)
    text = str(parsed.get("text") or response.output_text).strip()

    href = None
    action_label = None
    if parsed.get("wantsEmailDraft"):
        subject = str(parsed.get("emailSubject") or "Project Inquiry for Joshua Barcoma")
        body = str(
            parsed.get("emailBody")
            or "Hi Joshua,\n\nI saw your portfolio and I would like to ask about your systems.\n\n"
        )
        action_label = "Open Gmail Draft"
        href = _gmail_href(subject, body)

    return {
        "text": text,
        "actionLabel": action_label,
        "href": href,
    }
