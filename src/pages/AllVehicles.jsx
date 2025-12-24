import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVehicles = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles", search, category, location, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (location) params.append("location", location);
      if (sort) params.append("sort", sort);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicles?${params.toString()}`
      );
      return res.data;
    },
  });

  return (
    <div className="py-14 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-700">
        All Vehicles
      </h1>

      {/* ================= FILTERS ================= */}
      <div className="max-w-7xl mx-auto px-4 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Categories</option>
        
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
          <option value="Van">Van</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Location */}
        <input
          type="text"
          placeholder="Location (e.g. Dhaka)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* ================= VEHICLES GRID ================= */}
      {isLoading ? (
        <LoadingSpinner />
      ) : vehicles.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No vehicles found.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4"
        >
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="cursor-pointer"
              onClick={() => navigate(`/vehicle/${vehicle._id}`)}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllVehicles;
