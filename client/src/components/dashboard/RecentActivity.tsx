interface Props {
  documents: any[];
}

const RecentActivity = ({ documents }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {documents.slice(0, 5).map((doc) => (
          <div
            key={doc._id}
            className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700"
          >
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {doc.originalName}
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Uploaded
              </p>
            </div>

            <span className="text-sm text-slate-500">
              {new Date(doc.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentActivity;