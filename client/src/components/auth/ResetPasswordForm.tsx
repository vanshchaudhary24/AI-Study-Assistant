import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";

import { resetPassword } from "../../services/auth.service";

const resetSchema = z.object({

  otp: z
    .string()
    .length(6, "OTP must be 6 digits."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "One uppercase letter required.")
    .regex(/[a-z]/, "One lowercase letter required.")
    .regex(/[0-9]/, "One number required."),

});

type FormData =
  z.infer<typeof resetSchema>;

const ResetPasswordForm = () => {

  const navigate = useNavigate();

  const email =
    sessionStorage.getItem("resetEmail") || "";

  const {

    register,

    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },

  } = useForm<FormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (
    data: FormData
  ) => {

    try {

      const response =
        await resetPassword(
          email,
          data.otp,
          data.password
        );

      toast.success(
        response.message
      );

      sessionStorage.removeItem(
        "resetEmail"
      );

      navigate("/login");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Password reset failed."
      );

    }

  };

  return (

    <AuthCard
      title="Reset Password"
      subtitle="Enter the OTP and choose a new password."
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            OTP
          </label>

          <input
            {...register("otp")}
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center tracking-[0.4em] text-white outline-none focus:border-blue-500"
          />

          {errors.otp && (
            <p className="mt-1 text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            New Password
          </label>

          <PasswordInput
            placeholder="Enter new password"
            register={register("password")}
            error={errors.password?.message}
          />

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >

          {isSubmitting
            ? "Updating..."
            : "Reset Password"}

        </button>

        <p className="text-center text-sm text-slate-400">

          Back to{" "}

          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500"
          >
            Login
          </Link>

        </p>

      </form>

    </AuthCard>

  );

};

export default ResetPasswordForm;