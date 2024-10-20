import db from "../config/db.js";

const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM adminuser WHERE username = ?";
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const AuthModel = { findUserByUsername };
export default AuthModel;
