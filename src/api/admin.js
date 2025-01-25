import axiosPrivate from "./initPrivate";


// Users
export async function getUsers(link) {
  const response = link ? await axiosPrivate.get(link) : await axiosPrivate.get(`/api/users/`);
  return response.data;
}

export async function getUser(id) {
  const response = await axiosPrivate.get(`/api/users/${id}`);
  return response.data;
}

export async function createUser(data) {
  const response = await axiosPrivate.post(`/api/users/`, data);
  return response.data;
}
export async function createManager(data) {
  const response = await axiosPrivate.post(`/api/users/create_manager/`, data);
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

// Categories
export async function getCategories(link) {
  const response = link ? await axiosPrivate.get(link) : await axiosPrivate.get(`/api/categories/`);
  return response.data;
}

export async function getCategoriesAll() {
  const r1 = await axiosPrivate.get(`/api/categories/`);
  const response = await axiosPrivate.get(`/api/categories/?size=${r1.data.count}`)
  return response.data;
}

export async function getCategory(id) {
  const response = await axiosPrivate.get(`/api/categories/${id}/`);
  return response.data;
}

export async function createCategory(data) {
  const response = await axiosPrivate.post(`/api/categories/`, data);
  return response.data;
}

export async function updateCategory(id, data) {
  const response = await axiosPrivate.patch(`/api/categories/${id}/`, data);
  return response.data;
}

export async function deleteCategory(id) {
  const response = await axiosPrivate.delete(`/api/categories/${id}/`);
  return response.data;
}

// Locations
export async function getLocations(link) {
  const response = link ? await axiosPrivate.get(link) : await axiosPrivate.get(`/api/locations/`);
  return response.data;
}

export async function getLocation(id) {
  const response = await axiosPrivate.get(`/api/locations/${id}/`);
  return response.data;
}

export async function createLocation(data) {
  const response = await axiosPrivate.post(`/api/locations/`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}

export async function updateLocation(id, data) {
  const response = await axiosPrivate.patch(`/api/locations/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}

export async function deleteLocation(id) {
  const response = await axiosPrivate.delete(`/api/locations/${id}/`);
  return response.data;
}

// Tours
export async function getTours(link) {
  const response = link ? await axiosPrivate.get(link) : await axiosPrivate.get(`/api/tours/`);
  return response.data;
}

export async function getTour(id) {
  const response = await axiosPrivate.get(`/api/tours/${id}/`);
  return response.data;
}

export async function addTour(data) {
  const response = await axiosPrivate.post("/api/tours/", data);
  return response.data;
}

export async function updateTour(id, data) {
  const response = await axiosPrivate.patch(`/api/tours/${id}/`, data);
  return response.data;
}

export async function deleteTour(id) {
  const response = await axiosPrivate.delete(`/api/tours/${id}/`);
  return response.data;
}

// Ticket
export async function getTickets(link) {
  const response = link ? await axiosPrivate.get(link) : await axiosPrivate.get(`/api/tickets/`);
  return response.data;
}

export async function getTicket(id) {
  const response = await axiosPrivate.get(`/api/tickets/${id}/`);
  return response.data;
}

export async function addTicket(data) {
  const response = await axiosPrivate.post("/api/tickets/", data);
  return response.data;
}

export async function updateTicket(id, data) {
  const response = await axiosPrivate.patch(`/api/tickets/${id}/`, data);
  return response.data;
}

export async function deleteTicket(id) {
  const response = await axiosPrivate.delete(`/api/tickets/${id}/`);
  return response.data;
}
