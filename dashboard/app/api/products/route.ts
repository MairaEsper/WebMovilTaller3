import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();

        const newProduct = await Product.create({
            title: body.title,
            price: body.price,
            description: body.description,
            category: body.category,
            image: body.image,
        });

        return NextResponse.json(newProduct, { status: 201 });

    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred.';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            errorMessage = (error as { message: string }).message;
        }

        console.error('API Error creating product:', errorMessage);
        return NextResponse.json(
            { error: 'Failed to create product in database', details: errorMessage },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();

        const products = await Product.find({});

        return NextResponse.json(products, { status: 200 });

    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred while fetching products.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error('API Error fetching products:', errorMessage);
        return NextResponse.json(
            { error: 'Failed to fetch products from database', details: errorMessage },
            { status: 500 }
        );
    }
}
