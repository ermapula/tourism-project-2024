import { Avatar, Box, Button, Stack, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateProfile } from "../../api/auth";

export default function Personal(params) {
  useEffect(() => {
    document.title = "Profile"
  }, [])

  const { data } = useOutletContext();
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone: "",
  });
  useEffect(() => {
    setFormData(data);
  }, [data]);


  const [profilePicture, setProfilePicture] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev,
      [name]: value 
    }));
  }

  function handleProfilePictureChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data:", formData);

    updateProfile(formData.id, formData)
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((err) => {
        console.log(err);
      })
  }


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
          name="frist_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />      
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          select
          name="gender"
          label="Gender"
          value={formData.gender || ""}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
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
