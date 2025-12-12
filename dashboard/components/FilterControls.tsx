'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'; 
import { setDateRange, setCategory, setGraphType } from '@/lib/slices/dataSlice';

type GraphType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

const dateOptions = ['last 7 days', 'last 30 days', 'all time'];
const categoryOptions = ['all', 'electronics', 'apparel', 'food'];

const FilterControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dateRange, category, graphType } = useAppSelector((state) => state.data);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Rango de Fecha</label>
                <select
                    id="dateRange"
                    value={dateRange}
                    onChange={(e) => dispatch(setDateRange(e.target.value))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {dateOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {categoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="graphType" className="block text-sm font-medium text-gray-700">Tipo de Gráfico</label>
                <select
                    id="graphType"
                    onChange={(e) => dispatch(setGraphType(e.target.value as GraphType))} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={graphType}
                >
                    <option value="bar">Barras</option>
                    <option value="line">Líneas</option>
                    <option value="pie">Torta</option>
                    <option value="doughnut">Dona</option>
                    <option value="radar">Radar</option>
                </select>
            </div>
        </div>
    );
};

export default FilterControls;