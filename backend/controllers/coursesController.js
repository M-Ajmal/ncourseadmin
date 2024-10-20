import {
  getCourses,
  getCourseById,
  deleteCourse,
  deleteEnrollmentsByCourseId,
} from "../models/coursesModel.js";

import path from "path";
import fs from "fs";

export const showCourses = (req, res) => {
  getCourses((err, results) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving courses" });
    } else {
      results.forEach((course) => {
        course.course_img = `http://localhost:5000/img/courses/${course.course_img}`;
      });
      res.json(results);
    }
  });
};

export const showCourseById = (req, res) => {
  const course_id = req.params.course_id;
  getCourseById(course_id, (err, result) => {
    if (err || result.length === 0) {
      res.status(404).json({ message: "Course not found" });
    } else {
      const course = result[0];
      course.course_img = `http://localhost:5000/img/courses/${course.course_img}`;
      res.json(course);
    }
  });
};

export const removeCourse = (req, res) => {
  const course_id = req.params.course_id;

  getCourseById(course_id, (err, result) => {
    if (err || result.length === 0) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const course = result[0];
    const imagePath = path.join("img", "courses", course.course_img);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err.message);
      }
    });

    deleteEnrollmentsByCourseId(course_id, (err) => {
      if (err) {
        res.status(500).json({ message: "Error deleting enrollments" });
        return;
      }

      deleteCourse(course_id, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error deleting course" });
        } else {
          res.json({
            message: `Course with ID ${course_id} deleted successfully`,
          });
        }
      });
    });
  });
};
