import { createUser } from "./controller.js";
import express from "express";

const userRoute = express.Router();

userRoute.post("/", createUser);

export default userRoute;
