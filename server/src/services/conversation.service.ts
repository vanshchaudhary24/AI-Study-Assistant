import Chat from "../models/Chat";

export const getRecentConversation = async (
  userId: string,
  limit: number = 5
) => {

  const chats = await Chat.find({
    user: userId,
  })
    .sort({
       createdAt: -1 
      })
    .limit(limit).lean();

  return chats.reverse().map((chat) => ({
    question: chat.question,
    answer: chat.answer,
  }));

};