'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-cards";
import { useCart } from '@/app/context/cartContext';
import Link from 'next/link';
import Header from '@/components/Header';

// Define product type
interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    quantity?: number; // Optional for flexibility
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    // Fetch products from the API when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        const productWithQuantity = { ...product, quantity: 1 }; // Add default quantity
        addToCart(productWithQuantity);
    };

    return (
        <>
            <Header />
            <div className="bg-darkblue h-auto px-4 py-6 sm:px-8 mt-36 lg:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                    {products.map((product: Product) => (
                        <CardContainer key={product.id} className="inter-var">
                            <CardBody className="bg-gray-800 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[300px] h-[450px] rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/40">
                                {/* Image Container */}
                                <CardItem translateZ={100} className="w-full h-[250px] overflow-hidden rounded-lg mb-4">
                                    <Image
                                        src={product.imageUrl}
                                        height={250}
                                        width={250}
                                        className="w-full h-full object-cover object-bottom rounded-lg transition-shadow duration-300 group-hover/card:shadow-xl"
                                        alt={product.name}
                                    />
                                </CardItem>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                                    <p className="text-neutral-400 text-sm">{product.description}</p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Link href={`/productDetails/${product.id}`}>
                                        <CardItem
                                            translateZ={20}
                                            as="button"
                                            className="px-4 py-2 rounded-lg text-xs font-normal dark:text-white hover:text-purple-500 transition-colors duration-200"
                                        >
                                            View Details →
                                        </CardItem>
                                    </Link>
                                    <CardItem
                                        translateZ={20}
                                        as="button"
                                        className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors duration-200"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductList;
