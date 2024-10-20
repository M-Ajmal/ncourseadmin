import express from "express";
import {
  getUsers,
  createUser,
  updateUserById,
  deleteUserById,
} from "../controllers/userAdminController.js";

const router = express.Router();

router.get("/adminuser", getUsers);

router.post("/adminuser", createUser);

router.put("/adminuser/:id", updateUserById);

router.delete("/adminuser/:id", deleteUserById);

export default router;
