import chromadb
from app.core.config import settings

client = chromadb.PersistentClient(
    path=settings.CHROMA_PATH
)

collection = client.get_or_create_collection(
    name=settings.COLLECTION_NAME
)
def add_document(
    document_id: str,
    text: str,
    embedding: list[float],
    metadata: dict
):

    collection.add(
        ids=[document_id],
        documents=[text],
        embeddings=[embedding],
        metadatas=[metadata]
    )


def add_documents(
    ids,
    documents,
    embeddings,
    metadatas
):

    print("========== ADDING TO CHROMA ==========")
    print("IDs:", ids)
    print("Metadata:", metadatas)

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )

    print("Current Count:", collection.count())


def search_documents(
    embedding: list[float],
    user_id: str,
    limit: int = 5
):

    return collection.query(
        query_embeddings=[embedding],
        n_results=limit,
        where={
            "userId": user_id
        }
    )

def delete_document_embeddings(
        document_id: str
):
    return collection.delete(
        where={
            "documentId": document_id
        }
    )