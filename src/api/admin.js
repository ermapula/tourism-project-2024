import axiosPrivate from "./initPrivate";


export async function getUsers(link) {
  const response = link ? await axiosPrivate.get(link) : await axiosPrivate.get(`/api/users/`);
  return response.data;
}

export async function createUser(data) {
  const response = await axiosPrivate.post(`/api/users/`, data);
  return response.data;
}

export async function updateUser(id, data) {
  const response = await axiosPrivate.patch(`/api/users/${id}/`, data);
  return response.data;
}

export async function deleteUser(id) {
  const response = await axiosPrivate.delete(`/api/users/${id}/`);
  return response.data;
}