const GoogleButton = () => {
  return (
    <button
      type="button"
      className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5"
      />

      Continue with Google
    </button>
  );
};

export default GoogleButton;