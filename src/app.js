"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
// app.ts
const express_1 = __importDefault(require("express"));
const db_1 = require("./models/db");
const auth_1 = __importDefault(require("./routes/auth"));
// Load environment variables from .env file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Define routes
app.use('/auth', auth_1.default);
// Default route
app.get('/', (req, res) => {
    res.send('Student Management System API');
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Rest of your application code...
