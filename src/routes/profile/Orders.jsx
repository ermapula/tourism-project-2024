import { CircularProgress, Stack } from "@mui/material";
import Ticket from "../../components/Ticket";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { getTickets } from "../../api/admin";

export default function Orders(params) {
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext);
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    document.title = "My orders"
  }, [])

  useEffect(() => {
    if(user) {
      setLoading(true)
      getTickets()
        .then(res => {
          setTickets(res.results)
        })  
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])
  return (
    <>
    {
      loading ?
      <CircularProgress />
      :
      tickets.length !== 0 ?
      <>
        <h1>My orders</h1>
        <Stack gap={1}>
          {
            tickets.map(ticket => (
              <Ticket ticket={ticket} key={`ticket-${ticket.id}`} />
            ))
          }
        </Stack>
      </>
      :
      <h1>You have no tickets</h1>

    }
    </>
  ) 
}
