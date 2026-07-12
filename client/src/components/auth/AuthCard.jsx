function AuthCard({ children }) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-200 p-10">
      {children}
    </div>
  );
}

export default AuthCard;