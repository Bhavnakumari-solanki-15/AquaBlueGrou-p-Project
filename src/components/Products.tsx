import React from 'react';
import { ArrowRight } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            title="RAS Equipment"
            description="State-of-the-art recirculating aquaculture systems"
            link="/ras-equipment"
          />
          <ProductCard
            title="Testing Kits"
            description="Professional water quality monitoring solutions"
            link="/testing-kits"
          />
          <ProductCard
            title="Catalog"
            description="Browse our complete product collection"
            link="/catalog"
          />
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  title: string;
  description: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, link }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        className="inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default Products;