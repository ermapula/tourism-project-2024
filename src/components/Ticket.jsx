import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTour } from "../api/tour";
import { CalendarMonth } from "@mui/icons-material";

function formatDate(date) {
  return dayjs(date).format("DD MMMM, YYYY. HH:mm")
}

export default function Ticket({ticket}) {
  const [tour, setTour] = useState(null)

  useEffect(() => {
    getTour(ticket.tour)
      .then(res => {
        setTour(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Card
      sx={{
        background: "rgba(170,241,255, 0.5)",
        borderRadius: 2,
        padding: 2
      }}
    >
      <Typography
        variant="body"
      >
        Ticket number № {ticket.id}
      </Typography>
      <Typography
        variant="body"
        ml={3}
        sx={{color: "rgb(100, 100, 100)"}}
      >
        {formatDate(ticket.purchase_date)}
      </Typography>
      <Divider sx={{marginTop: 2, marginBottom: 2}}/> 
      <Stack
        direction="row"
        gap={4}
        m={3}
      >
        <Box
          component="img"
          src={tour ? tour.photo : ""}
          alt={`Tour image`}
          sx={{width: "10rem", borderRadius: 2 }}
        />
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {tour ? tour.title : ""}
          </Typography>
          <Typography
            variant="h6"
          > 
          <CalendarMonth fontSize="1rem" sx={{marginRight: "0.5rem"}} />
            Starts at: {tour ? formatDate(tour.start_date) : ""}
          </Typography>
          <Typography
            variant="h6"
          >
          <CalendarMonth fontSize="1rem" sx={{marginRight: "0.5rem"}} />
            Ends at: {tour ? formatDate(tour.end_date) : ""}
          </Typography>
          
          <Typography
            component={Link}
            to={`/tours/${ticket.tour}`}
          >
            Tour page 
          </Typography>
        </Box>
        
      </Stack>
      <Divider sx={{marginTop: 2, marginBottom: 2}}/> 
      <Typography
        variant="p"
        sx={{placeSelf: "start"}}
      >
        Price: &#8376;{tour ? tour.price : ""}
      </Typography>
    </Card>
  ) 
}