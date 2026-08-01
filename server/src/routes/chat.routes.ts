import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { 
    askQuestion,
    getChatHistory,
    clearChatHistory,
    deleteChat,     
 } from "../controllers/chat.controller";

const router = Router();

router.post(
  "/ask",
  authenticate,
  askQuestion
);

router.get(
  "/history",
  authenticate,
  getChatHistory
);

router.delete(
  "/history",
  authenticate,
  clearChatHistory
);

router.delete(
  "/:id",
  authenticate,
  deleteChat
);

export default router;