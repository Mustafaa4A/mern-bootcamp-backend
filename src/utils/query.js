import mongoose from "mongoose";

// generic function used to fetch paginated data with search
export const fetchData = (Model) => async (req, res) => {
  try {
    if (!Model?.paginate) {
      return res.status(400).json({ status: false, message: "Invalid model" });
    }

    const { options, query = {}, search = {}, name } = req.query;
    const { keyword, fields = [] } = search;

    let searchCriteria = {};
    if (keyword && fields.length) {
      const searchFields = Array.isArray(fields) ? fields : [fields];
      searchCriteria = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: keyword, $options: "i" },
        })),
      };
    }

    const filter = { ...query, ...searchCriteria };
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (req?.user?.branch) {
      filter.branch = req?.user?.branch;
    }

    const data = await Model.paginate(filter, options);
    return res.json({ status: true, data });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// generic function used for get list of items
export const getList = (Model) => async (req, res, next) => {
  try {
    const filter = { ...req.query };
    if (req?.user?.branch) {
      filter.branch = req?.user?.branch;
    }

    const data = await Model.find(filter);
    res.send({ status: true, data });
  } catch (err) {
    next(err);
  }
};

// generic function used for fetch item with pagination
export const fetchItem = (Model) => async (req, res) => {
  try {
    const { options, query = {} } = req.query;
    const filter = typeof query === "string" ? { name: { $regex: query, $options: "i" } } : query;

    if (req?.user?.branch) {
      filter.branch = req?.user?.branch;
    }

    const data = await Model.paginate(filter, options);
    res.send({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// generic function used for fetch single item
export const fetchSingle = (Model, itemName = "Item") => async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: `Invalid ${itemName.toLowerCase()} id` });
    }

    const item = await Model.findById(id);
    if (!item) {
      return res.status(404).json({ status: false, message: `${itemName} not found` });
    }

    res.send({ status: true, data: item });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// generic function used for create item
export const createItem = (Model, validate, duplicateMsg) => async (req, res) => {
  try {
    if (validate) {
      const { error } = validate(req.body);
      if (error) return res.status(400).json({ status: false, message: error.details[0].message });
    }

    const item = new Model(req.body);
    await item.save();
    res.status(201).json({ status: true, data: item });
  } catch (error) {
    if (error.code === 11000 && duplicateMsg) {
      return res.status(400).json({ status: false, message: duplicateMsg });
    }
    res.status(500).json({ status: false, message: error.message });
  }
};

// generic function used for update item
export const updateItem = (Model, validate, duplicateMsg, itemName = "Item") => async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: `Invalid ${itemName.toLowerCase()} id` });
    }

    if (validate) {
      const { error } = validate(req.body, true);
      if (error) return res.status(400).json({ status: false, message: error.details[0].message });
    }

    const updatedItem = await Model.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ status: false, message: `${itemName} not found` });
    }

    res.status(200).json({ status: true, message: `${itemName} updated successfully`, data: updatedItem });
  } catch (error) {
    if (error.code === 11000 && duplicateMsg) {
      return res.status(400).json({ status: false, message: duplicateMsg });
    }
    res.status(500).json({ status: false, message: error.message });
  }
};

// generic function used for update item with save hook
export const updateItemWithSave = (Model, validate, duplicateMsg, itemName = "Item") => async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: `Invalid ${itemName.toLowerCase()} id` });
    }

    if (validate) {
      const { error } = validate(req.body, true);
      if (error) return res.status(400).json({ status: false, message: error.details[0].message });
    }

    const item = await Model.findById(id);
    if (!item) {
      return res.status(404).json({ status: false, message: `${itemName} not found` });
    }

    Object.assign(item, req.body);
    await item.save();

    res.status(200).json({ status: true, message: `${itemName} updated successfully`, data: item });
  } catch (error) {
    if (error.code === 11000 && duplicateMsg) {
      return res.status(400).json({ status: false, message: duplicateMsg });
    }
    res.status(500).json({ status: false, message: error.message });
  }
};

// generic function used for delete item
export const deleteItem = (Model, itemName = "Item") => async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: `Invalid ${itemName.toLowerCase()} id` });
    }

    const deletedItem = await Model.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ status: false, message: `${itemName} not found` });
    }

    res.status(200).json({ status: true, message: `${itemName} deleted successfully` });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
