from app.services.retrieval_service import retrieve_context

from app.services.prompt_service import build_prompt

from app.services.groq_service import generate_answer


def ask_question(
    question: str,
    user_id: str,
    history: list = []
):

    retrieved = retrieve_context(
        question,
        user_id
    )

    prompt = build_prompt(
        question = question,
        context = retrieved,
        history = history
    )

    answer = generate_answer(
        prompt
    )

    return answer