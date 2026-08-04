from app.core.model_loader import model_loader


def generate_embedding(text: str):

    embedding = model_loader.get_embedding_model(
        text,
        normalize_embeddings=True
    )

    return embedding.tolist()

def generate_embeddings(texts: list[str]):
    embeddings = model_loader.get_embedding_model.encode(
        texts,
        normalize_embeddings = True
    )
    return embeddings.tolist()