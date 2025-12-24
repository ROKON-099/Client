 import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const { login, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    try {
      setLoading(true);
      await login(email.value.trim(), password.value);
      toast.success("Login Successful! 🚗");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(
        err.code === "auth/wrong-password" ||
          err.code === "auth/user-not-found"
          ? "Invalid email or password"
          : "Login failed. Registration first."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        data-aos="fade-up"
      >
        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-8"
          data-aos="zoom-in"
        >
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4" data-aos="fade-right">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Password with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-12"
            />
{/* Forgot Password */}
<p className="text-right text-sm">
  <Link
    to="/forget-password"
    state={{ email: document.querySelector('input[name="email"]')?.value }}
    className="text-indigo-600 hover:underline"
  >
    Forgot Password
  </Link>
</p>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-indigo-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6" data-aos="fade-right">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border py-3 rounded-xl hover:bg-gray-50 transition"
          data-aos="fade-left"
        >
          {/* Google Icon */}
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 6.75c1.63 0 3.06.56 4.21 1.65l3.15-3.15C17.45 3.05 14.97 2 12 2 7.7 2 3.99 4.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Register */}
        <p className="mt-6 text-center text-gray-700" data-aos="zoom-in">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-700 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
