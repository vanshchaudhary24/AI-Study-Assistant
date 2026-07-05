import { Link } from "react-router-dom";
import AuthCard from "./AuthCard";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Start your AI-powered learning journey."
    >
      <form className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

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

          <PasswordInput placeholder="Create password" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Confirm Password
          </label>

          <PasswordInput placeholder="Confirm password" />
        </div>

        <button
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Account
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