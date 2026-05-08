import UserModel, { validateUser } from "./model.js";
import { createItem, getList, fetchSingle, updateItemWithSave, deleteItem, fetchData } from "../../utils/query.js";

const ITEM_NAME = "User";

// Create user
export const createUser = createItem(UserModel, validateUser);

// Get all users
export const getUsers = fetchData(UserModel);

// Get user by ID
export const getUserById = fetchSingle(UserModel, ITEM_NAME);

// Update user
export const updateUser = updateItemWithSave(UserModel, validateUser, null, ITEM_NAME);

// Delete user
export const deleteUser = deleteItem(UserModel, ITEM_NAME);
