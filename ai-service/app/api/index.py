from fastapi import APIRouter

from app.models.index_model import (
    IndexDocumentRequest,
    IndexDocumentResponse
)

from app.services.indexing_service import index_document

router = APIRouter(
    prefix="/index",
    tags=["Index"]
)


@router.post(
    "/document",
    response_model=IndexDocumentResponse
)
async def index(request: IndexDocumentRequest):

    total = index_document(
        document_id=request.documentId,
        user_id=request.userId,
        filename=request.fileName,
        text=request.text
    )

    return IndexDocumentResponse(
        success=True,
        chunksIndexed=total
    )