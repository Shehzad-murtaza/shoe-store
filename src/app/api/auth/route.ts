import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/libs/db';
const jwtSecret = "3f3b8c9e1a2d4e5f8b6c7a9e0d1f2a3bchlo";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { action, email, fullName, password, userId } = await request.json();

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
    } else if (action === 'login') {
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
    } else {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 }
    );
  }
}