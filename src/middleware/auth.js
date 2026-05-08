import jwt from "jsonwebtoken";
import User from "../features/users/model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).send({ status: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).send({ status: false, message: "Invalid token" });

    const user = await User.findById(decoded.id);

    if (!user)
      return res.status(401).send({ status: false, message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
