def build_prompt(
    question: str,
    context,
    history: list = []
):

    documents = context.get(
        "documents",
        [[]]
    )[0]

    retrieved_context = "\n\n".join(documents)

    conversation = ""

    if history:

        conversation = "Previous Conversation:\n\n"

        for chat in history:

            conversation += (
                f"User: {chat.question}\n"
                f"Assistant: {chat.answer}\n\n"
            )

    prompt = f"""
You are an AI Study Assistant.

Your job is to answer the user's question using:

1. Previous conversation
2. Retrieved study context

If the current question refers to previous questions
(for example: "explain more", "give examples",
"what about the second one", "why?", "continue"),
use the previous conversation to understand what
the user is referring to.

Use Previous Conversation ONLY to understand references like:

- explain more
- continue
- what about the second one
- why?

Never use previous conversation as factual knowledge.

All factual answers MUST come from Study Context.

If Study Context is empty or does not contain the answer, reply:

Information not found in the provided document.

Never invent information.

If the answer is not present in the retrieved context,
reply exactly:

Information not found in the provided document.
or just say Insufficient data but not provide any info from yourself
which is incorrect or doubtful.

-----------------------------
Previous Conversation

{conversation}

-----------------------------
Study Context

{retrieved_context}

-----------------------------
Current Question

{question}

-----------------------------
Answer:
"""

    return prompt