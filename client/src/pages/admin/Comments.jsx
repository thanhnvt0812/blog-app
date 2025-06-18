/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("All");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className=" flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="relative w-fit">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="shadow-custom-sm border rounded-full px-4 py-1 text-xs text-primary cursor-pointer appearance-none pr-8"
          >
            <option value="All">All Comments</option>
            <option value="Approved">Approved</option>
            <option value="Not Approved">Not Approved</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400 text-xs">
            ▼
          </div>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className=" text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comments
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "All") return true; // ✅ Hiển thị tất cả
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
