// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";

import express from "express";
import { connectDB } from "./config/db.js";

//routes
import userRoute from "./features/users/route.js";
import locationRoute from "./features/locations/route.js";
import libraryRoute from "./features/libraries/route.js";
import cabinetRoute from "./features/cabinets/route.js";
import shelfRoute from "./features/shelves/route.js";
import categoryRoute from "./features/categories/route.js";
import bookRoute from "./features/books/route.js";
import volumeRoute from "./features/volumes/route.js";
import bookPlacementRoute from "./features/book-placements/route.js";
import authRoute from "./features/auth/route.js";
import { protect } from "./middleware/auth.js";
import ErrorHandler from "./middleware/error.js";

// initialize app
const app = express();

// query parser
app.set("query parser", "extended");

// body parser  
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "50mb" }));


// check health
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "OK",
  });
});

// routes definition
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", protect, userRoute);
app.use("/api/v1/locations", protect, locationRoute);
app.use("/api/v1/libraries", protect, libraryRoute);
app.use("/api/v1/cabinets", protect, cabinetRoute);
app.use("/api/v1/shelves", protect, shelfRoute);
app.use("/api/v1/categories", protect, categoryRoute);
app.use("/api/v1/books", protect, bookRoute);
app.use("/api/v1/volumes", protect, volumeRoute);
app.use("/api/v1/book-placements", protect, bookPlacementRoute);

// error handling
app.use(ErrorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({
    status: "failed",
    message: `The requested resource was not found ${req.originalUrl}`,
  });
});

// connect db
connectDB(process.env.MONGO_URL);

// listen app
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
