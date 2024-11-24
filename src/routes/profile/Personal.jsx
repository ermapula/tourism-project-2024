import { Avatar, Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Personal(params) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev,
      [name]: value 
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };
  return (
    <>
      <h1>Personal Info</h1>
      <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        gap: 2,
      }}
    >
       <Stack
        direction="row"
        alignItems="center"
        gap={5}
      >
        <Avatar
          src={profilePicture}
          alt="Profile"
          sx={{ width: 80, height: 80 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ textTransform: "none" }}
        >
          Upload Profile Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleProfilePictureChange}
          />
        </Button>
      </Stack>
      <TextField
        label="First name"
        name="fname"
        value={formData.fname}
        onChange={handleChange}
      />
      <TextField
        label="Last name"
        name="lname"
        value={formData.lname}
        onChange={handleChange}
      />      
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ alignSelf: "start", mt: 2 }}
      >
        Save Data
      </Button>
    </Stack>
    </>
  )
}
