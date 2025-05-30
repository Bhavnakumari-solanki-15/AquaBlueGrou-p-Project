import React from 'react';

const Products: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">RAS Equipment</h2>
          <p className="text-gray-600 mb-4">
            Complete range of recirculating aquaculture system equipment.
          </p>
          <a href="/ras-equipment" className="text-blue-600 hover:text-blue-700">
            View Details
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Testing Kits</h2>
          <p className="text-gray-600 mb-4">
            Professional water quality testing and monitoring solutions.
          </p>
          <a href="/testing-kits" className="text-blue-600 hover:text-blue-700">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default Products;