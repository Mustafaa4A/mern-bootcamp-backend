import { createUser, getUsers, getUserById, updateUser, deleteUser } from "./controller.js";
import express from "express";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", getUsers);
userRoute.get("/:id", getUserById);
userRoute.patch("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
