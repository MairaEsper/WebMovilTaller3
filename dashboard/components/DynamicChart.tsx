'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
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
    RadialLinearScale,
} from 'chart.js';

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

type GraphType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

const generateChartData = (products: Product[]) => {
    const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(categoryCounts);
    const dataValues = Object.values(categoryCounts);

    const colors = [
        'rgba(255, 99, 132, 0.8)', 
        'rgba(54, 162, 235, 0.8)', 
        'rgba(255, 206, 86, 0.8)', 
        'rgba(75, 192, 192, 0.8)', 
        'rgba(153, 102, 255, 0.8)' 
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
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1,
        }],
    };
};

const DynamicChart: React.FC = () => {
    const { category, dateRange, graphType } = useAppSelector((state) => state.data) as { category: string, dateRange: string, graphType: GraphType };
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
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, dateRange]);

    if (loading) return <div className="text-center p-8">Cargando datos...</div>;
    if (products.length === 0) return <div className="text-center p-8">No hay datos para mostrar con los filtros aplicados.</div>;

    const chartData = generateChartData(products);

    let ChartComponent;

    if (graphType === 'line') {
        ChartComponent = <Line data={chartData} options={chartOptions} />;
    } else if (graphType === 'pie') {
        ChartComponent = <Pie data={chartData} options={chartOptions} />;
    } else if (graphType === 'doughnut') {
        ChartComponent = <Doughnut data={chartData} options={chartOptions} />;
    } else if (graphType === 'radar') {
        ChartComponent = <Radar data={chartData} options={chartOptions} />;
    } else {
        ChartComponent = <Bar data={chartData} options={chartOptions} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl w-full h-96 flex flex-col" >
            <h3 className="text-xl font-semibold mb-4 shrink-0">Visualización de Productos por Categoría ({graphType.toUpperCase()})</h3>
            <div className="flex-1 w-full min-h-0 relative">
                {ChartComponent}
            </div>
        </div >
    );
};

export default DynamicChart;