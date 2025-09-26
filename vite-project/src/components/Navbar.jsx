import React from "react";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function  Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
  
    return(
        <>
  <div className="flex justify-between items-center h-16 px-6 bg-yellow-200 shadow-md">
      {/* Left - Logo */}
      <div className="text-black font-black text-xl">:)</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 text-black font-bold">
        <li className="cursor-pointer hover:text-blue-600 transition" onClick={()=>navigate('/')}>Home</li>
        <li className="cursor-pointer hover:text-blue-600 transition">About Us</li>

        {/* Search Box */}
        
        <li className="cursor-pointer hover:text-blue-600 transition" onClick={()=>navigate('/products')}>Products</li>
        <li className="cursor-pointer hover:text-blue-600 transition">Contact</li>

        <div className="relative w-48">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          />
        
        </div>

      </ul>

      {/* Right - Profile Icon */}
   <div className="relative hidden md:block">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <User className="text-gray-700 hover:text-blue-600 transition" size={26} />
        <span className="font-medium text-gray-700 hover:text-blue-600 hidden lg:block">
          Profile
        </span>
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl border border-gray-100 animate-fadeIn z-50">
          <ul className="flex flex-col py-2">
            <li
              className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer rounded-t-xl transition"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer rounded-b-xl transition"
              onClick={() => navigate("/signup")}
            >
              Signup
            </li>
          </ul>
        </div>
      )}
    </div>


      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 md:hidden p-4">
          <ul className="flex flex-col gap-4 p-6 text-black font-semibold">
            <li className="cursor-pointer hover:text-blue-600 transition">Home</li>
            <li className="cursor-pointer hover:text-blue-600 transition">About Us</li>

            {/* Search inside mobile menu */}
          

            <li className="cursor-pointer hover:text-blue-600 transition">Products</li>
            <li className="cursor-pointer hover:text-blue-600 transition">Contact</li>
              <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              />
            
            </div>
           
          </ul>
        </div>
      )}
    </div>
        
        
        </>
    )
}

export default Navbar