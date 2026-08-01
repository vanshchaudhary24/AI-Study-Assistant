from fastapi import APIRouter

from app.models.chat_model import (
    ChatRequest,
    ChatResponse
)

from app.services.rag_service import ask_question

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/ask",
    response_model=ChatResponse
)
async def ask(request: ChatRequest):

    answer = ask_question(
        question=request.question,
        user_id=request.userId,
        history = request.history
    )

    return ChatResponse(
        success=True,
        answer=answer
    )