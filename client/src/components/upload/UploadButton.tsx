import { Loader2 } from "lucide-react";

interface Props {
  disabled: boolean;

  loading: boolean;

  onClick: () => void;
}

const UploadButton = ({
  disabled,
  loading,
  onClick,
}: Props) => {

  return (

    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700"
    >

      {loading && (
        <Loader2
          size={22}
          className="animate-spin"
        />
      )}

      {loading
        ? "Uploading..."
        : "Upload Files"}

    </button>

  );

};

export default UploadButton;