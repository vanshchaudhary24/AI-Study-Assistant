import Document from "../models/Document";
import Chat from "../models/Chat";

export const getAnalyticsService = async (
    userId: string
) => {

    const documents = await Document.find({
        uploadedBy: userId,
    });

    const chats = await Chat.find({
        user: userId,
    });

    const totalDocuments = documents.length;

    const totalStorage = documents.reduce(
        (sum, doc) => sum + doc.fileSize,
        0
    );

    const totalChats = chats.length;

    const totalSummaries = documents.filter(
        (doc) => doc.summary && doc.summary.length > 0
    ).length;

    const totalQuizzes = documents.filter(
        (doc) =>
            doc.quiz &&
            doc.quiz.length > 0
    ).length;

    const totalFlashcards = documents.filter(
        (doc) =>
            doc.flashcards &&
            doc.flashcards.length > 0
    ).length;

    const uploadsThisWeek = documents.filter((doc) => {

        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(
            sevenDaysAgo.getDate() - 7
        );

        return doc.createdAt >= sevenDaysAgo;

    }).length;

    const recentDocuments = documents
        .sort(
            (a, b) =>
                b.createdAt.getTime() -
                a.createdAt.getTime()
        )
        .slice(0, 5);

    const uploads = await Document.find({
        uploadedBy: userId,
    }).select("createdAt");

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    const uploadsByDay = weekDays.map((day) => ({
        day,
        uploads: 0,
    }));

    uploads.forEach((doc) => {

        const index =
            new Date(doc.createdAt).getDay();

        uploadsByDay[index].uploads++;

    });

    return {

        totalDocuments,
        totalStorage,
        totalChats,

        totalSummaries,
        totalQuizzes,
        totalFlashcards,

        uploadsThisWeek,
        recentDocuments,

        uploadChart: uploadsByDay,
        featureUsage: [
            {
                name: "Summary",
                value: totalSummaries,
            },
            {
                name: "Quiz",
                value: totalQuizzes,
            },
            {
                name: "Flashcards",
                value: totalFlashcards,
            },
            {
                name: "Chats",
                value: totalChats,
            },
        ],

    };

};