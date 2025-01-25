import axios from "axios";
export const baseURL = process.env.REACT_APP_BACKEND_URL;
export const apiKey = process.env.REACT_APP_MAP_API_KEY;

console.log("baseURL", baseURL)
console.log("apikey", apiKey)

const axiosPublic = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosPublic;