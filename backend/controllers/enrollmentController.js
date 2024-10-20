import { getEnrollments, deleteEnrollmentById, updateEnrollmentById } from '../models/enrollmentModel.js';

export const getAllEnrollments = (req, res) => {
  getEnrollments((err, enrollments) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving enrollments', error: err.message });
    }
    res.status(200).json(enrollments);
  });
};

export const deleteEnrollment = (req, res) => {
  const { enrollment_id } = req.params;
  deleteEnrollmentById(enrollment_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting enrollment', error: err.message });
    }
    res.status(200).json({ message: 'Enrollment deleted successfully' });
  });
};

export const updateEnrollment = (req, res) => {
  const { enrollment_id } = req.params;
  const { course_id, user_id, certificate } = req.body; 

  if (!course_id || !user_id || !certificate) {
    return res.status(400).json({ message: 'Course ID, User ID, and Certificate are required' });
  }

  updateEnrollmentById(enrollment_id, { course_id, user_id, certificate }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating enrollment', error: err.message });
    }
    res.status(200).json({ message: 'Enrollment updated successfully', result });
  });
};

