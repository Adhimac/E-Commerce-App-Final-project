import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // track email verification status
  const [otpVerified, setOtpVerified] = useState(false); // track otp verification status
  const [message, setMessage] = useState(""); // success/error messages
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Send OTP

const handleEmailSubmit = async (e) => {
  e.preventDefault();
  const data = { email };

  try {
    const response = await axios.post("http://localhost:4000/otp", data);
    console.log("response", response.data);
    setIsOtpSent(true);
    setMessage("OTP sent to your email ");
  } catch (error) {
    console.log("Error:", error);
    setMessage(error.response?.data?.message || "Failed to send OTP ");
  }
};

const handleOtpSubmit = async (e) => {
  e.preventDefault();
  const data = { email, code: otp };

  try {
    const response = await axios.post(`http://localhost:4000/code/${email}`, data);
    console.log("OTP Check:", response.data);
    setMessage("OTP verified successfully 🎉");
    setOtpVerified(true);
  } catch (error) {
    console.log("Error:", error);
    setMessage(error.response?.data?.message || "Invalid OTP ");
  }
};

const handlePasswordReset = async (e) => {
  e.preventDefault();
  const data = { email, newPassword, confirmPassword };

  try {
    const response = await axios.post(`http://localhost:4000/password/${email}`, data);
    console.log("Password Reset:", response.data);
    setMessage("Password reset successful 🎉");
    navigate("/login");
  } catch (error) {
    console.log("Error:", error);
    setMessage(error.response?.data?.message || "Failed to reset password ❌");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-gray-800 to-blue-400 p-6">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Heading */}
        <h3 className="text-2xl font-bold text-center text-yellow-400 mb-6 tracking-wide">
          Reset Password
        </h3>

        {/* Success/Error message */}
        {message && (
          <p className="text-center text-sm mb-4 text-yellow-300">{message}</p>
        )}

        {/* Step 1: Send OTP */}
        {!isOtpSent ? (
          <form className="space-y-5" onSubmit={handleEmailSubmit}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                         transition"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-lg 
                         bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900
                         hover:from-yellow-500 hover:to-yellow-600 
                         shadow-lg hover:shadow-yellow-500/30
                         transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Send OTP
            </button>
          </form>
        ) : !otpVerified ? (
          // Step 2: Verify OTP
          <form className="space-y-5" onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                         transition"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-lg 
                         bg-gradient-to-r from-green-400 to-green-500 text-gray-900
                         hover:from-green-500 hover:to-green-600 
                         shadow-lg hover:shadow-green-500/30
                         transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          // Step 3: Reset Password
          <form className="space-y-5" onSubmit={handlePasswordReset}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                         transition"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                         transition"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-lg 
                         bg-gradient-to-r from-blue-400 to-blue-500 text-gray-900
                         hover:from-blue-500 hover:to-blue-600 
                         shadow-lg hover:shadow-blue-500/30
                         transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
