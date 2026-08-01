from app.services.embedding_service import generate_embedding
from app.services.chroma_service import search_documents


def retrieve_context(
    question: str,
    user_id: str,
    limit: int = 5
):

    embedding = generate_embedding(question)

    results = search_documents(
        embedding=embedding,
        user_id=user_id,
        limit=limit
    )

    return results