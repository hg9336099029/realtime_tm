import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // for sending cookies if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
