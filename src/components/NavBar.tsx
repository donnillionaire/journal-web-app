import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { HiMenu, HiX } from "react-icons/hi"; // Mobile menu icons

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => setNav(!nav);

  // Logout Function
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-900 text-white h-[60px] w-full">
      <div className="flex justify-between items-center px-6 md:px-12 h-full">
        {/* Clickable Journal App Title */}
        <NavLink to="/calendar" className="text-xl font-bold cursor-pointer hover:text-gray-400 transition">
          Journal App
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/summaries" className="hover:text-gray-400 transition">Summaries</NavLink>
          <NavLink to="/contact" className="hover:text-gray-400 transition">Contact us</NavLink>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition">
            Logout <RxAvatar size={20} className="ml-2" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={handleNav} className="focus:outline-none">
            {nav ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-gray-900 transition-transform ${nav ? "translate-x-0" : "-translate-x-full"} duration-300`}>
        <div className="flex flex-col items-center gap-6 py-6">
          <NavLink to="/summaries" className="hover:text-gray-400 transition" onClick={() => setNav(false)}>Summaries</NavLink>
          <NavLink to="/contact" className="hover:text-gray-400 transition" onClick={() => setNav(false)}>Contact us</NavLink>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition">
            Logout <RxAvatar size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
