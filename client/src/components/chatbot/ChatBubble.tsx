interface Props {
  type: "user" | "ai";
  message: string;
}

const ChatBubble = ({
  type,
  message,
}: Props) => {
  const isUser = type === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3 whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;