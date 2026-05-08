import CategoryModel, { validateCategory } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const ITEM_NAME = "Category";

// Create Category
export const createCategory = createItem(CategoryModel, validateCategory);

// Get All Categories
export const getCategories = fetchData(CategoryModel);

// Get Category by ID
export const getCategoryById = fetchSingle(CategoryModel, ITEM_NAME);

// Update Category
export const updateCategory = updateItem(CategoryModel, validateCategory, null, ITEM_NAME);

// Delete Category
export const deleteCategory = deleteItem(CategoryModel, ITEM_NAME);
