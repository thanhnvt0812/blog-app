import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/JustBlog`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
