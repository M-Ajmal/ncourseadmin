import db from "../config/db.js";

export const getCourses = (callback) => {
  const query = "SELECT * FROM courses";
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export const getCourseById = (course_id, callback) => {
  const query = "SELECT * FROM courses WHERE course_id = ?";
  db.query(query, [course_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

export const deleteCourse = (course_id, callback) => {
  const query = "DELETE FROM courses WHERE course_id = ?";
  db.query(query, [course_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

export const deleteEnrollmentsByCourseId = (course_id, callback) => {
  const query = "DELETE FROM enrollment WHERE course_id = ?";

  db.query(query, [course_id], (err, results) => {
    callback(err, results);
  });
};
