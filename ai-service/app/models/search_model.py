from pydantic import BaseModel


class SearchRequest(BaseModel):
    userId: str
    query: str


class SearchResult(BaseModel):
    document: str
    score: float


class SearchResponse(BaseModel):
    success: bool
    results: list[SearchResult]