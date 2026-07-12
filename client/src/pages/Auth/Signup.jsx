import AuthCard from "../../components/auth/AuthCard";
import Logo from "../../components/auth/Logo";
import SignupForm from "../../components/auth/SignupForm";

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-6 py-12">
      <AuthCard>
        <Logo />
        <SignupForm />
      </AuthCard>
    </div>
  );
}

export default Signup;
