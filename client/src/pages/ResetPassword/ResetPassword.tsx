import BackButton from "../../components/common/BackButton";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <BackButton />

      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;