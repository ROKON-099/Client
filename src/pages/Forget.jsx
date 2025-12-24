import { useState } from "react";
import { useLocation, Link } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const Forget = () => {
  const location = useLocation();
  const defaultEmail = location.state?.email || "";

  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! 📧");
    } catch (err) {
      toast.error(
        err.code === "auth/user-not-found"
          ? "No account found with this email"
          : "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Remember your password?{" "}
          <Link to="/login" className="text-indigo-700 font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forget;
