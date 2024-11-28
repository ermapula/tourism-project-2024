import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Ticket({ticket}) {
  return (
    <Card
      sx={{
        backgroundColor: "#E8EBFF",
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
        {ticket.date}
      </Typography>
      <Divider sx={{marginTop: 2, marginBottom: 2}}/> 
      <Stack
        direction="row"
        gap={4}
        m={3}
      >
        <Box
          component="img"
          src="../tours/charyn.jpg"
          sx={{width: "150px", borderRadius: 2 }}
        />
        <Box>
          <Typography
            variant="h5"
          >
            Tour: {ticket.tour}
          </Typography>
          <Typography
            variant="h5"
          >
            For: {ticket.name}
          </Typography>
          <Typography
            component={Link}
            to={`/tours/${ticket.tour_id}`}
          >
            Tour page 
          </Typography>
        </Box>
        <Typography
          variant="body"
          
          sx={{marginLeft: "auto"}}
          
        >
          Tickets x{ticket.quantity}
        </Typography>
      </Stack>
      <Divider sx={{marginTop: 2, marginBottom: 2}}/> 
      <Typography
        variant="h6"
        sx={{placeSelf: "end"}}
      >
        Total price: &#8376;{ticket.price}
      </Typography>
    </Card>
  ) 
}