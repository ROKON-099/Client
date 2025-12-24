import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MyVehicles = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch vehicles by user email
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["my-vehicles", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-vehicles/${user.email}`
      );
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/vehicle/${id}`),
    onSuccess: () => {
      toast.success("Vehicle deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-vehicles"] });
    },
    onError: () => {
      toast.error("Failed to delete vehicle");
    },
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">
            Are you sure you want to delete this vehicle?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                deleteMutation.mutate(id);
                toast.dismiss(t.id);
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          My Vehicles
        </h1>
        <Link
          to="/add-vehicle"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          + Add Vehicle
        </Link>
      </div>

      {/* Empty State */}
      {vehicles.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          You haven't listed any vehicles yet.
        </p>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-md border p-4"
            >
              <VehicleCard vehicle={vehicle} />

              {/* Actions */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <Link
                  to={`/vehicle/${vehicle._id}`}
                  className="bg-gray-200 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  View
                </Link>

                <Link
                  to={`/update-vehicle/${vehicle._id}`}
                  className="bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
