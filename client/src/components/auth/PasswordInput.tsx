import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const PasswordInput = ({
  placeholder,
  register,
  error,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="current-password"
          {...register}
          className={`w-full rounded-xl border bg-slate-800 px-4 py-3 pr-12 text-white outline-none transition
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-slate-700 focus:border-blue-500"
            }`}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;