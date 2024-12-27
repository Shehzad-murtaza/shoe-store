// src/lib/db.ts
import mongoose from 'mongoose';
const MONGODB_URI = "mongodb+srv://mrshehzad457:shehzad@cluster0.agiup.mongodb.net/shoe-store";

const connectDB = async (): Promise<void> => {

  // Check if the connection string is defined
  if (!MONGODB_URI) {
    console.error('MongoDB URI is not defined');
    process.exit(1); // Exit if the URI is not defined
  }

  // Check if already connected
  if (mongoose.connection.readyState) {
    console.log('Bhai ak bar kafi hota');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('DB connect hogai');
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1); // Shutdown the app on error
  }
};

export default connectDB;