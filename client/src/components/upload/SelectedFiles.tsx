import { FileText, Trash2 } from "lucide-react";

interface Props {
  files: File[];
  removeFile: (index: number) => void;
}

const SelectedFiles = ({ files, removeFile }: Props) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Selected Files
      </h2>

      <div className="space-y-4">

        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
          >
            <div className="flex items-center gap-4">

              <FileText className="text-blue-500" />

              <div>
                <p className="text-white">{file.name}</p>

                <p className="text-sm text-slate-400">
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