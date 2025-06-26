import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Leaf, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { Dialog } from '@headlessui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  features: string[];
  category: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Maintenance: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const { addToCart } = useCart();
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
    description: ''
  });
  const [orderLoading, setOrderLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products for Maintenance page...');
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Maintenance'); // Filter by category

      if (error) {
        console.error('Error fetching maintenance products:', error);
      } else {
        console.log('Successfully fetched data for Maintenance:', data);
        if (data && data.length > 0) {
          console.log('Type of data[0].features:', typeof data[0].features, ', Value:', data[0].features);
        }
        setProducts(data || []);
      }
      setLoading(false);
      console.log('Loading state set to false for Maintenance.');
    };

    fetchProducts();
  }, []);

  const openOrderModal = (product: Product) => {
    setOrderProduct(product);
    setOrderForm({ name: '', phone: '', email: '', address: '', quantity: 1, description: '' });
    setOrderModalOpen(true);
  };
  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setOrderProduct(null);
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
  };
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign up or log in to continue.');
      navigate(`/signup?redirectTo=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!orderProduct) return;
    setOrderLoading(true);
    try {
      const { error } = await supabase.from('orders').insert([
        {
          product_id: orderProduct.id,
          name: orderForm.name,
          phone: orderForm.phone,
          email: orderForm.email,
          address: orderForm.address,
          quantity: parseInt(orderForm.quantity as any, 10),
          description: orderForm.description
        }
      ]);
      if (error) throw error;
      alert('Order submitted successfully!');
      closeOrderModal();
    } catch (err: any) {
      alert('Error submitting order: ' + err.message);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
            <motion.h1 
              className="text-6xl font-bold text-purple-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Maintenance
            </motion.h1>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore our premium range of maintenance products designed for optimal care.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {loading ? (
            <p className="text-center text-gray-700 col-span-full">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-700 col-span-full">No maintenance products found.</p>
          ) : (
            products.map((product, idx) => (
              <motion.div 
                key={product.id || idx} 
                className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {product.image_url && (
                      <div className="w-32 h-44 rounded-lg shadow-md bg-gray-100 flex items-center justify-center">
                        {!imageErrors[product.image_url] ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-contain rounded-lg"
                            loading="lazy"
                            onError={() => handleImageError(product.image_url)}
                          />
                        ) : (
                          <div className="text-gray-400 text-center p-2">
                            <Package className="w-8 h-8 mx-auto mb-2" />
                            <span className="text-xs">Image not available</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                  <div className="flex-grow">
                    <motion.div 
                      className="flex items-center gap-2 mb-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Package className="w-6 h-6 text-purple-500" /> {/* Default icon */}
                      <h2 className="text-2xl font-semibold text-purple-700">{product.name}</h2>
                    </motion.div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-purple-700">₹{product.price.toFixed(2)}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {product.features && Array.isArray(product.features) && product.features.map((feature, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-center gap-2 text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.span 
                            className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                            whileHover={{ scale: 1.5 }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      onClick={() => openOrderModal(product)}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
        {/* Order Modal */}
        <Dialog open={orderModalOpen} onClose={closeOrderModal} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-8 z-10">
              <Dialog.Title className="text-2xl font-bold mb-4 text-purple-800">Order {orderProduct?.name}</Dialog.Title>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" value={orderForm.name} onChange={handleOrderChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input name="phone" value={orderForm.phone} onChange={handleOrderChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={orderForm.email} onChange={handleOrderChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea name="address" value={orderForm.address} onChange={handleOrderChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input name="quantity" type="number" min="1" value={orderForm.quantity} onChange={handleOrderChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                  <textarea name="description" value={orderForm.description} onChange={handleOrderChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={closeOrderModal} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={orderLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {orderLoading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Maintenance; 