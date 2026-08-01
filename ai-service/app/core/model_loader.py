from sentence_transformers import SentenceTransformer

from app.core.config import settings


class ModelLoader:

    def __init__(self):

        self.embedding_model = None

    def load_models(self):

        print("Loading Embedding Model...")

        self.embedding_model = SentenceTransformer(
            settings.EMBEDDING_MODEL
        )

        print("Embedding Model Loaded Successfully.")


model_loader = ModelLoader()