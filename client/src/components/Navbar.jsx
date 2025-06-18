/* eslint-disable no-unused-vars */
import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300, cursor-pointer"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-3" alt="" />
      </button>
    </div>
  );
};

export default Navbar;
