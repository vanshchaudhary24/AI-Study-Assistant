import BackButton from "../../components/common/BackButton";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <BackButton />

      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;