import axios from "axios";

const axiosPrivate = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "http://143.110.255.182",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default axiosPrivate;