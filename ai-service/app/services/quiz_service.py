import json

from app.services.chroma_service import collection
from app.services.groq_service import generate_answer


def generate_quiz(
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
        return []

    context = "\n\n".join(documents)

    prompt = f"""
You are an AI Study Assistant.

Generate exactly 10 multiple choice questions.

Return ONLY valid JSON.

Format:

[
{{
"question":"....",
"options":[
"A",
"B",
"C",
"D"
],
"answer":"Correct Option"
}}
]

Study Material:

{context}
"""

    response = generate_answer(prompt)

    try:
        return json.loads(response)

    except Exception:
        return []
    