'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'electronics',
    description: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            price: Number(formData.price)
        }),
      });

      if (res.ok) {
        alert('Producto creado exitosamente!');
        setFormData({ title: '', price: '', category: 'electronics', description: '', image: '' });
        setIsOpen(false);
        window.location.reload();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-bold transition flex items-center gap-2"
        >
          + Agregar Nuevo Producto
        </button>
      )}

      {isOpen && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-4 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Nuevo Producto</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 font-bold">X</button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input 
                type="text" name="title" required value={formData.title} onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md" placeholder="Ej: iPhone 15"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input 
                type="number" name="price" required value={formData.price} onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md" placeholder="Ej: 999.99"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select 
                name="category" value={formData.category} onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md"
              >
                <option value="electronics">Electrónica</option>
                <option value="clothing">Ropa</option>
                <option value="home">Hogar</option>
                <option value="toys">Juguetes</option>
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
              <input 
                type="text" name="image" value={formData.image} onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md" placeholder="https://..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea 
                name="description" required value={formData.description} onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md h-24" placeholder="Detalles del producto..."
              />
            </div>

            <div className="col-span-2 flex justify-end gap-3 mt-2">
              <button 
                type="button" onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                type="submit" disabled={loading}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Guardando...' : 'Guardar Producto'}
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}