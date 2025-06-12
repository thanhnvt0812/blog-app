import React from "react";
import { NavLink } from "react-router-dom";
import assets from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer text-blue-500 bg-blue-100 border-r-4"
            : "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer hover:bg-gray-100 "
        }
      >
        <img src={assets.home_icon} alt="" className="win-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/listBlog"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer text-blue-500 bg-blue-100 border-r-4"
            : "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer hover:bg-gray-100 "
        }
      >
        <img src={assets.list_icon} alt="" className="win-w-4 w-5" />
        <p className="hidden md:inline-block">List Blog</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/addBlog"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer text-blue-500 bg-blue-100 border-r-4"
            : "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer hover:bg-gray-100 "
        }
      >
        <img src={assets.add_icon} alt="" className="win-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/comments"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer text-blue-500 bg-blue-100 border-r-4"
            : "flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer hover:bg-gray-100 "
        }
      >
        <img src={assets.comment_icon} alt="" className="win-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
