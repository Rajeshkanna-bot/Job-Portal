


import { useState } from "react";
import "./index.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name:""
  });

  const navigate=useNavigate()
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

            const res = await axios.post("http://localhost:5000/api/auth/register",formData)


            alert("Signup Successful")

            navigate("/login")

        } catch (error) {
            alert(error.response?.data?.message || "signup failed")
        }

    }



  return (
    <div className="page-container">
      <div className="form-container">

        <h2 className="title">Signup</h2>

        <form onSubmit={handleLogin} className="login-form">

 <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />
 
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
            <button type="submit" className="signup-btn">
              Sign Up
            </button>

            {/* <button type="submit" className="login-btn">
              Login
            </button> */}
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;