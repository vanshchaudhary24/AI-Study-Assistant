import VerifyOTPForm from "../../components/auth/VerifyOTPForm";
import BackButton from "../../components/common/BackButton";

const VerifyOTP = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <BackButton />

      <VerifyOTPForm />
    </div>
  );
};

export default VerifyOTP;