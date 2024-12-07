import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validate } from "./util";
// import axios from "axios";

export default function Login(props) {
  useEffect(() => {
    document.title = "Sign in";
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(formData, setError)) {
      return;
    }

    const data = {
      username: formData.email,
      password: formData.password
    }
    
    // axios.post('', data)
    //   .then(res => {
        
    //     setFormData({
    //       email: '',
    //       password: '',
    //     })
    //     setError({
    //       email: '',
    //       password: '',
    //     })
    
    //     navigate('/')
    //   })
    //   .catch(err => {
    //     console.log(err.response)
    //   })
    console.log(data)
    localStorage.setItem("logged", 1)
    nav('/')
  }

  

  return (
    <>
      <div className="content">
        <div className="wrapper">
          <p className="form-title">Log In to WebSite</p>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              { error.email && <div className="error-msg">{error.email}</div> }
              <input 
                id="email" 
                type="text"
                className="form-field" 
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                />
            </div>
            <div>
              { error.password && <div className="error-msg">{error.password}</div> }
              <input 
                id="password"
                type="password"
                className="form-field" 
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn-submit" type="submit">
              Log In
            </button>
          </form>
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
