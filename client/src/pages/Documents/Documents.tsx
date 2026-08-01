import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Download,
  Trash2,
  FileText,
  Eye,
  Search,
} from "lucide-react";

import SummaryViewer from "../../components/summary/SummaryViewer";
import QuizViewer from "../../components/quiz/QuizViewer";
import FlashcardViewer from "../../components/flashcards/FlashcardViewer";

import {
  getDocuments,
  deleteDocument,
  downloadDocument,
  previewDocument,
  generateSummary,
  generateQuiz,
  generateFlashcards,
} from "../../services/document.service";

import type { Document } from "../../types/document";

const Documents = () => {
  const [documents, setDocuments] =
    useState<Document[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");
  //======================summary================
  const [summaryOpen, setSummaryOpen] =
    useState(false);

  const [summaryLoading, setSummaryLoading] =
    useState(false);

  const [summary, setSummary] =
    useState("");

  //=====================quiz ==================
  const [quizOpen, setQuizOpen] =
    useState(false);

  const [quizLoading, setQuizLoading] =
    useState(false);

  const [quiz, setQuiz] =
    useState<any[]>([]);

  // ==========================flash cards ==============
  const [flashcardOpen, setFlashcardOpen] =
    useState(false);

  const [flashcards, setFlashcards] =
    useState<any[]>([]);

  const [flashcardLoading, setFlashcardLoading] =
    useState(false);


  // ===================== load documents
  const loadDocuments = async () => {
    try {
      const response =
        await getDocuments();

      setDocuments(response.data);
    } catch {
      toast.error(
        "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // =============================== handle delete=============
  const handleDelete = async (
    id: string
  ) => {
    if (
      !window.confirm(
        "Delete this document?"
      )
    )
      return;

    try {
      await deleteDocument(id);

      toast.success(
        "Document deleted."
      );

      loadDocuments();
    } catch {
      toast.error(
        "Delete failed."
      );
    }
  };

  // ============== handle summary =====================
  const handleSummary = async (

    id: string

  ) => {

    try {

      setSummary("");

      setSummaryOpen(true);

      setSummaryLoading(true);

      const response =
        await generateSummary(id);

      setSummary(
        response.summary
      );

    }

    catch {

      toast.error(
        "Summary generation failed."
      );

    }

    finally {

      setSummaryLoading(false);

    }

  };

  // ==================== handle flashcard ====================
  const handleFlashcards = async (
    id: string
  ) => {

    try {

      setFlashcardLoading(true);

      setFlashcardOpen(true);

      const response =
        await generateFlashcards(id);

      setFlashcards(
        response.flashcards
      );

    } catch {

      toast.error(
        "Failed to generate flashcards."
      );

    } finally {

      setFlashcardLoading(false);

    }

  };

  // ============================== hadlequiz ===============
  const handleQuiz = async (

    id: string

  ) => {

    try {

      setQuiz([]);

      setQuizOpen(true);

      setQuizLoading(true);

      const response =
        await generateQuiz(id);

      setQuiz(response.quiz);

    }

    catch {

      toast.error(
        "Quiz generation failed."
      );
    }

    finally {
      setQuizLoading(false);
    }
  };

  // =========================== filtered =======================
  const filtered =
    documents.filter((doc) =>
      doc.originalName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-white">
        My Documents
      </h1>

      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-4 top-4 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search documents..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white"
        />
      </div>

      {loading ? (
        <p className="text-slate-400">
          Loading...
        </p>

      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 py-20 text-center">

          <FileText
            size={55}
            className="mx-auto mb-5 text-slate-600"
          />

          <h2 className="text-xl text-white">
            No Documents Uploaded
          </h2>

          <p className="mt-2 text-slate-400">
            Upload your first study notes.
          </p>
        </div>

      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doc) => (
            <div
              key={doc._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <FileText
                size={36}
                className="mb-4 text-blue-500"
              />

              <h3 className="truncate text-lg font-semibold text-white">
                {doc.originalName}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {new Date(
                  doc.createdAt
                ).toLocaleDateString()}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">


                <button
                  onClick={() =>
                    previewDocument(doc._id)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-700 py-2 text-white transition hover:bg-slate-600"
                >
                  <Eye size={18} />
                  Preview
                </button>

                <button
                  onClick={() =>
                    downloadDocument(doc._id)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                >
                  <Download size={18} />
                  Download
                </button>

                <button
                  onClick={() =>
                    handleSummary(doc._id)
                  }
                  className="rounded-xl bg-green-600 py-2 test-white hover:bg-green-700">
                  Generate Summary
                </button>

                <button
                  onClick={() =>
                    handleFlashcards(doc._id)
                  }
                  className="flex flex-1 items-center justify-center rounded-xl bg-purple-600 py-2 text-white hover:bg-purple-700"
                >

                  Flashcards

                </button>

                <button
                  onClick={() =>
                    handleQuiz(doc._id)
                  }
                  className="flex flex-1 items-center justify-center rounded-xl bg-purple-600 py-2 text-white hover:bg-purple-700"
                >
                  Generate Quiz

                </button>

                <button
                  onClick={() =>
                    handleDelete(doc._id)
                  }
                  className="flex items-center justify-center rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      <SummaryViewer
        open={summaryOpen}
        summary={summary}
        loading={summaryLoading}
        onClose={() =>
          setSummaryOpen(false)
        }
      />

      <FlashcardViewer
      open={flashcardOpen}
      onClose={() =>
        setFlashcardOpen(false)
      }
      flashcards={flashcards}
      />

      <QuizViewer
        open={quizOpen}
        loading={quizLoading}
        quiz={quiz}
        onClose={() => setQuizOpen(false)}
      />

    </div>
  );
};

export default Documents;



