import {
  Moon,
  Sun,
  User,
  Shield,
  Lock,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import { deleteAccount } from "../../services/auth.service";

const Settings = () => {
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  const handleLogout = async () => {
    try {
      await logout();

      toast.success(
        "Logged out successfully."
      );

      navigate("/login", {
        replace: true,
      });
    } catch {
      toast.error("Logout failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      toast.error(
        "Please enter your password."
      );
      return;
    }

    try {
      setDeleting(true);

      const response =
        await deleteAccount(password);

      toast.success(
        response.message ||
          "Account deleted successfully."
      );

      setPassword("");
      setShowDeleteModal(false);

      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete account."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your account, appearance,
            security and privacy.
          </p>
        </div>

        {/* Account */}

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your personal account information.
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 py-5">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-600/10 p-3">
                <User
                  size={22}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="font-medium text-white">
                  {user?.fullName}
                </p>

                <p className="text-sm text-slate-400">
                  {user?.email}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Manage
              <ChevronRight size={16} />
            </button>

          </div>

        </section>

        {/* Appearance */}

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Choose how AI Study Assistant looks.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <button
              onClick={() => setTheme("light")}
              className={`rounded-2xl border p-5 text-left transition ${
                theme === "light"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-800 hover:border-slate-600"
              }`}
            >

              <div className="mb-4 flex items-center justify-between">

                <div className="rounded-xl bg-yellow-500/10 p-3">
                  <Sun
                    size={22}
                    className="text-yellow-400"
                  />
                </div>

                {theme === "light" && (
                  <span className="text-sm font-medium text-blue-400">
                    Active
                  </span>
                )}

              </div>

              <h3 className="font-semibold text-white">
                Light Mode
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Use a bright interface.
              </p>

            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`rounded-2xl border p-5 text-left transition ${
                theme === "dark"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-800 hover:border-slate-600"
              }`}
            >

              <div className="mb-4 flex items-center justify-between">

                <div className="rounded-xl bg-indigo-500/10 p-3">
                  <Moon
                    size={22}
                    className="text-indigo-400"
                  />
                </div>

                {theme === "dark" && (
                  <span className="text-sm font-medium text-blue-400">
                    Active
                  </span>
                )}

              </div>

              <h3 className="font-semibold text-white">
                Dark Mode
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Use the dark interface.
              </p>

            </button>

          </div>

        </section>

        {/* Security */}

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Security & Privacy
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your password and account security.
            </p>
          </div>

          <div className="space-y-3">

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-left transition hover:bg-slate-800"
            >

              <div className="flex items-center gap-4">

                <Lock
                  size={20}
                  className="text-slate-300"
                />

                <div>
                  <p className="font-medium text-white">
                    Change Password
                  </p>

                  <p className="text-sm text-slate-400">
                    Update your account password.
                  </p>
                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-slate-500"
              />

            </button>

            <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-800/50 p-4">

              <Shield
                size={20}
                className="mt-1 text-green-400"
              />

              <div>
                <p className="font-medium text-white">
                  Privacy
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Your account data is associated
                  with your authenticated user account.
                  You can permanently remove your
                  account from the Danger Zone below.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Session */}

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Session
            </h2>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-left transition hover:bg-slate-800"
          >

            <LogOut
              size={20}
              className="text-red-400"
            />

            <div>
              <p className="font-medium text-white">
                Logout
              </p>

              <p className="text-sm text-slate-400">
                Sign out of your account.
              </p>
            </div>

          </button>

        </section>

        {/* Danger Zone */}

        <section className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-red-400">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Permanently delete your account and
              remove your access to the application.
            </p>

          </div>

          <button
            onClick={() =>
              setShowDeleteModal(true)
            }
            className="flex items-center gap-3 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >

            <Trash2 size={19} />

            Delete Account

          </button>

        </section>

      </div>

      {/* Delete Modal */}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">

          <div className="w-full max-w-md rounded-2xl border border-red-900/50 bg-slate-900 p-6 shadow-2xl">

            <div className="mb-6">

              <div className="mb-4 inline-flex rounded-xl bg-red-500/10 p-3">
                <Trash2
                  size={24}
                  className="text-red-500"
                />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Delete Account?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                This action is permanent. Enter your
                current password to confirm account
                deletion.
              </p>

            </div>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Current password"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-red-500"
            />

            <div className="flex gap-3">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                }}
                disabled={deleting}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Account"}
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default Settings;