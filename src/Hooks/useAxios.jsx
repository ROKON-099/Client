import axios from "axios";

// Ensure the API URL exists (fail fast in dev)
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_URL is not defined. Check your .env or .env.local file."
  );
}

// Create a single Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // e.g. http://localhost:5000
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Optional: Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    if (!error.response) {
      console.error("Network error or backend not running");
    }
    return Promise.reject(error);
  }
);

// Hook wrapper (keeps API consistent with React usage)
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
