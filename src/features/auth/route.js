import express from "express";
import { login } from "./controller.js";

const authRoute = express.Router();

authRoute.post("/login", login);

export default authRoute;
