import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://ecommerce-user-be.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
