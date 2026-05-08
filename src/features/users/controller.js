// CRUD operations

import UserModel, { validateUser } from "./model.js";

// Create user
export const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });

    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body, true);
    if (error)
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });

    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    // Update fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.role) user.role = req.body.role;

    await user.save(); // This will trigger pre('save') hook for password hashing if modified

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });
    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
