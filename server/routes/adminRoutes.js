import express from "express";
import {
  adminLogin,
  deleteCommentById,
  getAllBlogsForAdmin,
  getAllComments,
  getDashboard,
  toggleComment,
} from "../controller/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsForAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/toggle-comment", auth, toggleComment);
adminRouter.post("/dashboard", auth, getDashboard);
export default adminRouter;
