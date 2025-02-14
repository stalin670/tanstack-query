import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../style/Login.css";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
