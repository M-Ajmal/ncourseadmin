import express from "express";
import { getInstructors, deleteInstructor } from "../controllers/instructorController.js";

const router = express.Router();

router.get("/instructors", getInstructors);

router.delete("/instructors/:ins_id", deleteInstructor);

export default router;
