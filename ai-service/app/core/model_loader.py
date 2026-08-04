from sentence_transformers import SentenceTransformer
from app.core.config import settings

class ModelLoader:

    def __init__(self):
        self.embedding_model = None

    def get_embedding_model(self):

        if self.embedding_model is None:

            print("Loading Embedding Model...")

            self.embedding_model = SentenceTransformer(
                settings.EMBEDDING_MODEL
            )

            print("Embedding Model Loaded.")

        return self.embedding_model

model_loader = ModelLoader()