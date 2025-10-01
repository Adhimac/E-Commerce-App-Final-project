import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = { email, password };

   try {
  const response = await axios.post("http://localhost:4000/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    localStorage.setItem("token", response.data.data);
    navigate("/");
  }
} catch (error) {
  if (error.response) {
    alert(error.response.data.message || "Login failed");
  } else {
    alert("Something went wrong. Please try again.");
  }
};}

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5625040/pexels-photo-5625040.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-2 drop-shadow-md">
          MaC Store
        </h1>
        <p className="text-center text-gray-100 mb-6">Login to continue shopping</p>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-center text-red-500 font-semibold bg-red-100/20 p-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-white/40 rounded-xl px-3 bg-white/10">
            <Mail className="text-gray-200" size={20} />
            <input
              type="text"
              value={email}
              placeholder="Email"
              className="w-full px-3 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-white/40 rounded-xl px-3 bg-white/10">
            <Lock className="text-gray-200" size={20} />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="w-full px-3 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-yellow-400 text-gray-900 py-3 border-2 border-yellow-400 rounded-xl font-bold 
                         hover:bg-transparent hover:text-yellow-400 transition shadow-lg"
            >
              Login
            </button>

            <Link to="/signup" className="flex-1">
              <button
                type="button"
                className="w-full bg-transparent border-2 border-yellow-400 
                           text-yellow-400 py-3 rounded-xl font-bold 
                           hover:bg-yellow-400 hover:text-gray-900 
                           transition shadow-lg"
              >
                Create Account
              </button>
            </Link>
          </div>
        </form>

        <p className="text-center text-sm text-gray-200 mt-6">
          Forgot Password?{" "}
          <Link to="/reset" className="text-yellow-300 font-semibold hover:underline">
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
