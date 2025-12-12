import FilterControls from '@/components/FilterControls';
import DynamicChart from '@/components/DynamicChart';
import ProductTable from '@/components/ProductTable';
import AddProductForm from '@/components/AddProductForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Productos DataMobile</h1>
        <p className="text-gray-600">Visualización interactiva en tiempo real.</p>
      </header>

      <AddProductForm />
      
      <FilterControls />
      <div className="grid grid-cols-1 gap-6"> 
          <DynamicChart /> 
      </div>
      <ProductTable />
    </main>
  );
}