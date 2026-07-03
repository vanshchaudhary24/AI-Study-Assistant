import { GraduationCap, BrainCircuit, BookOpen } from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Why AI Study Assistant?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
            AI Study Assistant transforms your study materials into an
            interactive learning experience. Upload documents, generate
            intelligent summaries, create quizzes, and chat with your notes
            using Retrieval-Augmented Generation.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <BrainCircuit
              className="mb-5 text-blue-500"
              size={42}
            />
            <h3 className="mb-3 text-2xl font-semibold text-white">
              AI Powered
            </h3>
            <p className="text-slate-400">
              Uses LangChain, LangGraph and Groq to understand your study
              material and answer questions intelligently.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <BookOpen
              className="mb-5 text-blue-500"
              size={42}
            />
            <h3 className="mb-3 text-2xl font-semibold text-white">
              Smart Learning
            </h3>
            <p className="text-slate-400">
              Automatically generates summaries, flashcards and quizzes from
              uploaded PDFs and documents.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <GraduationCap
              className="mb-5 text-blue-500"
              size={42}
            />
            <h3 className="mb-3 text-2xl font-semibold text-white">
              Better Results
            </h3>
            <p className="text-slate-400">
              Spend less time making notes and more time understanding your
              subjects with AI assistance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;