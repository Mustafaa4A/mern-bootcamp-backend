import mongoose from "mongoose";

export const connectDB = (url) => {
  // connect db
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
};
