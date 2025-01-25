import axios from "axios";
export const baseURL = import.meta.env.VITE_BACKEND_URL;
export const apiKey = import.meta.env.VITE_MAP_API_KEY;


const axiosPublic = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosPublic;