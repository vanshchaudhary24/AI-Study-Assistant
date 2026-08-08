import {
  FileText,
  MessageSquare,
  Sparkles,
  Brain,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Generate Summary",
      icon: <Sparkles size={26} />,
      action: () => navigate("/documents"),
    },
    {
      title: "Generate Quiz",
      icon: <Brain size={26} />,
      action: () => navigate("/quiz"),
    },
    {
      title: "Chat with AI",
      icon: <MessageSquare size={26} />,
      action: () => navigate("/chat"),
    },
    {
      title: "View Documents",
      icon: <FileText size={26} />,
      action: () => navigate("/documents"),
    },
  ];

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.action}
            className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-blue-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <div className="mb-4 text-blue-500">
              {action.icon}
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {action.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;