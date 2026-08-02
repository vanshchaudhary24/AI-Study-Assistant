from pydantic import BaseModel


class NotesRequest(BaseModel):
    userId: str
    documentId: str


class NotesResponse(BaseModel):
    success: bool
    notes: str