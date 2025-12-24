import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
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

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing vehicle
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicle/${id}`
      );
      return res.data;
    },
  });

  // Update mutation
  const mutation = useMutation({
    mutationFn: async (updatedVehicle) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/vehicle/${id}`,
        updatedVehicle
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Vehicle updated successfully 🚗");
      queryClient.invalidateQueries({ queryKey: ["my-vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["latestVehicles"] });
      navigate("/my-vehicles");
    },
    onError: () => {
      toast.error("Failed to update vehicle");
    },
  });

  useEffect(() => {
    if (vehicle?.coverImage) {
      setImagePreview(vehicle.coverImage);
    }
  }, [vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    const imageFile = formData.get("coverImage");

    // Upload new image only if selected
    if (imageFile && imageFile.size > 0) {
      try {
        const imgForm = new FormData();
        imgForm.append("image", imageFile);

        const imgRes = await axios.post(
          "https://api.imgbb.com/1/upload",
          imgForm,
          {
            params: {
              key: import.meta.env.VITE_IMGBB_KEY,
            },
          }
        );

        updatedData.coverImage = imgRes.data.data.url;
      } catch {
        toast.error("Image upload failed");
        setSubmitting(false);
        return;
      }
    } else {
      updatedData.coverImage = vehicle.coverImage;
    }

    updatedData.pricePerDay = Number(updatedData.pricePerDay);

    mutation.mutate(updatedData);
    setSubmitting(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!vehicle)
    return (
      <p className="text-center text-red-600 mt-10">
        Vehicle not found
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Update Vehicle
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border"
      >
        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="vehicleName"
            defaultValue={vehicle.vehicleName}
            required
            placeholder="Vehicle Name"
            className={inputStyle}
          />

          <input
            name="owner"
            value={vehicle.owner}
            readOnly
            className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
          />

          <select
            name="category"
            defaultValue={vehicle.category}
            required
            className={inputStyle}
          >
            <option value="">Select Category</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Electric</option>
            <option>Van</option>
          </select>

          <input
            name="pricePerDay"
            type="number"
            defaultValue={vehicle.pricePerDay}
            required
            placeholder="Price Per Day ($)"
            className={inputStyle}
          />

          <input
            name="location"
            defaultValue={vehicle.location}
            required
            placeholder="Location"
            className={inputStyle}
          />

          <select
            name="availability"
            defaultValue={vehicle.availability}
            className={inputStyle}
          >
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        <textarea
          name="description"
          defaultValue={vehicle.description}
          required
          rows="4"
          placeholder="Vehicle Description"
          className={`${inputStyle} resize-none`}
        />

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image (optional)
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border mb-4"
            />
          )}

          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className={fileInputStyle}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting || mutation.isPending}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-70"
          >
            {submitting ? "Updating..." : "Update Vehicle"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/my-vehicles")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateVehicle;
