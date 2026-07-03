const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">
      <div className="mx-auto max-w-7xl px-6 text-center text-slate-400">
        © {new Date().getFullYear()} AI Study Assistant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;