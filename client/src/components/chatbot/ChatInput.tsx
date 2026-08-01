import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (question: string) => Promise<void>;
  loading: boolean;
}

const ChatInput = ({
  onSend,
  loading,
}: Props) => {
  const [question, setQuestion] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!question.trim()) return;

    await onSend(question);

    setQuestion("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-800 bg-slate-950 p-5"
    >
      <div className="flex gap-4">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask anything about your uploaded notes..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={20} />
        </button>

      </div>
    </form>
  );
};

export default ChatInput;