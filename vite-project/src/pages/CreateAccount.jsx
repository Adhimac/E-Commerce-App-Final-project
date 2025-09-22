import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const CreateAccount = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // send data to backend
    });

    const result = await response.json();
    if(response.ok){
      navigate('/')
    }
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/e-commerce-1920-x-1080-wallpaper-17ejuy323xwuobqd.jpg')", // shopping background
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Glassy Card */}
      <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2 drop-shadow-md">
         Mac Store
        </h2>
        <p className="text-center text-gray-100 mb-6">
          Create your account and start shopping
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border border-white/40 rounded-xl px-3 bg-white/10">
            <User className="text-gray-200" size={20} />
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="w-full px-3 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl"
              onChange={e => setName(e.target.value)
              }
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-white/40 rounded-xl px-3 bg-white/10">
            <Mail className="text-gray-200" size={20} />
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="w-full px-3 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl"
              onChange={e=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-white/40 rounded-xl px-3 bg-white/10">
            <Lock className="text-gray-200" size={20} />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="w-full px-3 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl"
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg">
            Create Account
          </button>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-200 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
