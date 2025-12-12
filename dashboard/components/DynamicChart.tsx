// components/DynamicChart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
// Importamos los 5 tipos de gráfico: Bar, Line, Pie, Doughnut, Radar
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale, // Necesario para el gráfico de Radar
} from 'chart.js';

// Deben registrar todos los elementos de Chart.js que están utilizando
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

// Definición de tipos para el estado de Redux
type GraphType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
    // ... otros campos
}

// Opciones de gráfico comunes para mejorar la responsividad
const chartOptions = {
    responsive: true,
    // Importante: permite que el tamaño del gráfico sea controlado por el contenedor (h-80)
    maintainAspectRatio: false,
};

// Generación de datos
const generateChartData = (products: Product[]) => {
    // Lógica simple para ejemplo: contar productos por categoría
    const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(categoryCounts);
    const dataValues = Object.values(categoryCounts);

    const colors = [
        'rgba(255, 99, 132, 0.8)', // Rosa/Rojo
        'rgba(54, 162, 235, 0.8)', // Azul
        'rgba(255, 206, 86, 0.8)', // Amarillo
        'rgba(75, 192, 192, 0.8)', // Verde
        'rgba(153, 102, 255, 0.8)' // Púrpura
    ];

    const borderColors = [
        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'
    ];

    return {
        labels: labels,
        datasets: [{
            label: '# de Productos',
            data: dataValues,
            // Usamos los colores según el tipo de gráfico (ArcElement usa BackgroundColor)
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1,
        }],
    };
};

const DynamicChart: React.FC = () => {
    // Usamos GraphType para el tipo de gráfico
    const { category, dateRange, graphType } = useAppSelector((state) => state.data) as { category: string, dateRange: string, graphType: GraphType };
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Implementación de Fetch: Añadir filtros de categoría/fecha al fetch si la API lo soporta.
                // Por ahora, se mantiene el filtrado local.
                const res = await fetch('/api/products');
                const allProducts: Product[] = await res.json();

                const filteredProducts = allProducts.filter(p =>
                    category === 'all' || p.category.toLowerCase() === category.toLowerCase()
                    // Lógica de filtrado por dateRange (si el modelo Product tuviera una fecha)
                );

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, dateRange]);

    if (loading) return <div className="text-center p-8">Cargando datos...</div>;
    if (products.length === 0) return <div className="text-center p-8">No hay datos para mostrar con los filtros aplicados.</div>;

    const chartData = generateChartData(products); // Ya no necesitamos pasar graphType aquí

    // Lógica para seleccionar el componente de gráfico basado en Redux
    let ChartComponent;

    if (graphType === 'line') {
        ChartComponent = <Line data={chartData} options={chartOptions} />;
    } else if (graphType === 'pie') {
        ChartComponent = <Pie data={chartData} options={chartOptions} />;
    } else if (graphType === 'doughnut') {
        ChartComponent = <Doughnut data={chartData} options={chartOptions} />; // Gráfico de Dona
    } else if (graphType === 'radar') {
        ChartComponent = <Radar data={chartData} options={chartOptions} />; // Gráfico de Radar
    } else {
        // Por defecto o 'bar'
        ChartComponent = <Bar data={chartData} options={chartOptions} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl w-full h-80" >
            <h3 className="text-xl font-semibold mb-4">Visualización de Productos por Categoría ({graphType.toUpperCase()})</h3>
            <div className="h-full w-full">
                {ChartComponent}
            </div>
        </div >
    );
};

export default DynamicChart;