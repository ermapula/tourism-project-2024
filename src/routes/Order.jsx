import { Box, Button, Card, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Order(params) {
  const nav = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const price = 123;
  
  function handleNumChange(e) {
    let num = e.target.value;
    if(num === "" || (num <= 10 && num > 0)) {
      setQuantity(num);
    } else if (num < 1) {
      setQuantity(1);
    } else if (num > 10){
      setQuantity(10)
    }
  }
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
          width: "80%"
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
              <Typography width={100}>Quantity</Typography>
            </Stack>
            <Divider sx={{marginTop: 2, marginBottom: 2}} />
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
            >
              <Box component="img" src="../tours/charyn.jpg" height={100} />
              <Typography flex={1}>Tour </Typography>
              <Typography width={100}>&#8376;123</Typography>
              <Box
                component="input"
                type="number" 
                min="1" 
                max="10" 
                value={quantity} 
                onChange={handleNumChange} 
                sx={{
                  width: 100,
                  border: 0,
                  borderBottom: "1px solid #000",
                  outline: 0
                }}
              />
            </Stack>
            <Divider sx={{marginTop: 2, marginBottom: 2}} />
            <Box>
              <Typography variant="body">Total price</Typography>
              <Typography width={100} sx={{float: "right"}}>&#8376;{quantity * price}</Typography>
            </Box>
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
          <TextField
            label="Additional Information"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <Button variant="contained" type="submit">Confirm</Button>
          <Button variant="outlined" component={Link} to={`/tours/${id}`}>Cancel</Button>
        </Stack>
      </Stack>
    </>
  ) 
}
