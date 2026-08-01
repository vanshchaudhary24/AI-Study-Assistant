from app.services.chroma_service import collection
from app.services.groq_service import generate_answer


def generate_summary(
    user_id: str,
    document_id: str,
):

    result = collection.get(
        where={
            "$and": [
            {"userId": user_id},
           { "documentId": document_id}
            ]
        }
    )

    documents = result.get(
        "documents",
        []
    )

    if len(documents) == 0:
        return "No indexed content was found for this document."

    print("=================================")
    print("Documents received from Chroma:")
    print(documents)
    print("=================================")

    context = "\n\n".join(documents[:40])
    
    print("=================================")
    print("Context Length:", len(context))
    print(context[:1000])
    print("=================================")



    prompt = f"""
You are an AI Study Assistant.

Read the following study material and generate a clean,
well structured summary.

Instructions:

- Cover all important concepts.
- Use headings.
- Use bullet points wherever appropriate.
- Keep the explanation concise.
- Do not invent information.
- Use only the provided study material.

Study Material:

{context}

Summary:
"""

    return generate_answer(prompt)