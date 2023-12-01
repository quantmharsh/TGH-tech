// src/routes/auth.ts
import express, { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router: Router = express.Router();

// @route   POST /auth/register
// @desc    Register a user (admin or student)
// @access  Public
router.post('/register', registerUser);

// @route   POST /auth/login
// @desc    Login a user (admin or student)
// @access  Public
router.post('/login', loginUser);

export default router;
