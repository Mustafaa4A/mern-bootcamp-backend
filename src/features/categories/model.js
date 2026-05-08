import mongoose from "mongoose";
import Joi from "joi";
import MongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const validateCategory = (category, isUpdate = false) => {
  const schema = Joi.object({
    name: isUpdate ? Joi.string().min(2) : Joi.string().min(2).required(),
    description: Joi.string().allow(""),
  });
  return schema.validate(category);
};

categorySchema.plugin(MongoosePaginate);

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
