import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { z } from "zod";

import AuthCard from "./AuthCard";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

import { registerSchema } from "../../validators/auth.validator";
import { registerUser } from "../../services/auth.service";

type RegisterFormData = z.infer<typeof registerSchema>;


const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
   
    try {
      const response = await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success(response.message);

      // Save email temporarly for OTP verification
      sessionStorage.setItem(
        "verifyEmail",
        data.email
      );

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
      
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed."
      );
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Start your AI-powered learning journey."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}

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
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <PasswordInput
            placeholder="Create password"
            register= {register("password")}
            error = {errors.password?.message}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Confirm Password
          </label>

          <PasswordInput
            placeholder="Confirm password"
            register= {register("confirmPassword")}
          />
          {
            errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )
          }
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <GoogleButton />

        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default RegisterForm;