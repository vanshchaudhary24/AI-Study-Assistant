import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden gap-8 text-slate-300 md:flex">
          <a
            href="#home"
            className="transition duration-200 hover:text-blue-400"
          >
            Home
          </a>
          <a
            href="#features"
            className="transition duration-200 hover:text-blue-400"
          >
            Features
          </a>
          <a
            href="#about"
            className="transition duration-200 hover:text-blue-400"
          >
            About
          </a>

          <a
            href="#contact"
            className="transition duration-200 hover:text-blue-400"
          >
            Contact
          </a>
        </nav>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;