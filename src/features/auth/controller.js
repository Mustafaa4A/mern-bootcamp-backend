import mongoose from "mongoose";
import UserModel from "../users/model.js";

// Create Book
export const login = async (req, res) => {
  try {
    // get user data
    const { email, password } = req.body;

    // validate user data
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ status: false, message: "Password is required" });
    }

    // check if email exists
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid email or password" });
    }

    // check password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    // generate token
    const token = user.generateToken();

    // return token
    res.status(200).json({ status: true, data: { user, token } });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
