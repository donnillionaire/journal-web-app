import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

import { FaCartShopping } from "react-icons/fa6";

import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineProject,
  AiOutlineMail,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { GoProjectRoadmap } from "react-icons/go";
import { FiPhone } from "react-icons/fi";

import { BsPerson } from "react-icons/bs";
import { MdOutlineMenu } from "react-icons/md";
import logo from "../assets/logo-ff-cropped-resized.png";
import eco_friendly from "../assets/imagesforwebsite/eco_friendly.png";
// import saudi_made from "../assets/imagesforwebsite/Saudi_Made_logo.svg.png";

import { Typography } from "@mui/material";

// import { styles } from "../styles";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  function handleNav() {
    setNav(!nav);
    console.log("set changed");
  }
  const handleNavigate_home = () => {
    navigate("/calendar");
  };

  return (
    <div>
      <MdOutlineMenu
        onClick={handleNav}
        size={50}
        color="black"
        className="relative top-4 left-4 z-[99] md:hidden"
      />
      {nav ? (
        //bg-[#00563B]
        // <div className="fixed w-[60] h-[40] bg-white/90 flex flex-col justify-center items-start z-10 space-y-4 ml-10">

        <div className="fixed w-[50] h-[40] bg-gray-900 flex flex-col justify-center items-start z-10 space-y-4 ml-10">
          {" "}
          {/* Changed items-center to items-start */}
          <NavLink
            onClick={handleNavigate_home}
            to="/"
            className="flex items-center w-64 p-4 transition-transform transform hover:scale-105 hover:bg-gray-00 rounded-lg shadow-md"
          >
            <AiOutlineHome size={20} color={"white"} />
            <span className="ml-4 text-white">Home</span>
          </NavLink>
          <NavLink
            onClick={handleNavigate_home}
            to="/about"
            className="flex items-center w-64 p-4 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md"
          >
            <AiOutlineHome size={20} color={"white"} />
            <span className="ml-4 text-white">About us</span>
          </NavLink>
          <NavLink
            onClick={handleNav}
            to="/contact"
            className="flex items-center w-64 p-4 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md"
          >
            <GoProjectRoadmap size={20} color={"white"} />
            <span className="ml-4 text-white">Contact us</span>
          </NavLink>
          <NavLink
            onClick={handleNav}
            to="/faq"
            className="flex items-center w-64 p-4 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md"
          >
            <BsPerson size={20} color={"white"} />
            <span className="ml-4 text-white">FAQ</span>
          </NavLink>
          {/* <NavLink
            onClick={handleNav}
            to="/service"
            className="flex items-center w-64 p-4 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md"
          >
            <AiOutlineMail size={20} color={"gray"} />
            <span className="ml-4 text-gray-600">Our Services</span>
          </NavLink> */}
          {/* <NavLink
            onClick={handleNav}
            to="/faq"
            className="flex items-center w-64 p-4 transition-transform transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md"
          >
            <AiOutlineProject size={20} color={"gray"} />
            <span className="ml-4 text-gray-600">FAQ</span>
          </NavLink> */}
        </div>
      ) : (
        ""
      )}

      <div className="md:block hidden relative z-10 bg-gray-900 text-white h-[60px] ">
        <div className="absolute ml-[100px] md:ml-[59px] lg:ml-[100px] mt-[30px]">
          <div onClick={handleNavigate_home}></div>
        </div>

        {/* Navigation bar container */}
        <div className="flex flex-row justify-between items-center ml-[50px] items-center  px-8 ">
          <div className="flex flex-row items-center">

          <h1 onClick={handleNavigate_home} className="text-xl font-bold mx-11 p-4">Journal App</h1>
            {/* <img
              src={logo}
              alt=""
              className="h-[50px] w-[50px] cursor-pointer"
              
            /> */}
            {/* <h1
              className="sm:text-xl lg:text-3xl md:text-3xl font-bold text-[#ffff] cursor-pointer ml-2"
              onClick={handleNavigate_home}
            >
              Fine Foods
            </h1> */}
          </div>

          {/* Centered navigation links */}
          <div className="flex flex-row justify-center items-center gap-8">

          {/* <h1 className="text-xl font-bold mx-15">Journal App</h1> */}
            {/* <img
              src={saudi_made}
              alt=""
              height={80}
              width={80}
              onClick={handleNavigate_home}
            />

            <img
              src={eco_friendly}
              alt=""
              height={80}
              width={80}
              onClick={handleNavigate_home}
            /> */}
            <NavLink
              to="/summaries"
              className="flex justify-center items-center m-2  cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <BsPerson size={20} color={"white"} />
              <span className="pl-4 text-white">Summaries</span>
            </NavLink>
            <NavLink
              to="/contact"
              className="flex justify-center items-center m-2  cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <GoProjectRoadmap size={20} color={"white"} />
              <span className="pl-4 text-white">Contact us</span>
            </NavLink>
            <NavLink
              to="/faq"
              className="flex justify-center items-center m-2  cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <GoProjectRoadmap size={20} color={"white"} />
              <span className="pl-4 text-white">FAQ</span>
            </NavLink>
          </div>

          {/* Optional right-aligned icons */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
