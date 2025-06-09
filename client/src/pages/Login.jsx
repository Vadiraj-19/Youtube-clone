import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import login1 from "../images/log.png"

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <section className="w-full flex justify-center items-center h-screen px-4 lg:w-[81%] bg-gray-900">
      <div className="flex w-full max-w-4xl p-6 mx-auto bg-white shadow-lg rounded-xl">
        
        {/* Image section */}
        <div className="hidden md:w-1/2 md:flex justify-center items-center">
          <img
            src={login1}
            alt="Sign In illustration"
            className="w-full max-w-[400px] h-auto"
          />
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="w-full md:w-1/2 flex flex-col gap-6 px-6 py-4">
          <div className="self-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Sign In to YouTube Clone</h1>
            <p className="text-gray-500">Welcome back! Please enter your credentials.</p>
          </div>

          {/* Email field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Sign In
            </button>
          </div>

          {/* Redirect to Register */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
