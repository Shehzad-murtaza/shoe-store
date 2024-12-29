import mongoose from 'mongoose';
const DB = process.env.MONGO_URI;

const connectDB = async (): Promise<void> => {
  if (!DB) {
    console.error('MongoDB URI is not defined');
    process.exit(1);
  }

  if (mongoose.connection.readyState) {
    console.log('Bhai ak bar kafi hota');
    return;
  }

  try {
    await mongoose.connect(DB);
    console.log('DB connect hogai');
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;