import express from "express"; 
import db from "../config/db.js";

const router = express.Router();

// Endpoint to count total courses
router.get("/count/courses", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM courses", (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database query failed" });
    }
    res.json({ total: results[0].total });
  });
});

// Endpoint to count total users
router.get("/count/users", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM user", (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database query failed" });
    }
    res.json({ total: results[0].total });
  });
});

// Endpoint to count enrollments and categorize them
router.get("/count/enrollments", (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM enrollment", (err, totalResults) => {
        if (err) {
            console.error("Error fetching total enrollments:", err); // Log the error
            return res.status(500).send({ error: "Database query failed" });
        }

        db.query("SELECT COUNT(*) AS completed FROM enrollment WHERE certificate = 1", (errCompleted, completedResults) => {
            if (errCompleted) {
                console.error("Error fetching completed enrollments:", errCompleted); // Log the error
                return res.status(500).send({ error: "Database query failed" });
            }

            const notCompletedCount = totalResults[0].total - completedResults[0].completed;

            res.json({ 
                total: totalResults[0].total, 
                completed: completedResults[0].completed,
                notCompleted: notCompletedCount 
            });
        });
    });
});

// Endpoint to count total instructors
router.get("/count/instructors", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM instructor", (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database query failed" });
    }
    res.json({ total: results[0].total });
  });
});

export default router;
