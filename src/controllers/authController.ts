// src/controllers/authController.ts
import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET="HarshIsGoodBoy"

// @route   POST /auth/register
// @desc    Register a user (admin or student)
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, isAdmin } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      isAdmin,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   POST /auth/login
// @desc    Login a user (admin or student)
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and send a JWT token for authentication
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
      expiresIn: '1h', // You can adjust the token expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
