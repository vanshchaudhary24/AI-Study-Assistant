from app.services.retrieval_service import retrieve_context


def search_documents(
    user_id: str,
    query: str,
):

    results = retrieve_context(
        question=query,
        user_id=user_id,
        limit=10,
    )

    documents = results.get(
        "documents",
        [[]]
    )[0]

    distances = results.get(
        "distances",
        [[]]
    )[0]

    response = []

    for document, distance in zip(
        documents,
        distances
    ):

        response.append(
            {
                "document": document,
                "score": round(
                    1 - distance,
                    3
                ),
            }
        )

    return response