import express from 'express';
import { getAllEnrollments, deleteEnrollment, updateEnrollment } from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/enrollments', getAllEnrollments);

router.delete('/enrollments/:enrollment_id', deleteEnrollment);

router.put('/enrollments/:enrollment_id', updateEnrollment);

router.get('/enrollments/emails', async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT e.*, u.gmail 
        FROM enrollment e
        JOIN user u ON e.u_id = u.u_id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
export default router;
