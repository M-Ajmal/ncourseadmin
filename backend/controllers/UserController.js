import { getUsersWithCourses, getUserById, deleteUserById } from '../models/UserModel.js';

export const getAllUsers = (req, res) => {
  getUsersWithCourses((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
    res.status(200).json(users);
  });
};

export const getUser = (req, res) => {
  const { u_id } = req.params;
  getUserById(u_id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });
};

export const deleteUser = (req, res) => {
  const { u_id } = req.params;
  deleteUserById(u_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
