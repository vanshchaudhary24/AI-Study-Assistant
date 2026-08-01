from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import settings


splitter = RecursiveCharacterTextSplitter(
    chunk_size=settings.CHUNK_SIZE,
    chunk_overlap=settings.CHUNK_OVERLAP,
    separators=[
        "\n\n",
        "\n",
        ". ",
        "? ",
        "! ",
        " ",
        ""
    ]
)


def chunk_text(text: str):

    if not text.strip():
        return []

    return splitter.split_text(text)