import axios from "axios";
export const baseURL = process.env.BACKEND_URL;
export const apiKey = process.env.MAP_API_KEY;


const axiosPublic = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosPublic;