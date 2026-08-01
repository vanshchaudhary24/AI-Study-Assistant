from pydantic import BaseModel

class DeleteDocumentRequest(BaseModel):
    documentId: str