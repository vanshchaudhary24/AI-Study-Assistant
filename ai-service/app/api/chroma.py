from fastapi import APIRouter

from app.services.embedding_service import (
    generate_embedding
)

from app.services.chroma_service import (
    collection,
    add_document,
    search_documents,
    delete_document_embeddings
)

router = APIRouter(
    prefix="/chroma",
    tags=["Chroma"]
)


@router.get("/count")
def count():

    return {
        "count": collection.count()
    }


@router.get("/all")
def all_chunks():

    data = collection.get()

    return {
        "count": len(data["ids"]),
        "ids": data["ids"],
        "documents": data["documents"],
        "metadatas": data["metadatas"]
    }


@router.post("/test")
def test():

    embedding = generate_embedding(
        "Artificial Intelligence"
    )

    add_document(
        document_id="test",
        text="Artificial Intelligence",
        embedding=embedding,
        metadata={
            "userId": "test-user",
            "documentId": "test-doc",
            "fileName": "test.pdf",
            "chunkIndex": 0
        }
    )

    return {
        "success": True
    }


@router.get("/search")
def search():

    embedding = generate_embedding("AI")

    results = search_documents(
        embedding=embedding,
        user_id="test-user"
    )

    return results


@router.delete("/test-delete")
def test_delete():

    before = collection.count()

    delete_document_embeddings(
        "test-doc"
    )

    after = collection.count()

    return {
        "before": before,
        "after": after
    }