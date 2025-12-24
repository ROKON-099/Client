import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const MyBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/${user.email}`
      );
      return res.data;
    },
  });

  
  const cancelMutation = useMutation({
    mutationFn: async (bookingId) => {
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
      );
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Booking Cancelled",
        text: "You can book this vehicle again.",
        confirmButtonColor: "#6366f1",
      });

      queryClient.invalidateQueries(["my-bookings"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-14 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-700">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col md:flex-row gap-6"
            >
              {/* IMAGE (FIXED & RESPONSIVE) */}
              <div className="w-full md:w-44 flex justify-center items-center">
                <img
                  src={booking.vehicle?.coverImage}
                  alt={booking.vehicle?.vehicleName}
                  className="w-full max-w-xs md:max-w-[160px] h-auto object-contain rounded-xl"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {booking.vehicle?.vehicleName}
                </h3>

                <p className="text-lg font-semibold text-purple-600">
                  ৳{booking.vehicle?.pricePerDay} / day
                </p>

                <p className="text-sm text-gray-500">
                  Booked on:{" "}
                  {new Date(booking.bookedAt).toLocaleDateString()}
                </p>

                <span className="inline-block mt-2 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {booking.status}
                </span>
              </div>

              {/* ACTION */}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Cancel Booking?",
                      text: "This will make the vehicle available again.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#6366f1",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, Cancel",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        cancelMutation.mutate(booking._id);
                      }
                    });
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
