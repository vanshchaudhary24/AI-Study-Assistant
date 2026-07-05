import RegisterForm from "../../components/auth/RegisterForm";
import BackButton from "../../components/common/BackButton";

const Register = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <BackButton />
      <RegisterForm />
    </div>
  );
};

export default Register;