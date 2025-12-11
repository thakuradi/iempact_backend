import mongoose from 'mongoose';
// dotenv import and config call removed as it should be handled in index.js
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

export default connectToDatabase;
