import { FiMail, FiLock } from "react-icons/fi";

function LoginForm() {
  return (
    <form className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>

        <div className="relative">
          <FiMail className="absolute left-4 top-4 text-slate-400" />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative">
          <FiLock className="absolute left-4 top-4 text-slate-400" />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <button
  type="submit"
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-xl"
>
  Sign In
</button>

<div className="flex justify-end">
  <button
    type="button"
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot Password?
  </button>
</div>

<div className="flex items-center justify-between">
  <label className="flex items-center gap-2 text-sm text-slate-600">
    <input type="checkbox" />
    Remember me
  </label>
</div>
    </form>
  );
}

export default LoginForm;