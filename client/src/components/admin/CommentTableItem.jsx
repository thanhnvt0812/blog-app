/* eslint-disable no-unused-vars */
import React from "react";
import assets from "../../assets/assets";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  return (
    <tr className=" order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> :{blog.title} <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}{" "}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
        <br />
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {comment.isApproved ? (
            <p className="text-xs border border-green-600 bg-green-600 rounded-full px-3 text-white w-[90px] text-center">
              Approved
            </p>
          ) : (
            <p className="text-xs border border-red-600 bg-red-600 rounded-full px-3 text-white">
              Unapproved
            </p>
          )}
        </div>
      </td>
      <td className="px-6 py-4 ">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve"
            />
          ) : (
            <img
              src={assets.x_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          )}
          <img
            src={assets.bin_icon}
            alt=""
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
