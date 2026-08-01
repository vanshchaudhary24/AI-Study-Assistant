import { Trash2, MessageSquare } from "lucide-react";
import type { ChatMessage } from "../../types/chat";

interface Props {
  chats: ChatMessage[];
  selected: number;
  onSelect: (index: number) => void;
  onClear: () => void;
}

const ChatSidebar = ({
  chats,
  selected,
  onSelect,
  onClear,
}: Props) => {
  return (
    <aside className="flex w-80 flex-col border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-5">

        <h2 className="text-xl font-semibold text-white">
          Chat History
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto">

        {chats.length === 0 ? (

          <div className="p-6 text-center text-slate-500">
            No conversations
          </div>

        ) : (

          chats.map((chat, index) => (

            <button
              key={chat._id ?? index}
              onClick={() => onSelect(index)}
              className={`w-full border-b border-slate-800 p-4 text-left transition ${
                selected === index
                  ? "bg-slate-800"
                  : "hover:bg-slate-900"
              }`}
            >

              <div className="flex items-start gap-3">

                <MessageSquare
                  size={18}
                  className="mt-1 text-blue-400"
                />

                <div className="flex-1">

                  <p className="line-clamp-2 text-sm text-white">
                    {chat.question}
                  </p>

                </div>

              </div>

            </button>

          ))

        )}

      </div>

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={onClear}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"
        >

          <Trash2 size={18} />

          Clear History

        </button>

      </div>

    </aside>
  );
};

export default ChatSidebar;