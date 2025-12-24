import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ThemeToggle from "../components/ThemeToggle";

import img1 from "../assets/img-3.png";

import cat1 from "../assets/car-1.png";
import cat2 from "../assets/car-10.png";
import cat3 from "../assets/cng-1.png";
import cat4 from "../assets/car-4.png";

const API = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();

  const { data: vehicles = [], isLoading, isError } = useQuery({
    queryKey: ["latestVehicles"],
    queryFn: async () => {
      const res = await axios.get(`${API}/latest-vehicles`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load vehicles. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-20 px-2 sm:px-0">

      {/* ==================== HERO BANNER ==================== */}
      <section className="relative bg-base-200 rounded-2xl overflow-hidden mx-2 sm:mx-4">

        {/* Theme Toggle – Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-center md:text-left"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Explore the World with <br />
              <span className="text-purple-600">TravelEase</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto md:mx-0">
              Rent premium vehicles from trusted owners and enjoy a smooth,
              flexible, and secure travel experience—anytime, anywhere.
            </p>

            <Link
              to="/all-vehicles"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              View All Vehicles →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={img1}
              alt="Travel vehicle"
              className="w-[80%] sm:w-[70%] md:w-[85%] max-w-md object-contain mix-blend-multiply"
            />
          </motion.div>
        </div>
      </section>

      {/* ==================== LATEST VEHICLES ==================== */}
      <section className="px-2 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Latest Vehicles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/vehicle/${vehicle._id}`)}
              className="cursor-pointer"
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-vehicles"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            View All Vehicles
          </Link>
        </div>
      </section>

      {/* ==================== TOP CATEGORIES ==================== */}
      <section className="py-20 px-4 sm:px-6 bg-[#f3f4f6] rounded-2xl mx-2 sm:mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Top Categories
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Find the perfect vehicle for every type of journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[cat1, cat2, cat3, cat4].map((img, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
              >
                <img
                  src={img}
                  alt="category"
                  className="w-40 h-28 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {["SUVs", "Electric", "Vans", "Sedan"][idx]}
                </h3>
                <p className="text-gray-600 text-sm">
                  Perfect choice for your journey.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section className="bg-[#fffafa] rounded-2xl py-16 px-4 sm:px-6 text-center mx-2 sm:mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
          About TravelEase
        </h2>

        <p className="max-w-2xl mx-auto text-gray-700 text-base sm:text-lg mb-6">
          TravelEase is a modern vehicle rental platform where you can easily
          rent vehicles or list your own. Simple booking, trusted owners, and
          smooth travel experience.
        </p>

        <Link
          to="/all-vehicles"
          className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
};

export default Home;
