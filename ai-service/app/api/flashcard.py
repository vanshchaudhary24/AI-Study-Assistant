from fastapi import APIRouter

from app.models.flashcard_model import (
    FlashcardRequest,
    FlashcardResponse,
)

from app.services.flashcard_service import (
    generate_flashcards,
)

router = APIRouter(
    prefix="/flashcards",
    tags=["Flashcards"],
)


@router.post(
    "/generate",
    response_model=FlashcardResponse,
)
async def flashcards(request: FlashcardRequest):

    cards = generate_flashcards(
        user_id=request.userId,
        document_id=request.documentId,
    )

    return FlashcardResponse(
        success=True,
        flashcards=cards,
    )