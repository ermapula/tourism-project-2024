import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validate } from "./util";
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { register } from "../../api/auth";
import { ArrowBack } from "@mui/icons-material";

const Field = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    border: "none",
    borderRadius: "16px",
    backgroundColor: "white",
  }
})

export default function Register(props) {
  useEffect(() => {
    document.title = "Sign up";
  }, [])
  const nav = useNavigate()

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    gender: '',
  });
  
  const [error, setError] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    gender: '',
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError(prev => ({
      ...prev,
      [name]: '',
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!validate(formData, setError)){
      return;
    }
    const data = {
      first_name: formData.fname,
      last_name: formData.lname,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      phone: formData.phone,
    }

    register(data)
      .then(res => {
        console.log("register:", res)
        setFormData({
          fname: '',
          lname: '',
          email: '',
          password: '',
          password2: '',
          phone: '',
          gender: '',
        })

        setError({
          fname: '',
          lname: '',
          email: '',
          password: '',
          password2: '',
          phone: '',
          gender: '',
        })

        nav('/login');
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <>
      <div className="content">
        <div className="wrapper">
          <IconButton sx={{position: "absolute", left: 20, top: 20}} component={Link} to="/">
            <ArrowBack />
          </IconButton>
          <p className="form-title">Sign Up to WebSite</p>
          <Stack 
            component="form" 
            direction="column"
            gap={2}
            onSubmit={handleSubmit}
          >
            <Field 
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={!!error.email}
              helperText={error.email}
              required
            />
            <Field 
              name="fname"
              label="First name"
              value={formData.fname}
              onChange={handleChange}
              error={!!error.fname}
              helperText={error.fname}
              required
            />
            <Field 
              name="lname"
              label="Last name"
              value={formData.lname}
              onChange={handleChange}
              error={!!error.lname}
              helperText={error.lname}
              required
            />
            <Field
              select
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Field>
            <Field 
              name="phone"
              label="Phone number"
              value={formData.phone}
              onChange={handleChange}
              error={!!error.phone}
              helperText={error.phone}
            />
            <Field 
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={!!error.password}
              helperText={error.password}
              required
            />
            <Field 
              type="password"
              name="password2"
              label="Confirm password"
              value={formData.password2}
              onChange={handleChange}
              error={!!error.password2}
              helperText={error.password2}
              required
            />
             
            <Button variant="contained" 
              type="submit"
              sx={{
                color: "white",
                bgcolor: "var(--color)",
                fontWeight: "bold",
                fontSize: "32px",
                borderRadius: "16px"
              }}
            >
              Sign Up
            </Button>
          </Stack>
          <p className="redirect">
            Already have an account?
            <span style={{marginLeft: "6px"}}>
              <Link to='/login' className="link">
                Log in
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}