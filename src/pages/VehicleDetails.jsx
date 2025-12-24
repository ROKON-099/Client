import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const VehicleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ================= VEHICLE DETAILS =================
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicle/${id}`
      );
      return res.data;
    },
  });

  // ================= USER BOOKINGS =================
  const { data: myBookings = [] } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/${user.email}`
      );
      return res.data;
    },
  });

  // ✅ CHECK ONLY THIS VEHICLE
  const alreadyBooked = myBookings.some(
    (booking) => String(booking.vehicle?._id) === String(id)
  );

  // ================= BOOK MUTATION =================
  const bookMutation = useMutation({
    mutationFn: async () => {
      return axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        vehicleId: id,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "This vehicle has been added to your bookings.",
        confirmButtonColor: "#6366f1",
      });
      queryClient.invalidateQueries(["my-bookings"]);
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!vehicle) {
    return (
      <div className="text-center text-red-500 text-xl mt-20">
        Vehicle not found!
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 border-b pb-3">
          {vehicle.vehicleName}
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* IMAGE */}
          <div className="md:w-1/2">
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="md:w-1/2 space-y-4">
            <p className="text-3xl font-bold text-purple-600">
              ৳{vehicle.pricePerDay} / day
            </p>

            <p className="text-lg font-semibold">
              Owner:{" "}
              <span className="text-indigo-600">{vehicle.owner}</span>
            </p>

            <p className="text-lg font-semibold">
              Location:{" "}
              <span className="text-indigo-600">{vehicle.location}</span>
            </p>

            {/* DESCRIPTION */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {vehicle.description || "No description provided."}
              </p>
            </div>

            {/* BOOK BUTTON */}
            <button
              onClick={() => {
                if (!user) {
                  Swal.fire({
                    icon: "warning",
                    title: "Login Required",
                    text: "Please login to book this vehicle.",
                    confirmButtonColor: "#6366f1",
                  });
                  navigate("/login");
                  return;
                }

                if (alreadyBooked) return;

                bookMutation.mutate();
              }}
              disabled={alreadyBooked || bookMutation.isPending}
              className={`w-full mt-6 font-bold py-4 rounded-xl text-lg transition transform
                ${
                  alreadyBooked
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-105"
                }
              `}
            >
              {alreadyBooked
                ? "Already Booked"
                : bookMutation.isPending
                ? "Processing..."
                : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleDetails;
