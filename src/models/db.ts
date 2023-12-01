// src/models/db.ts
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://viratkohli0737:B4PMsOOoq8vtL3TW@cluster0.erluey0.mongodb.net/?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
