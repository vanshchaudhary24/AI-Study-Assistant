from pydantic import BaseModel


class HistoryItem(BaseModel):
    question: str
    answer: str

class ChatRequest(BaseModel):
    userId: str
    question: str
    history: list[HistoryItem] = []


class ChatResponse(BaseModel):
    success: bool
    answer: str