import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use navigate hook

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/weather"); // Redirect to the weather page after successful login
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
