import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [channelLoading, setChannelLoading] = useState(true); // optional but helpful

  useEffect(() => {
    const fetchChannelName = async () => {
      try {
        const token = localStorage.getItem("token");

        // Make sure both token and user are valid before calling the endpoint
        if (!token || !user?._id) {
          setChannelName(""); // fallback
          return;
        }

        const res = await api.get("/api/channels/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChannelName(res.data.channelName || "");
      } catch (err) {
        console.error("Failed to fetch channel name:", err.response?.data || err.message);
        setChannelName(""); // fallback
      } finally {
        setChannelLoading(false); // done loading
      }
    };

    fetchChannelName();
  }, [user]);

  const register = async (username, email, password) => {
    try {
      const res = await api.post("/api/users/register", { username, email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userRes = await api.get("/api/users/me");
      setUser(userRes.data);
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/users/login", { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userRes = await api.get("/api/users/me");
      setUser(userRes.data);
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setChannelName("");
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await api.get("/api/users/me");
      setUser(res.data);
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, channelName, channelLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
