import Document from "../models/Document";
import Chat from "../models/Chat";
import User from "../models/User";

export const getDashboardDataService = async (
  userId: string
) => {

  const [
    documents,
    chats,
    recentDocuments,
    user,
  ] = await Promise.all([

    Document.countDocuments({
      uploadedBy: userId,
    }),

    Chat.countDocuments({
      user: userId,
    }),

    Document.find({
      uploadedBy: userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5),

    User.findById(userId).select(
      "fullName avatar"
    ),

  ]);

  return {

    documents,

    chats,

    summaries: 0,

    quizzes: 0,

    recentDocuments,

    user,

  };

};