import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/libs/db';

// Connect to the database
connectDB();

export async function GET() {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);  // Use error here to avoid the unused variable warning
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}