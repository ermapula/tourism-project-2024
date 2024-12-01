import { Box, Button, Card, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Order(params) {
  const nav = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "Samat",
    phone: "87776543210",
    description: "",
  });
  
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  function handleSubmit(e) {
    formData.quantity = quantity;
    e.preventDefault();
    console.log("Form Data:", formData);
    nav('/profile')
  }
  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit}
      
        gap={2}
        sx={{
          p: 4,
          width: "50%",
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
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
            >
              <Box component="img" src="../tours/1.jpg" height={100} />
              <Typography flex={1}>Charyn Tour</Typography>
              <Typography width={100}>&#8376;8000</Typography>
              
            </Stack>
            
          </Card>
        </Box>
        <Stack gap={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />      
          {/* <TextField
            label="Additional Information"
            name="description"
            value={formData.description}
            onChange={handleChange}
          /> */}
        </Stack>
        <Stack direction="row" gap={2}>
          <Button variant="contained" type="submit">Confirm</Button>
          <Button variant="outlined" component={Link} to={`/tours/${id}`}>Cancel</Button>
        </Stack>
      </Stack>
    </>
  ) 
}
