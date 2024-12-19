import axiosPublic from "./initPublic";
import axiosPrivate from "./initPrivate";

export async function login(data) {
  const response = await axiosPublic.post("/api/users/login/", data);
  return response.data;
}

export async function register(data) {
  const response = await axiosPublic.post("api/users/register/", data);
  return response.data;
}

export async function refresh() {
  const token = localStorage.getItem("refresh");
  axiosPublic.post("api/users/refresh/", {refresh: token})
    .then((response) => {
      localStorage.setItem("access", response.data.access);
    })
    .catch((err) => {
      console.log(err);
    })
}

export async function getProfile() {
  const response = await axiosPrivate.get("api/users/me/");
  return response.data;
}

export async function updateProfile(id, data) {
  const response = await axiosPrivate.patch(`api/users/${id}/`, data);
  return response.data;
}