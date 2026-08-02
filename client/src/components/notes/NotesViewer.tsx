import Loader from "../common/Loader";

interface Props {
  open: boolean;
  loading: boolean;
  notes: string;
  onClose: () => void;
}

const NotesViewer = ({
  open,
  loading,
  notes,
  onClose,
}: Props) => {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-4xl rounded-2xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            AI Notes
          </h2>

          <button
            onClick={onClose}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Close
          </button>

        </div>

        {loading ? (

          <Loader text="Generatin AI Notes..." />

        ) : (

          <div className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-800 p-6 text-slate-200">

            {notes.length > 0 ? (

              notes

            ) : (

              <div className="py-10 text-center">

                <div className="text-5xl">
                  📝
                </div>

                <p className="mt-5 text-slate-400">

                  No notes generated.

                </p>

              </div>

            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default NotesViewer;