import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/libs/db';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { userId, cart } = await request.json();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        user.cart = cart;
        await user.save();

        return NextResponse.json({ message: 'Cart saved successfully' }, { status: 200 });
    } catch (err: unknown) {
        console.error('Error saving cart:', err); // Log the error for debugging
        return NextResponse.json({ message: 'Error saving cart' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ cart: user.cart || [] }, { status: 200 }); // Ensure cart is always an array
    } catch (err: unknown) {
        console.error('Error fetching cart:', err); // Log the error for debugging
        return NextResponse.json({ message: 'Error fetching cart' }, { status: 500 });
    }
}
