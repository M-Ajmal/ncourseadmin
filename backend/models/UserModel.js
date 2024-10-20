import db from '../config/db.js';

export const getUsersWithCourses = (callback) => {
  const query = `
    SELECT u.u_id, u.f_name, u.l_name, u.user_name, u.gmail, u.join_date, GROUP_CONCAT(c.course_title) as enrolled_courses
    FROM user u
    LEFT JOIN enrollment e ON u.u_id = e.u_id
    LEFT JOIN courses c ON e.course_id = c.course_id
    GROUP BY u.u_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users with courses:', err.message);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


export const getUserById = (u_id, callback) => {
  const query = `
    SELECT u.u_id, u.f_name, u.l_name, u.user_name, u.gmail, u.join_date, GROUP_CONCAT(c.course_title) as enrolled_courses
    FROM user u
    LEFT JOIN enrollment e ON u.u_id = e.u_id
    LEFT JOIN courses c ON e.course_id = c.course_id
    WHERE u.u_id = ?
    GROUP BY u.u_id
  `;
  db.query(query, [u_id], (err, result) => {
    if (err) {
      console.error('Error fetching user by ID:', err.message);
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

export const deleteUserById = (u_id, callback) => {
  const query = 'DELETE FROM user WHERE u_id = ?';
  db.query(query, [u_id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err.message);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
