import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const inputStyle = `
  w-full px-4 py-3 rounded-xl
  border border-gray-300 bg-white text-gray-800
  shadow-sm transition-all duration-200
  hover:border-gray-400
  focus:outline-none focus:border-blue-500
  focus:ring-4 focus:ring-blue-100
`;

const fileInputStyle = `
  w-full px-4 py-2 rounded-xl
  border border-gray-300 bg-white
  shadow-sm cursor-pointer
  transition-all duration-200
  focus:outline-none focus:border-blue-500
  focus:ring-4 focus:ring-blue-100
`;

const AddVehicles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState(null);

  // 🔁 React Query Mutation
  const mutation = useMutation({
    mutationFn: async (vehicleData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/vehicles`,
        vehicleData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Vehicle added successfully 🚗");
      queryClient.invalidateQueries({ queryKey: ["latestVehicles"] });
      navigate("/my-vehicles");
    },
    onError: () => {
      toast.error("Failed to add vehicle");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in");
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // 🖼 Upload image to ImgBB
    const imageFile = formData.get("coverImage");
    if (!imageFile || imageFile.size === 0) {
      toast.error("Please select an image");
      return;
    }

    try {
      const imgForm = new FormData();
      imgForm.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        imgForm
      );

      data.coverImage = imgRes.data.data.url;
    } catch {
      toast.error("Image upload failed");
      return;
    }

    // 🔐 Auto-filled backend fields
    data.userEmail = user.email;
    data.owner = user.displayName || user.email.split("@")[0];
    data.pricePerDay = Number(data.pricePerDay);
    data.createdAt = new Date();

    mutation.mutate(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Add New Vehicle
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="vehicleName"
            required
            placeholder="Vehicle Name"
            className={inputStyle}
          />

          <input
            name="owner"
            value={user?.displayName || ""}
            readOnly
            className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
          />

          <select name="category" required className={inputStyle}>
            <option value="">Select Category</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Electric</option>
            <option>Van</option>
          </select>

          <input
            name="pricePerDay"
            type="number"
            required
            placeholder="Price Per Day (৳)"
            className={inputStyle}
          />

          <input
            name="location"
            required
            placeholder="Location (e.g., Dhaka)"
            className={inputStyle}
          />

          <select
            name="availability"
            defaultValue="Available"
            className={inputStyle}
          >
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        <textarea
          name="description"
          required
          rows="4"
          placeholder="Vehicle Description"
          className={`${inputStyle} resize-none`}
        />

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            required
            onChange={handleImageChange}
            className={fileInputStyle}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-xl border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-70"
        >
          {mutation.isPending ? <LoadingSpinner /> : "Add Vehicle"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddVehicles;
