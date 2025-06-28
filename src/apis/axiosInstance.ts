import axios from "axios";
import { toast } from "sonner"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Response Interceptor: handle only errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Something went wrong.";

    toast(message)

    return Promise.reject(error);
  }
);

export default axiosInstance;
