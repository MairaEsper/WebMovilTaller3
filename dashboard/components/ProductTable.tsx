'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';

interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    createdAt: string;
}

const ProductTable: React.FC = () => {
    const { category, dateRange } = useAppSelector((state) => state.data);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/products');
                const allProducts: Product[] = await res.json();
                const filteredProducts = allProducts.filter(p => 
                    category === 'all' || p.category.toLowerCase() === category.toLowerCase()
                );
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products for table:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, dateRange]);

    if (loading) return <p className="text-center py-4">Cargando tabla de datos...</p>;

    return (
        <div className="bg-white p-4 rounded-lg shadow-xl overflow-x-auto mt-6">
            <h3 className="text-xl font-semibold mb-4">Registros de Productos</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link href={`/products/${product._id}`} className="text-indigo-600 hover:text-indigo-900">
                                    Ver Detalle
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;