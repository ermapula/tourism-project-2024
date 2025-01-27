import { Box, Button, Card, CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { orderTicket } from "../api/ticket";
import { getTour } from "../api/tour";

export default function Order(params) {
  const [loading, setLoading] = useState(false)
  const [loadingTour, setLoadingTour] = useState(false)
  const { user } = useContext(AuthContext);
  const [tour, setTour] = useState(null)
  
  const nav = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    setLoadingTour(true)
    getTour(id)
      .then(res => {
        setTour(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoadingTour(false)
      })
  }, [])
  useEffect(() => {
    document.title = "Order a ticket";
  }, [])
  
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    orderTicket(id)
      .then(res => {
        nav('/profile')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit}
      
        gap={2}
        sx={{
          p: 4,
          width: "40rem",
          pl: 20
        }} 
      >
        <Box>
          <h3>Order details</h3>
          <Card
            variant="outlined"
            sx={{p: 2}}
          >
            <Stack
              direction="row"
              gap={2}
            >
              <Typography flex={1}>Tour name</Typography>
              <Typography width={100}>Price</Typography>
            </Stack>
            <Divider sx={{marginTop: 2, marginBottom: 2}} />
            {
              loadingTour ?
              <CircularProgress />
              :
              tour &&
              <Stack
                direction="row"
                gap={2}
                alignItems="center"
              >
                {/* <Box component="img" src={tour.photo} alt="Tour image" height={100} /> */}
                <Typography flex={1}>{tour.title}</Typography>
                <Typography width={100}>&#8376;{tour.price}</Typography>
                
              </Stack>
            }
            
          </Card>
        </Box>
        <TextField
          label="For:"
          value={user ? `${user.firstName} ${user.lastName}` : ""}
          slotProps={{input: {readOnly: true}}}
        />
        <Stack direction="row" gap={2}>
          <Button variant="contained" type="submit">
            {
              loading ?
              <CircularProgress size="1rem" sx={{color: "white", p: "0 1.7rem"}} />
              : 
              "Confirm"
            }
          </Button>
          <Button variant="outlined" component={Link} to={`/tours/${id}`}>Cancel</Button>
        </Stack>
      </Stack>
    </>
  ) 
}
