import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { toast } from 'sonner'; // Assuming you have a toast notification library like Sonner

const AddRASEquipment: React.FC = () => {
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
        .insert([{ title: name, description, image_url: imageUrl, price: productPrice, features: featuresArray, category: 'RASEquipments' }]);

      if (error) {
        throw error;
      }

      toast.success('RAS Equipment product added successfully!');
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
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Add New RAS Equipment</h1>
          <p className="text-lg text-gray-700">Fill in the details below to add a new RAS equipment product to your inventory.</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <motion.div variants={fadeInUp}>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200 resize-none"
              ></textarea>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
                min="0"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label htmlFor="features" className="block text-gray-700 text-sm font-bold mb-2">Features (comma-separated):</label>
              <input
                type="text"
                id="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="e.g., Feature 1, Feature 2, Feature 3"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddRASEquipment; 