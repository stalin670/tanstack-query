import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("done submit");
    const res = await login(email, password);
    if (res.status === 200) navigate("/");
    else alert("Something went wrong");
  };
  return (
    <>
      <div className="main-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Type your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            Not have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
