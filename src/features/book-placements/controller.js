import BookPlacementModel, { validateBookPlacement } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const DUPLICATE_MSG = "Placement already exists for this volume";
const ITEM_NAME = "Placement";

// Create BookPlacement
export const createBookPlacement = createItem(BookPlacementModel, validateBookPlacement, DUPLICATE_MSG);

// Get All BookPlacements
export const getBookPlacements = fetchData(BookPlacementModel);

// Get BookPlacement by ID
export const getBookPlacementById = fetchSingle(BookPlacementModel, ITEM_NAME);

// Update BookPlacement
export const updateBookPlacement = updateItem(BookPlacementModel, validateBookPlacement, DUPLICATE_MSG, ITEM_NAME);

// Delete BookPlacement
export const deleteBookPlacement = deleteItem(BookPlacementModel, ITEM_NAME);
