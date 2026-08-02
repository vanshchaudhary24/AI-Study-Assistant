from fastapi import APIRouter

from app.models.search_model import (
    SearchRequest,
    SearchResponse,
    SearchResult,
)

from app.services.search_service import (
    search_documents,
)

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.post(
    "",
    response_model=SearchResponse,
)
async def search(
    request: SearchRequest,
):

    results = search_documents(
        user_id=request.userId,
        query=request.query,
    )

    return SearchResponse(
        success=True,
        results=[
            SearchResult(**item)
            for item in results
        ],
    )