from pydantic import BaseModel

class FlashcardRequest(BaseModel):
    userId: str
    documentId: str



class FlashcardResponse(BaseModel):
    success: bool
    flashcards: list    