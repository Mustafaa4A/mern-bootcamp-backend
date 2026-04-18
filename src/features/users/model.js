import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

//
// export const validate = (user) => {
//   return Joi.object({
//     name: Joi.string().min(5).required(),
//     email: Joi.string().min(2).required().email(),
//     password: Joi.string().required(),
//     role: Joi.string().valid("Admin", "Entry").required(),
//   }).validate(user);
// };

// Password Hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const model = mongoose.model("User", userSchema);

export default model;
