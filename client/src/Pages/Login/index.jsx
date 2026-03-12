


import { useState } from "react";
import "./login.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate=useNavigate()

  function signup(){
      navigate("/register")
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

 
  
    

    const handleLogin = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post("http://localhost:5000/api/auth/login",formData)
             
            if(!res.data?.token){
                alert("Signup failed")
            }

            localStorage.setItem("token", res.data.token)

            alert("Login Successful")

            navigate("/jobs")

        } catch (error) {
            alert(error.response?.data?.message || "Login failed")
        }

    }



  return (
    <div className="page-container">
      <div className="form-container">

        <h2 className="title">Login</h2>

        <form onSubmit={handleLogin} className="login-form">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="button-group">
            <button type="button" className="signup-btn" onClick={signup}>
              Sign Up
            </button>

            <button type="submit" className="login-btn">
              Login
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;