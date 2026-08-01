from fastapi import APIRouter

from app.services.chunk_service import chunk_text

router = APIRouter(
    prefix="/chunk",
    tags=["Chunk"]
)


@router.post("/test")
async def test():

    text = (
        "Artificial Intelligence is transforming education. "
        * 100
    )

    chunks = chunk_text(text)

    return {
        "total_chunks": len(chunks),
        "chunks": chunks
    }