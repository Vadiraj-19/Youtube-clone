import { FiMenu } from "react-icons/fi";
import { BsMicFill } from "react-icons/bs";
import { MdVideoCall} from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import github from "../images/github.png"
import logo from "../images/logo.webp";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ onHamburgerClick, searchTerm, setSearchTerm }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleVideoClick = async () => {
  if (!user) {
    alert("Please sign in to access your channel.");
    return navigate("/login");
  }

  try {
    const res = await axios.get("http://localhost:8080/api/channels/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const channel = res.data;

    if (!channel || !channel._id) {
      alert("No channel found. Redirecting to create channel.");
      return navigate("/create-channel");
    }

    navigate(`/channel/${channel._id}`);
  } catch (err) {
    console.error("❌ Error fetching channel:", err.response?.data || err.message);
    if (err.response?.status === 404) {
      alert("No channel found. Redirecting to create one.");
      navigate("/create-channel");
    } else {
      alert("An error occurred. Try again.");
    }
  }
};


  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between px-4 py-4 bg-black text-white shadow-sm">
      {/* Left - Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <button onClick={onHamburgerClick} className="sm:block">
          <FiMenu className="text-2xl cursor-pointer" />
        </button>

        <Link to="/" className="flex items-center gap-1">
          <span className="w-32 h-10">
            <img
              src={logo}
              alt="YouTube"
              className="h-full w-full object-cover object-center"
            />
          </span>
          <span className="text-sm font-medium -ml-1">
            <sup>IN</sup>
          </span>
        </Link>
      </div>

      {/* Middle - Search Bar */}
      <div className="flex items-center justify-center w-full max-w-[500px]">
        {/* Full Search Bar - only on sm and above */}
        <div className="hidden sm:flex items-center w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-[#121212] border border-gray-800 rounded-l-full outline-none text-base"
          />
          <button className="bg-[#3F3F3F] px-6 py-2 rounded-r-full border border-gray-800">
            <IoMdSearch className="text-2xl" />
          </button>
          <div className="ml-3 p-2 text-xl bg-[#3F3F3F] rounded-full cursor-pointer">
            <BsMicFill />
          </div>
        </div>

        {/* Only Search Icon - visible on small screens */}
        <button className="sm:hidden p-2 bg-[#3F3F3F] rounded-full">
          <IoMdSearch className="text-xl" />
        </button>
      </div>

      {/* Right - Hidden on small screens */}
      <div className="hidden sm:flex items-center gap-8">
        <p className="flex">
          <span>Channel</span>
          <MdVideoCall
          className="text-3xl cursor-pointer"
          onClick={handleVideoClick} 
        />

        </p>
        
        <Link to="https://github.com/Vadiraj-19/Youtube-clone" ><img src ={github} className="bg-white w-10 h-10 rounded-full object-cover object-center"/></Link>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span>Hi, {user.username}</span>
              <img
                src={user.avatar}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-blue-300 p-2 border-2 border-blue-300 rounded-xl"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
