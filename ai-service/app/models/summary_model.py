from pydantic import BaseModel


class SummaryRequest(BaseModel):
    userId: str
    documentId: str


class SummaryResponse(BaseModel):
    success: bool
    summary: str