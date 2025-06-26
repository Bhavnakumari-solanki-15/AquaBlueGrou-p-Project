import React from 'react';

const Catalog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Product Catalog</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">
          Our complete product catalog is being updated. Please check back soon or contact us
          for specific product inquiries.
        </p>
      </div>
    </div>
  );
}

export default Catalog;