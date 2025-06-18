/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import assets, { blog_data } from "../../assets/assets";
import BlogTableItems from "../../components/admin/BlogTableItems";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <img src={assets.dashboard_icon_4} alt="" />
        <h1 className="text-3xl text-black">All Blogs</h1>
        <button
          onClick={() => navigate("/admin/addBlog")}
          className="ml-145 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          Add New Blogs
        </button>
      </div>
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow-md rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className=" text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItems
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  fetchBlogs={fetchBlogs}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
