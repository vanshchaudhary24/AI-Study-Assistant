const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 hover:border-slate-600"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="h-5 w-5"
      />

      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
