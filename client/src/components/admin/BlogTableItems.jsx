/* eslint-disable no-unused-vars */
import React from "react";
import assets from "../../assets/assets";

const BlogTableItems = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-800" : "text-red-700"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          className={`border px-2 py-0.5 mt-1 rounded cursor-pointer text-white w-[100px] ${
            blog.isPublished ? " bg-red-700 " : "bg-green-800"
          }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          alt=""
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItems;
