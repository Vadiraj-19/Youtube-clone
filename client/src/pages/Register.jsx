import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../images/loginimage.png"

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <section className="w-full flex justify-center items-center h-screen px-4 lg:w-[81%] bg-gray-900">
      <div className="flex w-full max-w-4xl p-6 mx-auto bg-white shadow-lg rounded-xl">
        
        {/* Image Section */}
        <div className="hidden md:w-1/2 md:flex justify-center mb-6 md:mb-0">
          <img 
            src={loginImage} 
            alt="Register illustration" 
            className="w-full max-w-[400px] h-auto"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleRegister} className="w-full md:w-1/2 flex flex-col gap-6 px-6 py-4">
          <div className="self-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Register</h1>
            <p className="text-gray-500">Create an account to get started</p>
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Register Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4 text-gray-600 text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
