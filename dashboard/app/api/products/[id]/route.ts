import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(request: Request, context: Context) {
    try {
        await dbConnect();
        const { id } = await context.params;
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid Product ID format' }, { status: 400 });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(updatedProduct, { status: 200 });

    } catch (error: unknown) {
        let errorMessage = 'An error occurred during product update.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error('API Error updating product:', errorMessage);
        return NextResponse.json({ error: 'Failed to update product', details: errorMessage }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: Context) {
    try {
        await dbConnect();
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid Product ID format' }, { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return new Response(null, { status: 204 });

    } catch (error: unknown) {
        let errorMessage = 'An error occurred during product deletion.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error('API Error deleting product:', errorMessage);
        return NextResponse.json({ error: 'Failed to delete product', details: errorMessage }, { status: 500 });
    }
}