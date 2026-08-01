import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface Props {
  onFilesAdded: (files: File[]) => void;
}

const FileDropzone = ({ onFilesAdded }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    
    maxSize: 100 * 1024 * 1024,

    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },

    onDrop: (acceptedFiles) => {
      onFilesAdded(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-300
      ${
        isDragActive
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 bg-slate-900 hover:border-blue-500 hover:bg-slate-900/70"
      }`}
    >
      <input {...getInputProps()} />

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600/20">
        <UploadCloud
          size={48}
          className="text-blue-500"
        />
      </div>

      <h2 className="mt-8 text-3xl font-bold text-white">
        Drag & Drop Files
      </h2>

      <p className="mt-3 text-slate-400">
        or click anywhere to browse
      </p>

      <div className="mt-8 flex justify-center gap-3">

        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
          PDF
        </span>

        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
          DOCX
        </span>

        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
          TXT
        </span>

      </div>
    </div>
  );
};

export default FileDropzone;