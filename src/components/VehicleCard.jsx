import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns"; // ✅ date-fns added

const VehicleCard = ({ vehicle }) => {
  const {
    _id,
    coverImage,
    vehicleName,
    owner,
    pricePerDay,
    createdAt, // ✅ from DB
  } = vehicle || {};

  return (
    <div
      className="rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
      style={{
        background: "linear-gradient(to right, #ede9fe, #fdf2f8, #eef2ff)",
        boxShadow: "8px 8px 18px #c5c9d6, -8px -8px 18px #ffffff",
      }}
    >
      {/* IMAGE */}
      <div className="relative w-full h-56 bg-white">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-full object-cover"
        />

        {/* PRICE BADGE */}
        <span className="absolute top-4 right-4 bg-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow">
          ৳{pricePerDay}/day
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 text-gray-800">
        <h2 className="text-xl font-bold text-purple-700 mb-1">
          {vehicleName}
        </h2>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Owner:</span> {owner}
        </p>

        {/* ✅ date-fns usage */}
        {createdAt && (
          <p className="text-xs text-gray-500 mb-4">
            Added{" "}
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </p>
        )}

        <div className="flex justify-end">
          <Link
            to={`/vehicle/${_id}`}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
