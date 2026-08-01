import {
  X,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  summary: string;
  loading: boolean;
  onClose: () => void;
}

const SummaryModal = ({
  open,
  summary,
  loading,
  onClose,
}: Props) => {

  const [copied, setCopied] =
    useState(false);

  if (!open) return null;

  const copySummary = async () => {

    await navigator.clipboard.writeText(
      summary
    );

    setCopied(true);

    toast.success("Copied");

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="flex h-[80vh] w-[900px] flex-col rounded-2xl bg-slate-900">

        <div className="flex items-center justify-between border-b border-slate-700 p-6">

          <h2 className="text-2xl font-bold text-white">

            AI Summary

          </h2>

          <div className="flex gap-3">

            <button

              onClick={copySummary}

              className="rounded-lg bg-blue-600 p-2 text-white"

            >

              {copied ?

                <Check size={18}/> :

                <Copy size={18}/>

              }

            </button>

            <button

              onClick={onClose}

              className="rounded-lg bg-red-600 p-2 text-white"

            >

              <X size={18}/>

            </button>

          </div>

        </div>

        <div className="flex-1 overflow-y-auto p-8">

          {loading ? (

            <div className="flex h-full items-center justify-center">

              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"/>

            </div>

          ) : (

            <div className="whitespace-pre-wrap leading-8 text-slate-300">

              {summary}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default SummaryModal;