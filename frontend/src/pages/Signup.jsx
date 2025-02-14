import React from "react";
import "../style/Signup.css";

const Signup = () => {
  return (
    <>
      <div className="main-container">
        <h1>Signup</h1>
        <form className="form-container">
          <label>Name</label>
          <input type="text" placeholder="Type your name" />
          <label>Email</label>
          <input type="email" placeholder="Type your email" />
          <label>Password</label>
          <input type="password" placeholder="Type your password" />
          <button>signup</button>
          <p>already have an account Login</p>
        </form>
      </div>
    </>
  );
};

export default Signup;
