import VolumeModel, { validateVolume } from "./model.js";
import { createItem, getList, fetchSingle, updateItem, deleteItem, fetchData } from "../../utils/query.js";

const DUPLICATE_MSG = "Volume number already exists for this book";
const ITEM_NAME = "Volume";

// Create Volume
export const createVolume = createItem(VolumeModel, validateVolume, DUPLICATE_MSG);

// Get All Volumes
export const getVolumes = fetchData(VolumeModel);

// Get Volume by ID
export const getVolumeById = fetchSingle(VolumeModel, ITEM_NAME);

// Update Volume
export const updateVolume = updateItem(VolumeModel, validateVolume, DUPLICATE_MSG, ITEM_NAME);

// Delete Volume
export const deleteVolume = deleteItem(VolumeModel, ITEM_NAME);
