from fastapi import APIRouter

from app.models.requests import DeleteDocumentRequest

from app.services.chroma_service import delete_document_embeddings

router = APIRouter(
    prefix="/index",
    tags= ["Index"]
)


@router.delete("/document")
async def delete_document(request: DeleteDocumentRequest):

    delete_document_embeddings(
        request.documentId
    )

    return {
        "success": True,
        "message": "Document embeddings deleted successfully."
    }