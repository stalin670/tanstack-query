import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/me");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await axiosInstance.post("/login", { email, password });
      const res = await axiosInstance.get("/me"); 
      setUser(res.data.user);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
      setUser(null);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
