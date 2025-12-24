import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";



const Navber = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {})
      .catch(() => {});
  };

  const activeClass = ({ isActive }) =>
    `btn btn-ghost ${isActive ? "text-indigo-700 font-bold" : ""}`;

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-6">
      
      {/* LEFT: USER AVATAR + LOGO */}
      <div className="flex-1 flex items-center gap-4">
        {user && (
          <img
            src={user.photoURL || "https://i.ibb.co/2kR2zYk/user.png"}
            alt={user.displayName || "User"}
            title={user.displayName || "User"}
            className="w-10 h-10 rounded-full border-2 border-indigo-600 cursor-pointer"
          />
        )}

        <NavLink
          to="/"
          className="text-2xl italic font-bold text-indigo-600"
        >
          TravelEase
        </NavLink>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-4 items-center">
        <NavLink to="/" className={activeClass}>Home</NavLink>
        <NavLink to="/all-vehicles" className={activeClass}>All Vehicles</NavLink>

        {user && (
          <>
            <NavLink to="/add-vehicle" className={activeClass}>Add Vehicle</NavLink>
            <NavLink to="/my-vehicles" className={activeClass}>My Vehicles</NavLink>
            <NavLink to="/my-bookings" className={activeClass}>My Bookings</NavLink>
          </>
        )}

        {!user ? (
          <>
            <NavLink to="/login" className="btn bg-indigo-600 text-white hover:bg-indigo-700">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline border-indigo-600 text-indigo-600">
              Register
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Logout
          </button>
        )}
      </div>

      
      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-52 bg-white shadow-lg rounded-lg flex flex-col p-4 gap-3 z-50 md:hidden">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/all-vehicles" onClick={() => setMenuOpen(false)} className={activeClass}>
            All Vehicles
          </NavLink>

          {user && (
            <>
              <NavLink to="/add-vehicle" onClick={() => setMenuOpen(false)} className={activeClass}>
                Add Vehicle
              </NavLink>
              <NavLink to="/my-vehicles" onClick={() => setMenuOpen(false)} className={activeClass}>
                My Vehicles
              </NavLink>
              <NavLink to="/my-bookings" onClick={() => setMenuOpen(false)} className={activeClass}>
                My Bookings
              </NavLink>
            </>
          )}

    {!user ? (
      <>
        <NavLink
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="btn bg-indigo-600 text-white w-full hover:bg-indigo-700"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          onClick={() => setMenuOpen(false)}
          className="btn btn-outline border-indigo-600 text-indigo-600 w-full"
        >
          Register
        </NavLink>
      </>
    ) : (
      <button
        onClick={() => {
          handleLogout();
          setMenuOpen(false);
        }}
        className="btn bg-indigo-600 text-white w-full hover:bg-indigo-700"
      >
        Logout
      </button>
    )}
  </div>
)}
    </div>
  );
};

export default Navber;
