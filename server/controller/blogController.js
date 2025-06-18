import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, author, isPublished } =
      JSON.parse(req.body.blog);
    const imageFile = req.file;

    //Check fields empty
    if (
      !title ||
      !description ||
      !category ||
      !author ||
      !imageFile ||
      !author
    ) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });
    //optimize image through ImageKit urls
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //auto compression
        { format: "webp" }, //convert modern format
        { width: "1280" }, //resize to 1280px width
      ],
    });
    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      author,
      isPublished,
    });
    res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }
    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.body;
    await Blog.findByIdAndDelete(blogId);
    //Delete all comments associated with the blog
    await Comment.deleteMany({ blog: blogId });
    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: "Blog status updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const content = await main(
      `${prompt}. Generate a blog content for this topic in 1000 words in simple text format.`
    );

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
