from fastapi import APIRouter

from app.models.embedding_model import (
    EmbeddingRequest,
    EmbeddingResponse
)

from app.services.embedding_service import (
    generate_embedding
)
router = APIRouter(
    prefix="/embedding",
    tags=["Embedding"]
)


@router.post(
    "/generate",
    response_model=EmbeddingResponse
)
async def generate(
    request: EmbeddingRequest
):

    embedding = generate_embedding(
        request.text
    )

    return EmbeddingResponse(
        embedding = embedding
    )