import { useEffect, useState } from "react";

import ChatSidebar from "../../components/chatbot/ChatSidebar";
import ChatWindow from "../../components/chatbot/ChatWindow";

import ChatInput from "../../components/chatbot/ChatInput";
import { askQuestion } from "../../services/chat.service";


import {
  clearChatHistory,
  getChatHistory,
} from "../../services/chat.service";

import type { ChatMessage } from "../../types/chat";

import toast from "react-hot-toast";

const Chat = () => {

  const [history, setHistory] =
    useState<ChatMessage[]>([]);

  const [selected, setSelected] =
    useState(0);

  const [loading , setLoading] = 
  useState(false);

  useEffect(() => {
    loadHistory();
  }, []);


  const loadHistory = async () => {

    try {

      const response =
        await getChatHistory();

      setHistory(response.data);

    } catch {

      toast.error(
        "Failed to load chat history."
      );

    }
  };


  const handleClear = async () => {

    try {

      await clearChatHistory();

      setHistory([]);

      toast.success(
        "History cleared."
      );

    } catch {

      toast.error(
        "Unable to clear history."
      );

    }
  };

  const handleAsk = async (
  question: string
) => {

  try {

    setLoading(true);

    await askQuestion(question);

    await loadHistory();

    setSelected(0);

    toast.success("Response received.");

  } catch {

    toast.error("AI request failed.");

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="flex h-[calc(100vh-100px)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <ChatSidebar
        chats={history}
        selected={selected}
        onSelect={setSelected}
        onClear={handleClear}
      />

      <div className="flex flex-1 flex-col">

  <ChatWindow
    chat={history[selected]}
  />

  <ChatInput
    onSend={handleAsk}
    loading={loading}
  />

</div>

    </div>

  );

};

export default Chat;