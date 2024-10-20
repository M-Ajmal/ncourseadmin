import db from "../config/db.js";

export const getAllUsers = (callback) => {
  const query = "SELECT id, firstname, lastname, username, password, email, created_at FROM adminuser";
  db.query(query, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

export const addUser = (userData, callback) => {
  const query =
    "INSERT INTO adminuser (firstname, lastname, username, password, email) VALUES (?, ?, ?, ?, ?)";
  const { firstname, lastname, username, password, email } = userData;
  db.query(query, [firstname, lastname, username, password, email], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

export const updateUser = (id, userData, callback) => {
  const query =
    "UPDATE adminuser SET firstname = ?, lastname = ?, username = ?, password = ?, email = ? WHERE id = ?";
  const { firstname, lastname, username, password, email } = userData;
  db.query(query, [firstname, lastname, username, password, email, id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

export const deleteUser = (id, callback) => {
  const query = "DELETE FROM adminuser WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

export const getUserByUsername = (username, callback) => {
  const query = "SELECT id, firstname, lastname, username, password, email FROM adminuser WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, results[0]);
  });
};
