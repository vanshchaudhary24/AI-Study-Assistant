import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="flex min-h-[85vh] items-center justify-center bg-slate-950 px-6"
    >
      <div className="max-w-4xl text-center">
        <p className="mb-4 text-blue-400">
         An AI Powered Learning Platform
        </p>

        <h1 className="mb-8 text-7xl font-bold text-white md:text-7xl">
          Study Smarter with AI
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
          Upload study materials, generate summaries, create quizzes, and chat
          with your documents using Retrieval-Augmented Generation powered by
          LangChain and Groq.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Learning
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-700 px-8 py-4 text-white transition hover:bg-slate-800"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;