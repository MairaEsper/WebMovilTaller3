// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';

interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    createdAt: string;
}

// Función para obtener los datos de un producto específico
async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`, {
             // Cachear si es necesario, o no-cache para datos en tiempo real
             cache: 'no-store' 
        });

        if (res.status === 404) return null;
        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.statusText}`);
        }

        return res.json();

    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
}

interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
    const params = await props.params; // <--- Esperamos a que se resuelva la promesa
    const { id } = params;
    
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-700">{product.title}</h1>
                <p className="text-gray-600">Detalle del Registro ID: {product._id}</p>
            </header>

            <div className="bg-white shadow-xl rounded-lg p-6 max-w-4xl mx-auto">
                {product.image && (
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-64 object-cover rounded-lg mb-6" 
                    />
                )}

                <h2 className="text-2xl font-semibold mb-4">Información</h2>
                <div className="space-y-4">
                    <p><strong>Categoría:</strong> <span className="text-indigo-600">{product.category}</span></p>
                    <p><strong>Precio:</strong> <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span></p>
                    <p><strong>Descripción:</strong> {product.description}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="mt-6 flex gap-4">
                    <a href="/" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Volver al Dashboard</a>
                </div>
            </div>
        </div>
    );
}