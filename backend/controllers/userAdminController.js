import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../models/userAdminModel.js";


export const getUsers = (req, res) => {
  getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

export const createUser = (req, res) => {
  const newUser = req.body;

  addUser(newUser, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "User successfully added!", userId: result.insertId });
  });
};

export const updateUserById = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  updateUser(userId, updatedData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User successfully updated!" });
  });
};


export const deleteUserById = (req, res) => {
  const userId = req.params.id;

  deleteUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User successfully deleted!" });
  });
};
