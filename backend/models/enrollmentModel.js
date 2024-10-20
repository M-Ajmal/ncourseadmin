import db from '../config/db.js';


export const getEnrollments = (callback) => {
  const query = `
    SELECT e.enrollment_id, u.f_name, u.l_name, c.course_title, e.certificate
    FROM enrollment e
    JOIN user u ON e.u_id = u.u_id
    JOIN courses c ON e.course_id = c.course_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching enrollments:', err.message);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

export const deleteEnrollmentById = (enrollment_id, callback) => {
  const query = 'DELETE FROM enrollment WHERE enrollment_id = ?';
  db.query(query, [enrollment_id], (err, result) => {
    if (err) {
      console.error('Error deleting enrollment:', err.message);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

export const updateEnrollmentById = (enrollment_id, enrollmentData, callback) => {
  const { course_id, user_id, certificate } = enrollmentData;

  const query = 'UPDATE enrollment SET course_id = ?, u_id = ?, certificate = ? WHERE enrollment_id = ?';
  db.query(query, [course_id, user_id, certificate, enrollment_id], (err, result) => {
    if (err) {
      console.error('Error updating enrollment:', err.message);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
