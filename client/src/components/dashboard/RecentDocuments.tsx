import { useNavigate } from "react-router-dom";

interface Props {
  documents: any[];
}

const RecentDocuments = ({
  documents,
}: Props) => {

  const navigate =
    useNavigate();

  if (documents.length === 0) {

    return (

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Recent Documents
        </h2>

        <p className="text-slate-400">
          No documents uploaded yet.
        </p>

      </div>

    );

  }

  return (

    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Documents
      </h2>

      <div className="space-y-4">

        {documents.map((doc) => (

          <div
            key={doc._id}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
          >

            <p className="text-white">
              {doc.originalName}
            </p>

            <button
              onClick={() =>
                navigate("/documents")
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >

              View

            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default RecentDocuments;