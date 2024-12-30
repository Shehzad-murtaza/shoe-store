import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/libs/db';

export async function POST(request: Request) {
    try {
        // Ensure the request body is not empty and contains JSON
        const body = await request.text(); // Read the raw text
        const parsedData = body ? JSON.parse(body) : null;

        if (!parsedData || !parsedData.userId || !parsedData.cart) {
            return NextResponse.json(
                { message: 'Missing userId or cart data in request body' },
                { status: 400 }
            );
        }

        const { userId, cart } = parsedData;

        // Connect to the database
        await connectDB();

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Update the user's cart and save
        user.cart = cart;
        await user.save();

        return NextResponse.json({ message: 'Cart saved successfully' }, { status: 200 });
    } catch (err: unknown) {
        console.error('Error saving cart:', err);
        return NextResponse.json({ message: 'Error saving cart' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        // Extract userId from query parameters
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'Missing userId in query parameters' }, { status: 400 });
        }

        // Connect to the database
        await connectDB();

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Return the user's cart, defaulting to an empty array if it's not set
        return NextResponse.json({ cart: user.cart || [] }, { status: 200 });
    } catch (err: unknown) {
        console.error('Error fetching cart:', err);
        return NextResponse.json({ message: 'Error fetching cart' }, { status: 500 });
    }
}
