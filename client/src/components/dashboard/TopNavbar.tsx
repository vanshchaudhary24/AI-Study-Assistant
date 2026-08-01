import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const TopNavbar = () => {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const avatar =
    user?.avatar
      ? `${import.meta.env.VITE_API_URL?.replace("/api", "")}${user.avatar}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.fullName || "User"
        )}`;

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-10">

      <div>

        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-slate-400">
          Welcome back, {user?.fullName}.
        </p>

      </div>

      <div className="flex items-center gap-8">

        <button className="relative rounded-xl p-2 transition hover:bg-slate-800">

          <Bell
            size={22}
            className="text-slate-300"
          />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-4">

          <img
            src={avatar}
            alt="avatar"
            className="h-11 w-11 rounded-full border-2 border-slate-700 object-cover"
          />

          <div>

            <h3 className="font-semibold text-white">
              {user?.fullName}
            </h3>

            <p className="text-sm text-slate-400">
              {user?.email}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default TopNavbar;