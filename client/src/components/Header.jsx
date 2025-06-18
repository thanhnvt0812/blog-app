/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();
  const onSearchHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  const handleClear = () => {
    setInput("");
    inputRef.current.focus(); // Đặt lại focus vào ô input nếu muốn
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own blogging platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-3xl m-auto max-sm:text-xl text-gray-500">
          This is your limitless hub where ideas thrive, passions ignite, and
          every topic under the sun finds its voice. Whether it's one word or a
          thousand, your story starts here.
        </p>
        <form
          onSubmit={onSearchHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden px-1 py-3 m-3.5"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-4 outline-none"
            type="text"
            placeholder="Search for blogs"
            required
          />

          {/* Hiển thị dấu X nếu có nội dung */}
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-red-500 px-2 text-xl flex items-center"
            >
              ×
            </button>
          )}

          {/* <button
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
            type="submit"
          >
            Search
          </button> */}
        </form>
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
