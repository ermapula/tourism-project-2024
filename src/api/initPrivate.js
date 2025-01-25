import axios from "axios";
import axiosPublic, { baseURL } from "./initPublic";

const axiosPrivate = axios.create({
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

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401) {
      const errorData = error.response.data;
      if(errorData.code === "token_not_valid") {
        const token = localStorage.getItem("refresh");
        try {
          const response = await axiosPublic.post("api/users/refresh/", {refresh: token});
          localStorage.setItem("access", response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axiosPrivate.request(originalRequest);
        } 
        catch (err) {
          if(err.response?.data?.code === "token_not_valid") {
            console.log("Token resfresh error:", err);
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/login";
          }
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
)



export default axiosPrivate;