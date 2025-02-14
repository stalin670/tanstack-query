import React from "react";
import "../style/Login.css";

const Login = () => {
  return (
    <>
      <div className="main-container">
        <h1>Login</h1>
        <form className="form-container">
          <label>Email</label>
          <input type="email" placeholder="Type your email" />
          <label>Password</label>
          <input type="password" placeholder="Type your password" />
          <button>Login</button>
          <p>Not having an account Signup</p>
        </form>
      </div>
    </>
  );
};
export default Login;
