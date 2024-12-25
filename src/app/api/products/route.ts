// src/app/api/products/route.ts

import { NextResponse } from 'next/server';

// Define the type for the Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define the list of products
const products: Product[] = [
  {
    id: 1,
    name: 'Classic Filmstar Sneakers',
    description: 'Stylish sneakers inspired by classic film stars.',
    price: 29.99,
    imageUrl: '/p1.png',
  },
  {
    id: 2,
    name: 'Elegant Evening Loafers',
    description: 'Perfect loafers for formal occasions.',
    price: 39.99,
    imageUrl: '/p2.png',
  },
  {
    id: 3,
    name: 'Ultimate Comfort Running Shoes',
    description: 'Designed for maximum comfort during your runs.',
    price: 49.99,
    imageUrl: '/p3.png',
  },
  {
    id: 4,
    name: 'All-Terrain Hiking Boots',
    description: 'Durable boots for all your hiking adventures.',
    price: 49.99,
    imageUrl: '/p4.png',
  },
  {
    id: 5,
    name: 'Stylish Casual Sneakers',
    description: 'Casual sneakers that blend style and comfort.',
    price: 29.99,
    imageUrl: '/p5.png',
  },
  {
    id: 6,
    name: 'Premium Leather Dress Shoes',
    description: 'Elegant dress shoes made from premium leather.',
    price: 39.99,
    imageUrl: '/p6.png',
  },
  {
    id: 7,
    name: 'Sporty Athletic Trainers',
    description: 'Trainers designed for sports and fitness activities.',
    price: 49.99,
    imageUrl: '/p7.png',
  },
  {
    id: 8,
    name: 'Chic Fashion Sandals',
    description: 'Stylish sandals for a chic summer look.',
    price: 49.99,
    imageUrl: '/p8.png',
  },
  {
    id: 9,
    name: 'Durable Work Boots',
    description: 'Sturdy boots for tough work environments.',
    price: 49.99,
    imageUrl: '/p9.png',
  },
  {
    id: 10,
    name: 'Trendy Slip-On Sneakers',
    description: 'Convenient slip-on sneakers for everyday wear.',
    price: 49.99,
    imageUrl: '/p10.png',
  },
  {
    id: 11,
    name: 'Classic Canvas High Tops',
    description: 'Timeless high-top sneakers made from canvas.',
    price: 29.99,
    imageUrl: '/p11.png',
  },
  {
    id: 12,
    name: 'Comfortable Everyday Flats',
    description: 'Flats designed for all-day comfort.',
    price: 39.99,
    imageUrl: '/p12.png',
  },
  {
    id: 13,
    name: 'Luxury Suede Ankle Boots',
    description: 'Stylish ankle boots made from luxurious suede.',
    price: 49.99,
    imageUrl: '/p13.png',
  },
  {
    id: 14,
    name: 'Breathable Mesh Running Shoes',
    description: 'Lightweight running shoes with breathable mesh.',
    price: 49.99,
    imageUrl: '/p14.png',
  },
  {
    id: 15,
    name: 'Fashionable Platform Sneakers',
    description: 'Trendy platform sneakers for a stylish look.',
    price: 59.99,
    imageUrl: '/p15.png',
  },
];

// Export the API route to handle GET requests and return the products
export async function GET() {
  return NextResponse.json(products);
}