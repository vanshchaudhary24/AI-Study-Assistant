import Chat from "../models/Chat";

export const saveChatService = async (
  userId: string,
  question: string,
  answer: string
) => {

  return await Chat.create({
    user: userId,
    question,
    answer,
  });

};

export const getChatHistoryService = async (
  userId: string
) => {

  return await Chat.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

};

export const deleteChatHistoryService = async (
  userId: string
) => {

  await Chat.deleteMany({
    user: userId,
  });

};

export const deleteSingleChatService = async (
  chatId: string,
  userId: string
) => {

  const chat = await Chat.findOne({
    _id: chatId,
    user: userId,
  });

  if (!chat) {
    throw new Error("Chat not found.");
  }

  await Chat.findByIdAndDelete(chatId);

};