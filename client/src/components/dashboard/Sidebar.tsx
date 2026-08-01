import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

import {
  LayoutDashboard,
  Upload,
  FileText,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Upload,
    name: "Upload Notes",
    path: "/upload",
  },
  {
    icon: FileText,
    name: "My Documents",
    path: "/documents",
  },
  {
    icon: MessageSquare,
    name: "AI Chat",
    path: "/chat",
  },
  {
    icon: BarChart3,
    name: "Quiz",
    path: "/quiz",
  },
  {
    icon: User,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: Settings,
    name: "Settings",
    path: "/settings",
  },
];

const Sidebar = () => {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const handleLogout = async () => {

    try {

      setLoading(true);

      await logout();

      toast.success("Logged out successfully.");

      navigate("/login", {
        replace: true,
      });

    } catch {

      toast.error("Logout failed.");

    } finally {

      setLoading(false);

    }

  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-white">
          AI Study
        </h1>

        <p className="text-sm text-slate-400">
          Learn Smarter
        </p>

      </div>

      <nav className="mt-8 flex-1 space-y-2 px-4">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}

      </nav>

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
        >
          <LogOut size={20} />

          {loading ? "Logging out..." : "Logout"}

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;