import mongoose from 'mongoose';
const MONGODB_URI = "mongodb+srv://mrshehzad457:shehzad@cluster0.agiup.mongodb.net/shoe-store";

const connectDB = async (): Promise<void> => {
  if (!MONGODB_URI) {
    console.error('MongoDB URI is not defined');
    process.exit(1);
  }

  if (mongoose.connection.readyState) {
    console.log('Bhai ak bar kafi hota');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DB connect hogai');
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;