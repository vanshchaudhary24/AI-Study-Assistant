import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthCard from "./AuthCard";
import { forgotPassword } from "../../services/auth.service";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email."),
});

type ForgotPasswordData = z.infer<
  typeof forgotPasswordSchema
>;

const ForgotPasswordForm = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(
      forgotPasswordSchema
    ),
  });

  const onSubmit = async (
    data: ForgotPasswordData
  ) => {

    try {

      const response =
        await forgotPassword(
          data.email
        );

      sessionStorage.setItem(
        "resetEmail",
        data.email
      );

      toast.success(
        response.message
      );

      navigate("/reset-password");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to send OTP."
      );

    }

  };

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="We'll send an OTP to your registered email."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

        <p className="text-center text-sm text-slate-400">

          Remember your password?{" "}

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

export default ForgotPasswordForm;