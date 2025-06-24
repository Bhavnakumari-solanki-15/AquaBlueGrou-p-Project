// DEPRECATED: Please use the main Add Product page to add Testing Kits.
// This page is no longer maintained and may be removed in the future.
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { toast } from 'sonner'; // Assuming you have a toast notification library like Sonner

const AddTestingKit: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const featuresArray = features.split(',').map(f => f.trim()).filter(f => f !== '');
    const productPrice = parseFloat(price);

    if (isNaN(productPrice)) {
      toast.error('Please enter a valid price.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{ name, description, image_url: imageUrl, price: productPrice, features: featuresArray, category: 'Testing Kits' }]);

      if (error) {
        throw error;
      }

      toast.success('Testing Kit product added successfully!');
      // Clear form
      setName('');
      setDescription('');
      setImageUrl('');
      setPrice('');
      setFeatures('');

    } catch (error: any) {
      toast.error(`Error adding product: ${error.message}`);
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Add New Testing Kit</h1>
          <p className="text-lg text-gray-700">Fill in the details below to add a new testing kit product to your inventory.</p>
        </motion.div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 text-center text-xl text-red-600 font-semibold">
          This page is deprecated. Please use the main Add Product page to add Testing Kits.
        </div>
      </div>
    </div>
  );
};

export default AddTestingKit; 