from __future__ import annotations

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas.chat import ChatRequest, ChatResponse
from backend.services.portfolio_agent import AssistantConfigurationError, create_reply

app = FastAPI(title="Joshua Profile Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/agent/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> dict[str, str | None]:
    try:
        reply = create_reply(request.prompt)
    except AssistantConfigurationError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail="The AI provider did not return a successful response. Check your API key, model, and account billing.",
        ) from exc

    return {
        "text": reply["text"],
        "actionLabel": reply["actionLabel"],
        "href": reply["href"],
        "source": "openai",
    }
