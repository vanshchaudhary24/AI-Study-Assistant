import { useEffect, useRef } from "react";

import ChatBubble from "./ChatBubble";

import type { ChatMessage } from "../../types/chat";

interface Props {
  chat?: ChatMessage;
}

const ChatWindow = ({
  chat,
}: Props) => {

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [chat]);

  if (!chat) {

    return (
      <div className="flex flex-1 items-center justify-center text-slate-500">
        Start a new conversation.
      </div>
    );

  }

  return (

    <div className="flex flex-1 flex-col overflow-y-auto p-8">

      <div className="space-y-6">

        <ChatBubble
          type="user"
          message={chat.question}
        />

        <ChatBubble
          type="ai"
          message={chat.answer}
        />

      </div>

      <div ref={bottomRef} />

    </div>

  );

};

export default ChatWindow;