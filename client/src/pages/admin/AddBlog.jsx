/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import assets, { blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  const generateContent = () => {
    // Function to generate content using AI
    // This is a placeholder function, you can implement actual AI content generation logic here
    console.log("Generating content with AI...");
  };

  useEffect(() => {
    //initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
      onSubmit={onSubmitHandler}
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            name=""
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Enter Blog Title"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Enter Blog Sub Title"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          required
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <p className="mt-4">Blog Content</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef} className="h-full"></div>
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {blogCategories.slice(1).map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
