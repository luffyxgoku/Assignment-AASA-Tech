import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username,
        password,
      });
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
