import axios from "axios";

// Base API instance
const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Optional: Adds token automatically if available)
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // Retrieve token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (Optional: Handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
