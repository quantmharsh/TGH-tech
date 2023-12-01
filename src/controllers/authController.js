"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "HarshIsGoodBoy";
// @route   POST /auth/register
// @desc    Register a user (admin or student)
// @access  Public
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, isAdmin } = req.body;
        // Check if the user already exists
        const existingUser = yield user_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create a new user
        const newUser = new user_1.UserModel({
            email,
            password: hashedPassword,
            isAdmin,
        });
        // Save the user to the database
        yield newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.registerUser = registerUser;
// @route   POST /auth/login
// @desc    Login a user (admin or student)
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Check if the password is correct
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Create and send a JWT token for authentication
        const token = jsonwebtoken_1.default.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
            expiresIn: '1h', // You can adjust the token expiration time
        });
        res.json({ token });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.loginUser = loginUser;
