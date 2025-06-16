import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
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
