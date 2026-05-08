import CabinetModel, { validateCabinet } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const DUPLICATE_MSG = "Cabinet name already exists in this library";
const ITEM_NAME = "Cabinet";

// Create Cabinet
export const createCabinet = createItem(CabinetModel, validateCabinet, DUPLICATE_MSG);

// Get All Cabinets
export const getCabinets = fetchData(CabinetModel);

// Get Cabinet by ID
export const getCabinetById = fetchSingle(CabinetModel, ITEM_NAME);

// Update Cabinet
export const updateCabinet = updateItem(CabinetModel, validateCabinet, DUPLICATE_MSG, ITEM_NAME);

// Delete Cabinet
export const deleteCabinet = deleteItem(CabinetModel, ITEM_NAME);
