import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validate } from "./util";
import styled from "@emotion/styled";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { login } from "../../api/auth";
import { ArrowBack } from "@mui/icons-material";

const Field = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    border: "none",
    borderRadius: "16px",
    backgroundColor: "white",
  }
})

export default function Login(props) {
  useEffect(() => {
    document.title = "Log in";
  }, [])
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate(formData, setError)) {
      return;
    }

    const cred = {
      email: formData.email,
      password: formData.password
    }
    
    login(cred)
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        
        setFormData({
          email: '',
          password: '',
        })
        setError({
          email: '',
          password: '',
        })
        nav('/')
      })
      .catch((err) => {
        console.log(err)
        setFormData(prev => ({
          ...prev,
          password: '',
        }))
        setError({
          email: 'Invalid credentials',
          password: 'Invalid credentials',
        })
      })
    
  }

  

  return (
    <>
      <div className="content">
        <div className="wrapper">
          <IconButton sx={{position: "absolute", left: 20, top: 20}} component={Link} to="/">
            <ArrowBack />
          </IconButton>
          <p className="form-title">Log In to WebSite</p>
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
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={!!error.password}
              helperText={error.password}
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
              Log In
            </Button>
          </Stack>
          <p className="redirect">
            Don&#39;t have an account?
            <span style={{marginLeft: "6px"}}>
              <Link to='/register' className="link">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
