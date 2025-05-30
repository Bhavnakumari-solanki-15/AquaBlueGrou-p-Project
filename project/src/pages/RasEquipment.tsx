import React from 'react';

const RasEquipment: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">RAS Equipment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Filtration Systems</h2>
          <p className="text-gray-600">
            Advanced filtration solutions for optimal water quality management.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Monitoring Equipment</h2>
          <p className="text-gray-600">
            State-of-the-art monitoring systems for precise control of water parameters.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RasEquipment;