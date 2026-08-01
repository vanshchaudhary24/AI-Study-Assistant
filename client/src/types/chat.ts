export interface ChatMessage {
  _id?: string;

  question: string;

  answer: string;

  createdAt?: string;
}

export interface AskQuestionRequest {
  question: string;
}

export interface AskQuestionResponse {
  success: boolean;

  answer: string;
}

export interface ChatHistoryResponse {
  success: boolean;

  data: ChatMessage[];
}