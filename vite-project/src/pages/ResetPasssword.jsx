import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // track email verification status
  const [otpVerified, setOtpVerified] = useState(false) // track otp verification status 
 const [message, setMessage] = useState(""); // success/error messages
  // Step 1: Send email to get OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const data = { email };

    try {
      const response = await fetch("http://localhost:4000/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("response.ok",result);
      

      if (response.ok) {
        setIsOtpSent(true);
        setMessage("OTP sent to your email ✅");
      } else {
        setMessage(result.message || "Failed to send OTP ❌");
      }

      console.log("Success:", result);
    } catch (error) {
      console.log("Error:", error);
      setMessage("Something went wrong ❌");
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const data = { email, code:otp };

    try {
      const response = await fetch(`http://localhost:4000/code/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("OTP verified successfully 🎉");
        setOtpVerified(true)
        // here you can redirect user to reset password page
      } else {
        setMessage(result.message || "Invalid OTP ❌");
      }

      console.log("OTP Check:", result);
    } catch (error) {
      console.log("Error:", error);
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-gray-800 to-blue-400 p-6">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Heading */}
        <h3 className="text-2xl font-bold text-center text-yellow-400 mb-6 tracking-wide">
          Email Verification
        </h3>

        {/* Success/Error message */}
        {message && (
          <p className="text-center text-sm mb-4 text-yellow-300">{message}</p>
        )}

      
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
        ) : (
          /* OTP Form */
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
        )}
        
        
      </div>
    </div>
  );
};

export default ResetPassword;
