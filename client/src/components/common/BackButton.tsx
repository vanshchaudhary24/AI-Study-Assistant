import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      aria-label="Back to Home"
      className="
        fixed
        left-6
        top-6
        z-50
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-slate-700
        bg-slate-900/90
        text-slate-300
        shadow-lg
        backdrop-blur-md
        transition-all
        duration-300
        hover:scale-105
        hover:border-blue-500
        hover:bg-slate-800
        hover:text-white
      "
    >
      <X size={22} />
    </button>
  );
};

export default BackButton;