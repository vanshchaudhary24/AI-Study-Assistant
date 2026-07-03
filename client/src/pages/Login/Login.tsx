import BackButton from "../../components/common/BackButton";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <BackButton />

      <LoginForm />
    </div>
  );
};

export default Login;