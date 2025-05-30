import React from 'react';

const TestingKits: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Testing Kits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Water Quality Test Kits</h2>
          <p className="text-gray-600">
            Comprehensive testing solutions for monitoring water quality parameters.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Digital Testing Equipment</h2>
          <p className="text-gray-600">
            Advanced digital meters and probes for precise measurements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestingKits;