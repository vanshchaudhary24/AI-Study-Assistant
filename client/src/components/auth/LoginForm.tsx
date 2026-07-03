import { Link } from "react-router-dom";
import AuthCard from "./AuthCard";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Login to continue your learning journey."
    >
      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <PasswordInput placeholder="Enter password" />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input type="checkbox" />
            Remember Me
          </label>

          <button
            type="button"
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            Forgot Password?
          </button>
        </div>

        <button
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Login
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