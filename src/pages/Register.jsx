import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import useAuth from "../Hooks/useAuth";

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // 🔐 Password validation
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photo = e.target.photo.value.trim();
    const password = e.target.password.value;

    // ✅ Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const result = await registerUser(email, password);

      // Update user profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration successful 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch {
      toast.error("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-xl"
        data-aos="fade-up"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Password Error */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleRegister}
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

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
