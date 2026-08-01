from fastapi import APIRouter

from app.models.summary_model import (
    SummaryRequest,
    SummaryResponse,
)

from app.services.summary_service import (
    generate_summary,
)

router = APIRouter(
    prefix="/summary",
    tags=["Summary"],
)


@router.post(
    "/generate",
    response_model=SummaryResponse,
)
async def summary(
    request: SummaryRequest,
):

    summary = generate_summary(
        user_id=request.userId,
        document_id=request.documentId,
    )

    return SummaryResponse(
        success=True,
        summary=summary,
    )