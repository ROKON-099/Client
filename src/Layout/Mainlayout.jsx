import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../Hooks/useAuth";

const MainLayout = () => {
  const { loading } = useAuth();


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* TOAST (LIGHT / BRIGHT STYLE) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          },
          success: {
            style: {
              border: "1px solid #10b981",
            },
          },
          error: {
            style: {
              border: "1px solid #ef4444",
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
