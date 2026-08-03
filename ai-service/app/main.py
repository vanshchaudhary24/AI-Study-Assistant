from fastapi import FastAPI

from app.api.chroma import router as chroma_router
from app.api.chunk import router as chunk_router
from app.api.embedding import router as embedding_router
from app.api.index import router as index_router
from app.api.chat import router as chat_router
from app.api.delete_document import router as delete_router
from app.api.summary import router as summary_router
from app.api.quiz import router as quiz_router
from app.api.flashcard import router as flashcard_router
from app.api.search import router as search_router
from app.api.notes import router as notes_router
from app.api.ocr import router as ocr_router


from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.model_loader import model_loader



@asynccontextmanager
async def lifespan(app: FastAPI):

    model_loader.load_models()
    yield

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan= lifespan
)

# ========================routers===================================
# ==============================================================

app.include_router(embedding_router)
app.include_router(chroma_router)
app.include_router(chunk_router)
app.include_router(index_router)
app.include_router(chat_router)
app.include_router(delete_router)
app.include_router(summary_router)
app.include_router(quiz_router)
app.include_router(flashcard_router)
app.include_router(search_router)
app.include_router(notes_router)
app.include_router(ocr_router)




@app.get("/")
async def home():

    return {
        "success": True,
        "message": "AI Service Running"
    }

@app.get("/health")
async def health():

    return {
        "status": "healthy"
    }
