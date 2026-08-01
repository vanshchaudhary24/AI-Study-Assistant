import api from "./api";

import type {
  AskQuestionResponse,
  ChatHistoryResponse,
} from "../types/chat";

export const askQuestion = async (
  question: string
): Promise<AskQuestionResponse> => {
  const response = await api.post(
    "/chat/ask",
    {
      question,
    }
  );

  return response.data;
};

export const getChatHistory =
  async (): Promise<ChatHistoryResponse> => {
    const response = await api.get(
      "/chat/history"
    );

    return response.data;
  };

export const clearChatHistory =
  async () => {
    const response =
      await api.delete(
        "/chat/history"
      );

    return response.data;
  };

export const deleteChat =
  async (id: string) => {
    const response =
      await api.delete(
        `/chat/${id}`
      );

    return response.data;
  };