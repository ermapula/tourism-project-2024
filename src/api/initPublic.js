import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "http://143.110.255.182",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosPublic;