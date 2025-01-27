import { Avatar, Box, Button, Stack, TextField, MenuItem, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateProfile } from "../../api/auth";

export default function Personal(params) {
  const {loading, setLoading} = useOutletContext()
  useEffect(() => {
    document.title = "Profile"
  }, [])

  const { data } = useOutletContext();
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
  });
  useEffect(() => {
    setLoading(true)
    setFormData(data);
    setLoading(false)
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
    setLoading(true)
    console.log("Form Data:", formData);
    const form = new FormData();
    form.append("first_name", formData.firstName)
    form.append("last_name", formData.lastName)
    form.append("email", formData.email)
    form.append("phone", formData.phone)
    form.append("gender", formData.gender)
    updateProfile(formData.id, form)
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
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
        {
          loading ? 
          <CircularProgress />
          :
          <>
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
              name="fristName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last name"
              name="lastName"
              value={formData.lastName}
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
              value={formData.phone || ""}
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
          </>
        }
        
      </Stack>
    </>
  )
}
