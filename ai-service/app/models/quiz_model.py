from pydantic import BaseModel


class QuizRequest(BaseModel):
    userId: str
    documentId: str


class QuizResponse(BaseModel):
    success: bool
    quiz: list