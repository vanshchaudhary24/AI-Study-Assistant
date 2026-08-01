from pydantic import BaseModel


class IndexDocumentRequest(BaseModel):
    documentId: str
    userId: str
    fileName: str
    text: str


class IndexDocumentResponse(BaseModel):
    success: bool
    chunksIndexed: int