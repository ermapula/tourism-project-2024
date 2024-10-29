import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "./util";
// import axios from 'axios';

export default function Register(props) {
  // const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  
  const [error, setError] = useState({
    email: '',
    password: '',
    password2: '',
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
      email: formData.email,
      password: formData.password,
    }

    // axios.post('', data)
    //   .then(res => {
    //     navigate('/login')
        
    //     setFormData({
    //       email: '',
    //       password: '',
    //       password2: '',
    //     })
        
    //     setError({
    //       email: '',
    //       password: '',
    //       password2: '',
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err.response)
    //   })
    console.log(data)
  }


  return (
    <>
      <div className="content">
        <div className="wrapper">
          <p className="form-title">Sign Up to WebSite</p>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              { error.email && <span className="error-msg">{error.email}</span> }
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
              { error.password && <span className="error-msg">{error.password}</span> }
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
            <div>
              { error.password2 && <span className="error-msg">{error.password2}</span> }
              <input 
                id="password2"
                type="password"
                className="form-field" 
                name="password2"
                placeholder="Confirm password"
                value={formData.password2}
                onChange={handleChange}
              />
            </div>
            <button className="btn-submit">
              Sign Up
            </button>
          </form>
          <p className="redirect">
            Already have an account?
            <span style={{marginLeft: "6px"}}>
              <Link to='/login' className="link">
                Log In
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}