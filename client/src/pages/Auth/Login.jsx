import AuthCard from "../../components/auth/AuthCard";
import Logo from "../../components/auth/Logo";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-6">
      <AuthCard>
        <Logo />
        <LoginForm />
      </AuthCard>
    </div>
  );
}

export default Login;