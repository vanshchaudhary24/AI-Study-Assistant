from app.services.chroma_service import collection
from app.services.groq_service import generate_answer


def generate_notes(
    user_id: str,
    document_id: str,
):

    result = collection.get(
        where={
            "userId": user_id,
            "documentId": document_id,
        }
    )

    documents = result.get(
        "documents",
        []
    )

    if len(documents) == 0:
        return ""

    context = "\n\n".join(documents)

    prompt = f"""
You are an AI Study Assistant.

Create clean study notes from the document.

Requirements:

- Use headings
- Use bullet points
- Keep important definitions
- Keep important formulas
- Keep important facts
- Keep examples if available
- Make revision friendly

Study Material:

{context}
"""

    return generate_answer(prompt)