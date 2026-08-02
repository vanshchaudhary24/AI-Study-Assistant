import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";

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
import { searchDocuments } from "../../services/search.service";
import NotesViewer from "../../components/notes/NotesViewer";

import {
  getDocuments,
  deleteDocument,
  downloadDocument,
  previewDocument,
  generateSummary,
  generateQuiz,
  generateFlashcards,
  generateNotes,
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

  // ======================= notes======================
  const [notesOpen, setNotesOpen] =
    useState(false);

  const [notesLoading, setNotesLoading] =
    useState(false);

  const [notes, setNotes] =
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

  // ================ search documents==================
  const [searchResults, setSearchResults] =
    useState<any[]>([]);

  const [semanticSearching, setSemanticSearching] =
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

  // ============== handle notes ======================
  const handleNotes = async (
    id: string
  ) => {

    try {

      setNotes("");
      setNotesOpen(true);
      setNotesLoading(true);

      const response =
        await generateNotes(id);

      setNotes(
        response.notes
      );

    } catch {

      toast.error(
        "Notes generation failed."
      );

    } finally {
      setNotesLoading(false);
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

  // ===================== handle semantic search===================
  const handleSemanticSearch = async () => {

    if (!search.trim()) {

      setSearchResults([]);
      return;
    }
    try {

      setSemanticSearching(true);

      const response =
        await searchDocuments(search);

      setSearchResults(
        response.results
      );
    }

    catch {
      toast.error(
        "Search failed."
      );
    }

    finally {
      setSemanticSearching(false);
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
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSemanticSearch();
            }
          }}
          placeholder="Search documents..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-4 text-white transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {semanticSearching && (

        <p className="mb-6 text-slate-400">
          Searching...
        </p>
      )}

      {searchResults.length > 0 && (

        <div className="mb-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">
            Search Results
          </h2>

          <div className="space-y-4">

            {searchResults.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-5 transition hover:border-blue-500"
              >

                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    AI Match
                  </span>

                  <span className="text-sm text-green-400">
                    {(item.score * 100).toFixed(1)}% Match
                  </span>

                </div>

                <p className="line-clamp-6 whitespace-pre-wrap text-slate-200">
                  {item.document}
                </p>

              </div>
            ))}
          </div>
        </div>
      )}

      {!semanticSearching &&
        search.length > 0 &&
        searchResults.length === 0 && (

          <div className="mb-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">

            <div className="mb-4 text-6xl">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-white">
              No Results Found
            </h2>

            <p className="mt-3 text-slate-400">

              AI couldn't find anything related to

              <span className="ml-2 font-semibold text-white">

                "{search}"

              </span>
            </p>
          </div>

        )}

      {loading ? (
        <Loader text="Loading Documents..." />

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
              className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6 tansition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg" >

                <FileText
                  size={30}
                  className="text-white"
                />
              </div>

              <h3 className="line-clamp-2 min-h-[56px] text-xl font-bold text-white">
                {doc.originalName}
              </h3>

              <p className="mt-3 text-sm font-medium text-slate-300">
                {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>

              <p className="text-sm text-slate-500">
                {new Date(
                  doc.createdAt
                ).toLocaleDateString()}
              </p>



              <div className="mt-8 grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    previewDocument(doc._id)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-700 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-slate-600"
                >
                  <Eye size={18} />
                  Preview
                </button>


                <button
                  onClick={() =>
                    downloadDocument(doc._id)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700"
                >
                  <Download size={18} />
                  Download
                </button>


                <button
                  onClick={() =>
                    handleSummary(doc._id)
                  }
                  className="flex items-center justify-center rounded-xl bg-green-600 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-green-700">
                  Generate Summary
                </button>


                <button
                  onClick={() =>
                    handleNotes(doc._id)
                  }
                  className="flex items-center justify-center rounded-xl bg-indigo-600 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-700"
                >
                  Generate Notes
                </button>


                <button
                  onClick={() =>
                    handleFlashcards(doc._id)
                  }
                  className="flex items-center justify-center rounded-xl bg-purple-600 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-purple-700"
                >
                  Flashcards
                </button>


                <button
                  onClick={() =>
                    handleQuiz(doc._id)
                  }
                  className="flex items-center justify-center rounded-xl bg-pink-600 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-pink-700"
                >
                  Generate Quiz
                </button>


                <button
                  onClick={() =>
                    handleDelete(doc._id)
                  }
                  className="flex items-center justify-center rounded-xl bg-red-600 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-red-700"
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

      <NotesViewer
        open={notesOpen}
        loading={notesLoading}
        notes={notes}
        onClose={() =>
          setNotesOpen(false)
        }
      />

      <FlashcardViewer
        open={flashcardOpen}
        loading={flashcardLoading}
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



