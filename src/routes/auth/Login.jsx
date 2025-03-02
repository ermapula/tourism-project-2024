import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { validate } from "./util";
import styled from "@emotion/styled";
import { Button, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import { login } from "../../api/auth";
import { ArrowBack } from "@mui/icons-material";
import { AuthContext } from "./AuthContext";

const Field = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    border: "none",
    borderRadius: "16px",
    backgroundColor: "white",
  }
})

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Log in";
  }, [])
  useEffect(() => {
    if(user){
      nav('/')
    }
  })
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
    setLoading(true)
    if (!validate(formData, setError)) {
      setLoading(false)
      return;
    }

    const cred = {
      email: formData.email,
      password: formData.password
    }
    
    login(cred)
      .then((data) => {
        console.log(data)
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setUser({
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          role: data.role,
        })
        setFormData({
          email: '',
          password: '',
        })
        setError({
          email: '',
          password: '',
        })
        if(data.role == 'admin' || data.role == 'manager'){
          nav('/admin')
        } else {
          nav('/')
        }
      })
      .catch((err) => {
        console.log(err)
        if(err.response.data.detail == "No active account found with the given credentials"){
          setFormData(prev => ({
            ...prev,
            password: '',
          }))
          setError({
            email: 'Invalid credentials',
            password: 'Invalid credentials',
          })
        }
      })
      .finally(() => {
        setLoading(false)
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
              {
                loading ?
                <CircularProgress sx={{color: "white", padding: "8px"}} />
                : 
                "Log in"
              }
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
