import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center h-16 px-6 bg-indigo-600 shadow-md">
        {/* Logo */}
        <div className="text-white font-black text-xl">:)</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white font-bold">
          <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/")}>Home</li>
          <li className="cursor-pointer hover:text-blue-600">About Us</li>
          <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/products")}>Products</li>
          <li className="cursor-pointer hover:text-blue-600">Contact</li>

          {/* Search */}
          <div className="relative w-48">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </ul>

        {/* Profile Menu */}
        <div className="relative hidden md:block">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <User className="text-white hover:text-blue-600" size={26} />
            <span className="font-medium text-white hover:text-blue-600 hidden lg:block">
              Profile
            </span>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl border animate-fadeIn z-50">
              <ul className="flex flex-col py-2">
                {token ? (
                  <li
                    className="px-4 py-2 hover:bg-red-50 hover:text-red-600 cursor-pointer rounded-xl"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                ) : (
                  <>
                    <li
                      className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer rounded-t-xl"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer rounded-b-xl"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t p-4 md:hidden">
            <ul className="flex flex-col gap-4 p-6 text-black font-semibold">
              <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/")}>Home</li>
              <li className="cursor-pointer hover:text-blue-600">About Us</li>
              <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/products")}>Products</li>
              <li className="cursor-pointer hover:text-blue-600">Contact</li>

              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
