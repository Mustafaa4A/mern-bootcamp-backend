// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";

import express from "express";
import { connectDB } from "./config/db.js";

//routes
import userRoute from "./features/users/route.js";

// initialize app
const app = express();
app.use(express.json());

// check health
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "OK",
  });
});

app.use("/api/users", userRoute);

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
