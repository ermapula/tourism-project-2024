import { Stack } from "@mui/material";
import Ticket from "../../components/Ticket";

export default function Orders(params) {
  const ticket = {
    id: 0,
    date: "1.01.2024",
    tour: "Tour name",
    price: 123,
    quantity: 1,
    name: "Name",
    tour_id: 0
  }
  return (
    <>
      <h1>My orders</h1>
      <Stack gap={1}>
        <Ticket ticket={ticket} />
      </Stack>
    </>
  ) 
}
