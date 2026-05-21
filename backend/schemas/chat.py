from __future__ import annotations

from pydantic import BaseModel


class ChatRequest(BaseModel):
    prompt: str


class ChatResponse(BaseModel):
    text: str
    actionLabel: str | None = None
    href: str | None = None
    source: str = "python-backend"
