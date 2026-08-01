import axios from "axios";

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";


export const indexDocument = async (
  documentId: string,
  userId: string,
  fileName: string,
  text: string
) => {

  try {

    const response = await axios.post(
      `${AI_SERVICE_URL}/index/document`,
      {
        documentId,
        userId,
        fileName,
        text,
      },
      {
        timeout: 60000,
      }
    );

    return response.data;

  } catch (error: any) {

    console.error("AI Indexing Failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }

};


export const askAI = async (
  userId: string,
  question: string,
  history: {
    question: string;
    answer: string;
  }[]
) => {

  try {

    const response = await axios.post(
      `${AI_SERVICE_URL}/chat/ask`,
      {
        userId,
        question,
        history,
      },
      {
        timeout: 60000,
      }
    );

    return response.data;

  } catch (error: any) {

    console.error("AI Chat Failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }

};

export const deleteIndexedDocument = async (
    documentId: string
) => {

    try {

        await axios.delete(
            `${AI_SERVICE_URL}/index/document`,
            {
                data: {
                    documentId,
                },
                timeout: 180000,
            }
        );

    } catch (error: any) {

        console.error(
          "Delete Index Failed"
        );

        if(error.response){
          console.error(error.response.data);
        } else{
          console.error(error.message);
        }

        throw error;

    }

};
// ==================================summary================
export const generateSummary = async (
  userId: string,
  documentId: string
) => {

  try {

    const response = await axios.post(
      `${AI_SERVICE_URL}/summary/generate`,
      {
        userId,
        documentId,
      },
      {
        timeout: 180000,
      }
    );

    return response.data.summary;

  } catch (error: any) {

    console.error("Summary Failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;

  }

};
// ========================= quiz =========================
export const generateQuiz = async (
  userId: string,
  documentId: string
) => {

  try {

    const response = await axios.post(
      `${AI_SERVICE_URL}/quiz/generate`,
      {
        userId,
        documentId,
      },
      {
        timeout: 180000,
      }
    );

    return response.data.quiz;

  } catch (error: any) {

    console.error("Quiz Generation Failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;

  }

};

// ========================generate flashcard====================
export const generateFlashcards = async (
  userId: string,
  documentId: string
) => {

  try {

    const response = await axios.post(
      `${AI_SERVICE_URL}/flashcards/generate`,
      {
        userId,
        documentId,
      },
      {
        timeout: 180000,
      }
    );

    return response.data.flashcards;

  } catch (error: any) {

    console.error("Flashcard Generation Failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
};
