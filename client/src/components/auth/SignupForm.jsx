import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/register", { name, email, password });
      if (response.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-4 top-4 text-slate-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>
        <div className="relative">
          <FiMail className="absolute left-4 top-4 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>

      <div className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          Sign In
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
