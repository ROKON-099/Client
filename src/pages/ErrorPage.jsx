import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import ErrorImage from "../assets/error-404.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4"
    >
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2
        bg-purple-600 hover:bg-purple-700
        text-white font-semibold px-4 py-2
        rounded-lg shadow transition"
      >
        <FaArrowLeft /> Go Back
      </button>

      {/* Error Card */}
      <div
        data-aos="fade-up"
        className="w-full max-w-md bg-white border border-gray-200
        rounded-2xl shadow-xl text-center p-6 sm:p-10"
      >
        {/* Error Image */}
        <img
          src={ErrorImage}
          alt="404 Error"
          className="w-3/4 sm:w-2/3 mx-auto mb-6 drop-shadow-md"
        />

        {/* Status Code */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
          {error?.status || "404"}
        </h1>

        {/* Status Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
          {error?.statusText || "Page Not Found"}
        </h2>

        {/* Error Message */}
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          {error?.data ||
            error?.message ||
            "The page you’re looking for doesn’t exist or has been moved."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2
            bg-indigo-600 hover:bg-indigo-700
            text-white px-6 py-3 rounded-xl
            font-semibold shadow transition"
          >
            <FaHome /> Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2
            bg-gray-200 hover:bg-gray-300
            text-gray-800 px-6 py-3 rounded-xl
            font-semibold transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
