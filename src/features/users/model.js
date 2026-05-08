import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ["Entry", "Admin"],
      default: "Entry",
    },
  },
  { timestamps: true },
  { versionKey: false }
);

export const validateUser = (user, isUpdate = false) => {
  const schema = Joi.object({
    name: isUpdate ? Joi.string().min(3) : Joi.string().min(3).required(),
    email: isUpdate ? Joi.string().email() : Joi.string().email().required(),
    password: isUpdate ? Joi.string().min(6) : Joi.string().min(6).required(),
    role: Joi.string().valid("Admin", "Entry"),
  });
  return schema.validate(user);
};

// Password Hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance Method: Check Password
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Instance Method: Generate Token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const model = mongoose.model("User", userSchema);

export default model;
