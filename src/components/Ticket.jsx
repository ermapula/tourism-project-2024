import { Box, Divider, Stack, Typography } from "@mui/material";

export default function Ticket({ticket}) {
  return (
    <Box
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
        ></Box>
        <Typography
          variant="h5"
        >
          Tour: {ticket.tour}
        </Typography>
        <Typography
          variant="body"
          
          sx={{marginLeft: "auto"}}
          
        >
          Tour: {ticket.tour}
        </Typography>
      </Stack>
      <Divider sx={{marginTop: 2, marginBottom: 2}}/> 
      <Typography
        variant="h6"
        sx={{placeSelf: "end"}}
      >
        Total price: {ticket.price}
      </Typography>
    </Box>
  ) 
}