import db from "../config/db.js";

export const getInstructors = (req, res) => {
  db.query("SELECT * FROM instructor", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};


export const deleteInstructor = (req, res) => {
  const { ins_id } = req.params;

  db.query("DELETE FROM courses WHERE ins_id = ?", [ins_id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.query("DELETE FROM instructor WHERE ins_id = ?", [ins_id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Instructor and associated courses deleted successfully." });
    });
  });
};
