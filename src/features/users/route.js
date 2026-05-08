import { protect } from "../../middleware/auth.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./controller.js";
import express from "express";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", getUsers);
userRoute.get("/:id", protect, getUserById);
userRoute.patch("/:id", protect, updateUser);
userRoute.delete("/:id", protect, deleteUser);

export default userRoute;
