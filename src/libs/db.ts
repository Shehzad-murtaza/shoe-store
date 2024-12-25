// src/lib/db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  // MongoDB connection string from .env.local
  const mongoURI = process.env.MONGODB_URI;

  // Check if the connection string is defined
  if (!mongoURI) {
    console.error('MongoDB URI is not defined');
    process.exit(1); // Exit if the URI is not defined
  }

  // Check if already connected
  if (mongoose.connection.readyState) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1); // Shutdown the app on error
  }
};

export default connectDB;
