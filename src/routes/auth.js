"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// @route   POST /auth/register
// @desc    Register a user (admin or student)
// @access  Public
router.post('/register', authController_1.registerUser);
// @route   POST /auth/login
// @desc    Login a user (admin or student)
// @access  Public
router.post('/login', authController_1.loginUser);
exports.default = router;
