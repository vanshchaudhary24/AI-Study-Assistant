interface Props {
  documents: any[];
}

const RecentActivity = ({
  documents,
}: Props) => {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-5 text-xl font-bold text-white">

        Recent Activity

      </h2>

      <div className="space-y-4">

        {documents.slice(0, 5).map((doc) => (

          <div
            key={doc._id}
            className="flex items-center justify-between rounded-lg border border-slate-700 p-3"
          >

            <div>

              <p className="font-medium text-white">

                {doc.originalName}

              </p>

              <p className="text-sm text-slate-400">

                Uploaded

              </p>

            </div>

            <span className="text-sm text-slate-500">

              {new Date(
                doc.createdAt
              ).toLocaleDateString()}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

};

export default RecentActivity;