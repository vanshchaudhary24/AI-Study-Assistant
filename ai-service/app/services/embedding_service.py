from app.core.model_loader import model_loader


def generate_embedding(text: str):

    embedding = model_loader.embedding_model.encode(
        text,
        normalize_embeddings=True
    )

    return embedding.tolist()

def generate_embeddings(texts: list[str]):
    embeddings = model_loader.embedding_model.encode(
        texts,
        normalize_embeddings = True
    )
    return embeddings.tolist()