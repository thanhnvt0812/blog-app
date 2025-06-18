/* eslint-disable no-unused-vars */
import React from "react";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();
  const toggleComment = async () => {
    try {
      const { data } = await axios.post(`/api/admin/toggle-comment`, {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirm) return;
      const { data } = await axios.post(`/api/admin/delete-comment`, {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
              onClick={toggleComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve"
            />
          ) : (
            <img
              onClick={toggleComment}
              src={assets.x_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          )}
          <img
            onClick={deleteComment}
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
