from fastapi import APIRouter

from app.models.notes_model import (
    NotesRequest,
    NotesResponse,
)

from app.services.notes_service import (
    generate_notes,
)

router = APIRouter(
    prefix="/notes",
    tags=["Notes"],
)


@router.post(
    "/generate",
    response_model=NotesResponse,
)
async def notes(request: NotesRequest):

    notes = generate_notes(
        user_id=request.userId,
        document_id=request.documentId,
    )

    return NotesResponse(
        success=True,
        notes=notes,
    )