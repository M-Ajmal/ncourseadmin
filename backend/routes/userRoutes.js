import express from 'express';
import { getAllUsers, getUser, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:u_id', getUser);

router.delete('/users/:u_id', deleteUser);

export default router;
