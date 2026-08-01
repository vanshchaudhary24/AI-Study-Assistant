from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent

load_dotenv(BASE_DIR / ".env")


class Settings:

    APP_NAME = "AI Study Assistant"

    APP_VERSION = "1.0.0"

    ########################################
    # Embedding Model
    ########################################

    EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"

    ########################################
    # Chunking
    ########################################

    CHUNK_SIZE = 500

    CHUNK_OVERLAP = 100

    ########################################
    # ChromaDB
    ########################################

    CHROMA_PATH = str(BASE_DIR / "chroma_db")

    COLLECTION_NAME = "documents"

    ########################################
    # Groq
    ########################################

    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

    GROQ_MODEL = "llama-3.3-70b-versatile"


settings = Settings()