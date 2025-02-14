import React from "react";
import { useAuth } from "../context/AuthContext";
import "../style/Home.css";

const Home = () => {
  const { user, logout } = useAuth();
  return (
    <div className="home-container">
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Home;
