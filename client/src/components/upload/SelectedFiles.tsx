import { FileText, Trash2 } from "lucide-react";

interface Props {
  files: File[];
  removeFile: (index: number) => void;
}

const SelectedFiles = ({ files, removeFile }: Props) => {
  if (files.length === 0) return null;

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Selected Files
      </h2>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800"
          >
            <div className="flex items-center gap-4">
              <FileText className="text-blue-500" />

              <div>
                <p className="text-slate-900 dark:text-white">
                  {file.name}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={() => removeFile(index)}
              className="text-red-500 hover:text-red-400"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedFiles;