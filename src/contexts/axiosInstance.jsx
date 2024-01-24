import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL;

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    // Add other headers if needed
  },
});

// Add an interceptor to include the token in the request headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
