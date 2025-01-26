import axiosPrivate from "./initPrivate";

export async function orderTicket(id) {
  const response = await axiosPrivate.post(`/api/tickets/`, {tour: id});
  return response.data;
}
