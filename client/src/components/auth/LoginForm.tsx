import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthCard from "./AuthCard";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const {

    register,

    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },

  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {

    try {

      await login(data);

      toast.success("Login successful.");

      navigate("/dashboard");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Login failed."
      );

    }

  };

  return (

    <AuthCard
      title="Welcome Back"
      subtitle="Login to continue your learning journey."
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

            <p className="mt-2 text-sm text-red-400">
              {errors.email.message}
            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <PasswordInput
            placeholder="Enter password"
            register={register("password")}
          />

          {errors.password && (

            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>

          )}

        </div>

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-slate-400">

            <input type="checkbox" />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            Forgot Password?
          </Link>

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {isSubmitting
            ? "Logging in..."
            : "Login"}

        </button>

        <GoogleButton />

        <p className="text-center text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-medium text-blue-400"
          >
            Register
          </Link>

        </p>

      </form>

    </AuthCard>

  );

};

export default LoginForm;