// app.ts
// app.ts
import express from 'express';
import { connectDB } from './models/db';
import authRoutes from './routes/auth';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Student Management System API');
});

// Start the server
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



