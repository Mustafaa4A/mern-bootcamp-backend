import ShelfModel, { validateShelf } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const DUPLICATE_MSG = "Shelf number already exists in this cabinet";
const ITEM_NAME = "Shelf";

// Create Shelf
export const createShelf = createItem(ShelfModel, validateShelf, DUPLICATE_MSG);

// Get All Shelves
export const getShelves = fetchData(ShelfModel);

// Get Shelf by ID
export const getShelfById = fetchSingle(ShelfModel, ITEM_NAME);

// Update Shelf
export const updateShelf = updateItem(ShelfModel, validateShelf, DUPLICATE_MSG, ITEM_NAME);

// Delete Shelf
export const deleteShelf = deleteItem(ShelfModel, ITEM_NAME);
