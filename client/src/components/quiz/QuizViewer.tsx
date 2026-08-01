interface QuizViewerProps {

  open: boolean;

  loading: boolean;

  quiz: any[];

  onClose: () => void;

}

const QuizViewer = ({
  open,
  loading,
  quiz,
  onClose,
}: QuizViewerProps) => {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="max-h-[90vh] w-[900px] overflow-y-auto rounded-2xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">

            AI Generated Quiz

          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >

            Close

          </button>

        </div>

        {loading ? (

          <p className="text-white">

            Generating quiz...

          </p>

        ) : (

          <div className="space-y-8">

            {quiz.map(
              (
                q: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="rounded-xl border border-slate-700 p-5"
                >

                  <h3 className="mb-4 font-semibold text-white">

                    {index + 1}. {q.question}

                  </h3>

                  <div className="space-y-2">

                    {q.options.map(
                      (
                        option: string,
                        i: number
                      ) => (

                        <div
                          key={i}
                          className="rounded-lg bg-slate-800 p-3 text-slate-200"
                        >

                          {option}

                        </div>

                      )
                    )}

                  </div>

                  <div className="mt-4 rounded-lg bg-green-900 p-3 text-green-300">

                    Answer: {q.answer}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

};

export default QuizViewer;