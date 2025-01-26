import axiosPublic from "./initPublic";

export async function getTourByLocations(locations) {
  const query = locations.map(l => l.replace(" ", "+")).join(",")
  const response = await axiosPublic.get(`api/tours/?locations=${query}`);
  return response.data;
}

export async function getTourByLocation(location) {
  const query = location.replace(" ", "+")
  const response = await axiosPublic.get(`api/tours/?locations=${query}`);
  return response.data;
}

export async function getTour(id) {
  const response = await axiosPublic.get(`/api/tours/${id}/`);
  return response.data;
}