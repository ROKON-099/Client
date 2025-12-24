import { createBrowserRouter } from "react-router";

// Layout
import MainLayout from "../Layout/Mainlayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllVehicles from "../pages/AllVehicles";
import AddVehicle from "../pages/AddVehicle";
import MyVehicles from "../pages/MyVehicles";
import VehicleDetails from "../pages/VehicleDetails";
import MyBookings from "../pages/MyBookings";
import UpdateVehicle from "../pages/UpdateVehicle";
import Forget from "../pages/Forget";
import Error from "../pages/ErrorPage";

// Protection
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-vehicles",
        element: <AllVehicles />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget-password",
        element: <Forget />,
      },

      // 🔐 PRIVATE ROUTES
      {
        path: "/add-vehicle",
        element: (
          <PrivateRoute>
            <AddVehicle />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-vehicles",
        element: (
          <PrivateRoute>
            <MyVehicles />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/vehicle/:id",
        element: (
          <PrivateRoute>
            <VehicleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-vehicle/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
