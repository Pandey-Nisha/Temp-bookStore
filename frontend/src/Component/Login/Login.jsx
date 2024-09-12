import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.data.success) {
        document.cookie = `token=${response.data.token}`;
        alert("Successfully logged in ");
        localStorage.setItem("userEmail", email);
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      alert ("Invalid");
      console.error(error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-input">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Login</button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            officiis.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
