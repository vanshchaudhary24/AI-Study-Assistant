import { useState, useEffect } from "react";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Loader from "../common/Loader";

interface Flashcard {
  front: string;
  back: string;
}

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
}

const FlashcardViewer = ({
  open,
  loading,
  onClose,
  flashcards,
}: Props) => {

  const [index, setIndex] = useState(0);

  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (open) {
      setIndex(0);
      setFlipped(false);
    }
  }, [open]);

  if (!open) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="mb-4 text-xl font-bold text-white">
            Flashcards
          </h2>

          <Loader text="Generatin Flashcards..." />

        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {

    return (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

        <div className="rounded-2xl bg-slate-900 p-8 text-center">

          <h2 className="mb-4 text-xl font-bold text-white">
            Flashcards
          </h2>

          <div className="py-6 text-center">

            <div className="text-6xl">
              🃏
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              No Flashcards Available
            </h2>

            <p className="mt-3 text-slate-400">
              Generate flashcards to revise this document quickly.
            </p>

          </div>

          <button
            onClick={onClose}
            className="mt-6 rounded bg-red-600 px-4 py-2 text-white"
          >
            Close
          </button>

        </div>

      </div>

    );
  }

  const card = flashcards[index] ?? {
    front: "",
    back: "",
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">

            Flashcards

          </h2>

          <button
            onClick={onClose}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >

            Close

          </button>

        </div>

        <div
          onClick={() => setFlipped(!flipped)}
          className="flex h-80 cursor-pointer items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center"
        >

          <p className="text-xl text-white">

            {flipped ? card.back : card.front}

          </p>

        </div>

        <div className="mt-8 flex items-center justify-between">

          <button
            disabled={index === 0}
            onClick={() => {

              setIndex(index - 1);

              setFlipped(false);

            }}
            className="rounded bg-slate-700 p-3 text-white disabled:opacity-40"
          >

            <ChevronLeft />

          </button>

          <button
            onClick={() => setFlipped(false)}
            className="rounded bg-blue-600 p-3 text-white"
          >

            <RotateCcw />

          </button>

          <button
            disabled={index === flashcards.length - 1}
            onClick={() => {

              setIndex(index + 1);

              setFlipped(false);

            }}
            className="rounded bg-slate-700 p-3 text-white disabled:opacity-40"
          >

            <ChevronRight />

          </button>

        </div>

        <p className="mt-5 text-center text-slate-400">

          {index + 1} / {flashcards.length}

        </p>

      </div>

    </div>
  );
};


export default FlashcardViewer;