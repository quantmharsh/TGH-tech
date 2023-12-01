"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "HarshIsGoodBoy";
const authenticateAdmin = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(401).json({ msg: 'Not authorized as an admin' });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
exports.authenticateAdmin = authenticateAdmin;
