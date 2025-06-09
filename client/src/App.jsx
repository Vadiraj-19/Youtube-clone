// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPage from "./pages/VideoPage";
import ChannelPage from "./pages/ChannelPage";
import CreateChannel from "./components/CreateChannel";
import EditVideo from "./components/EditVideo"; 
function App() {
  return (
    <Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/video/:id" element={<VideoPage />} />
    <Route path="/channel/:id" element={<ChannelPage />} />
    <Route path="/create-channel" element={<CreateChannel />} />
    <Route path="/edit/:id" element={<EditVideo />} />
  </Route>

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="*" element={<div className="text-white p-4">404 - Page Not Found</div>} />
</Routes>

  );
}

export default App;