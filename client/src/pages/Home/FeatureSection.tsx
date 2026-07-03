import { Brain, FileText, Bot, ClipboardList } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Summaries",
    description:
      "Generate intelligent summaries with key points, definitions and revision notes.",
  },
  {
    icon: ClipboardList,
    title: "Quiz Generator",
    description:
      "Automatically create MCQs, True/False and descriptive quizzes from documents.",
  },
  {
    icon: Bot,
    title: "AI Chatbot",
    description:
      "Chat with your uploaded documents using LangChain, LangGraph and RAG.",
  },
  {
    icon: FileText,
    title: "Document Management",
    description:
      "Upload, organize and search your study materials in one secure workspace.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="bg-slate-900 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
            >
              <Icon className="mb-4 h-10 w-10 text-blue-500" />

              <h3 className="mb-2 text-xl font-semibold text-white">
                {title}
              </h3>

              <p className="text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;