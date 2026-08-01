import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import AuthCard from "./AuthCard";
import { verifyOTP } from "../../services/auth.service";

interface OTPFormData {
  otp: string;
}

const VerifyOTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OTPFormData>();

  const onSubmit = async (data: OTPFormData) => {
    try {
      const response = await verifyOTP({
        email,
        otp: data.otp,
      });

      toast.success(response.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "OTP verification failed."
      );
    }
  };

  return (
    <AuthCard
      title="Verify Email"
      subtitle="Enter the OTP sent to your email."
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
            value={email}
            readOnly
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            OTP
          </label>

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 tracking-[0.4em] text-center text-xl text-white outline-none focus:border-blue-500"
          />

          {errors.otp && (
            <p className="mt-2 text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <p className="text-center text-sm text-slate-400">
          Wrong email?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-500"
          >
            Register Again
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default VerifyOTPForm;