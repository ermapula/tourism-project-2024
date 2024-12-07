import { Stack } from "@mui/material";
import Ticket from "../../components/Ticket";
import { useEffect } from "react";

export default function Orders(params) {
  useEffect(() => {
    document.title = "My orders"
  }, [])
  const ticket = {
    id: 0,
    date: "2.12.2024",
    tour: "Charyn Tour",
    price: 8000,
    name: "Samat",
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
