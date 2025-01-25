import axiosPublic from "./initPublic";

export async function getLocations() {
  const response = await axiosPublic.get("/api/locations/");
  return response.data;
}

export async function getLocation(id) {
  const response = await axiosPublic.get(`/api/locations/${id}/`);
  return response.data;
}

export async function getCategories(link) {
  const response = link ? await axiosPublic.get(link) : await axiosPublic.get(`/api/categories/`);
  return response.data;
}
export async function getCategoriesAll() {
  const r1 = await axiosPublic.get(`/api/categories/`);
  const response = await axiosPublic.get(`/api/categories/?size=${r1.data.count}`)
  return response.data;
}
export async function getCategory(id) {
  const response = await axiosPublic.get(`/api/categories/${id}/`);
  return response.data;
}