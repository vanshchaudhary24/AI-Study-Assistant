import { Response } from "express";
import { getRecentConversation } from "../services/conversation.service";

import { AuthRequest } from "../middleware/auth.middleware";

import { askAI } from "../services/ai.service";
import {
    saveChatService ,
    getChatHistoryService,
    deleteChatHistoryService,
    deleteSingleChatService,
} from "../services/chat.service" ;

export const askQuestion = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const { question } = req.body;

    if (!question) {

      res.status(400).json({
        success: false,
        message: "Question is required."
      });

      return;
    }

    const history = await getRecentConversation(
      req.userId!,
    );

    const response = await askAI(
      req.userId! ,
      question,
      history
    );

    await saveChatService(
        req.userId! ,
        question,
        response.answer
    );

    res.status(200).json(response);

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message:
        error.response?.data?.detail ||
        error.message

    });
  }
};

export const getChatHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const chats = await getChatHistoryService(
      req.userId!
    );

    res.status(200).json({
      success: true,
      data: chats,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearChatHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    await deleteChatHistoryService(
      req.userId!
    );

    res.status(200).json({
      success: true,
      message: "Chat history cleared."
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const deleteChat = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    await deleteSingleChatService(
      String(req.params.id),
      req.userId!
    );

    res.status(200).json({
      success: true,
      message: "Chat deleted."
    });

  } catch (error: any) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};