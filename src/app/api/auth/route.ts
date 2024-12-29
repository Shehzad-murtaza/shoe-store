import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/libs/db';

const jwtSecret = "process.env.JWT_SECRET";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { action, email, fullName, password } = await request.json(); // Removed unused `userId`

    if (action === 'signup') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'User already exists' },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Hardcode admin role for a specific email
      const role = email === 'mr.shehzad457@gmail.com' ? 'admin' : 'user';

      const newUser = new User({
        email,
        fullName,
        password: hashedPassword,
        role,
        cart: [], // Initialize empty cart
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

      return NextResponse.json({ token, user: newUser }, { status: 201 });
    } 
    
    if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: 'User does not exist' },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: 'Incorrect password' },
          { status: 400 }
        );
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

      return NextResponse.json({ token, user }, { status: 200 });
    }

    // Handle invalid actions
    return NextResponse.json(
      { message: 'Invalid action' },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error('Error processing request:', err); // Log the error for debugging

    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 }
    );
  }
}
