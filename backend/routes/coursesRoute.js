import express from "express";
import { showCourses, showCourseById, removeCourse } from "../controllers/coursesController.js";

const router = express.Router();

router.get("/courses", showCourses);

router.get("/courses/:course_id", showCourseById);

router.delete("/courses/:course_id", removeCourse);

export default router;
