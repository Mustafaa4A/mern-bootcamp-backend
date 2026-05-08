import LocationModel, { validateLocation } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const ITEM_NAME = "Location";

// Create Location
export const createLocation = createItem(LocationModel, validateLocation);

// Get All Locations
export const getLocations = fetchData(LocationModel);

// Get Location by ID
export const getLocationById = fetchSingle(LocationModel, ITEM_NAME);

// Update Location
export const updateLocation = updateItem(LocationModel, validateLocation, null, ITEM_NAME);

// Delete Location
export const deleteLocation = deleteItem(LocationModel, ITEM_NAME);
