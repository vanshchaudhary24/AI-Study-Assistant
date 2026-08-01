from fastapi import APIRouter

from app.models.quiz_model import (
    QuizRequest,
    QuizResponse,
)

from app.services.quiz_service import (
    generate_quiz,
)

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"],
)


@router.post(
    "/generate",
    response_model=QuizResponse,
)
async def quiz(request: QuizRequest):

    quiz = generate_quiz(
        user_id=request.userId,
        document_id=request.documentId,
    )

    return QuizResponse(
        success=True,
        quiz=quiz,
    )