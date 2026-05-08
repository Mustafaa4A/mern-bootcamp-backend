import LibraryModel, { validateLibrary } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const DUPLICATE_MSG = "Library name already exists in this location";
const ITEM_NAME = "Library";

// Create Library
export const createLibrary = createItem(LibraryModel, validateLibrary, DUPLICATE_MSG);

// Get All Libraries
export const getLibraries = fetchData(LibraryModel);

// Get Library by ID
export const getLibraryById = fetchSingle(LibraryModel, ITEM_NAME);

// Update Library
export const updateLibrary = updateItem(LibraryModel, validateLibrary, DUPLICATE_MSG, ITEM_NAME);

// Delete Library
export const deleteLibrary = deleteItem(LibraryModel, ITEM_NAME);
