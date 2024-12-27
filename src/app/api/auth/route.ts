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
      const newUser = new User({
        email,
        fullName,
        password: hashedPassword,
      });

      try {
        await newUser.save();
        return NextResponse.json(
          { message: 'User created successfully' },
          { status: 201 }
        );
      } catch (error: unknown) {
        return NextResponse.json(
          { message: 'Error creating user', error: (error as Error).message },
          { status: 500 }
        );
      }
    } else if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid password' },
          { status: 401 }
        );
      }

      if (!jwtSecret) {
        console.error('JWT_SECRET is not defined');
        return NextResponse.json(
          { message: 'Internal server error' },
          { status: 500 }
        );
      }

      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

      return NextResponse.json(
        { message: 'Login successful', token, user }, // Send user data along with token
        { status: 200 }
      );
    } else if (action === 'delete') {
      if (!userId) {
        return NextResponse.json(
          { message: 'User ID is required for deletion' },
          { status: 400 }
        );
      }

      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      await User.findByIdAndDelete(userId);

      return NextResponse.json(
        { message: 'User deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
