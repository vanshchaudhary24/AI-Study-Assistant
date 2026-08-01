from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embeddings
from app.services.chroma_service import add_documents


def index_document(
    document_id: str,
    user_id: str,
    filename: str,
    text: str
):
    chunks = chunk_text(text)

    embeddings = generate_embeddings(chunks)

    ids = []
    metadatas = []

    for index, chunk in enumerate(chunks):

        ids.append(f"{document_id}_{index}")

        metadatas.append({
            "userId": user_id,
            "documentId": document_id,
            "chunkIndex": index,
            "fileName": filename
        })

    print("========== INDEXING ==========")
    print("Document ID:", document_id)
    print("Chunks:", len(chunks))
    print("First Metadata:", metadatas[0])

    add_documents(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )

    print("Document added to ChromaDB")

    return len(chunks)