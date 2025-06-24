import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { X } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
      };
    }
  }
}

// Define types for better code quality
interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  features: string[];
  discount_price: number | null;
  discount_percentage: number | null;
}

interface SubCategory {
  id: string;
  name: string;
}

const SubCategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) {
        setError('Sub-category not found.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Fetch all sub-categories to find a match for the slug
        const { data: subCategories, error: subCatError } = await supabase
          .from('sub_categories')
          .select('id, name');

        if (subCatError) throw new Error('Could not fetch sub-categories.');

        // 2. Find the sub-category that matches the slug in the URL
        const currentSubCategory = subCategories?.find(
          (sc) => sc.name.toLowerCase().replace(/\s+/g, '-') === slug
        );

        if (!currentSubCategory) {
          throw new Error('Sub-category not found.');
        }
        setSubCategory(currentSubCategory);

        // 3. Fetch products belonging to that sub-category
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('sub_category_id', currentSubCategory.id);
        
        if (productsError) throw new Error('Could not fetch products.');

        setProducts(productsData || []);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleOrderClick = (product: Product) => {
    if (!user) {
      alert('Please sign up or log in to continue.');
      navigate(`/signup?redirectTo=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('orders').insert([
        {
          product_id: selectedProduct.id,
          name: orderForm.name,
          phone: orderForm.phone,
          email: orderForm.email,
          address: orderForm.address,
          quantity: orderForm.quantity,
          description: orderForm.description,
          status: 'pending'
        }
      ]);
      if (error) throw error;
      toast.success('Order placed successfully! We will contact you shortly.');
      setShowOrderModal(false);
      setShowSuccessModal(true);
      setOrderForm({ name: '', phone: '', email: '', address: '', quantity: 1, description: '' });
    } catch (error: any) {
      toast.error(`Error placing order: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  if (loading) {
    return <div className="text-center py-48">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-48 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-purple-800">{subCategory?.name || 'Products'}</h1>
          </motion.div>
          
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products found in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                let finalPrice = product.price;
                if (product.discount_price) {
                  finalPrice = product.price - product.discount_price;
                } else if (product.discount_percentage) {
                  finalPrice = product.price - (product.price * product.discount_percentage / 100);
                }

                const hasDiscount = finalPrice < product.price;

                return (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <img src={product.image_url || '/images/product-placeholder.png'} alt={product.name} className="w-full h-48 object-cover"/>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-purple-800">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        
                        <div className="text-2xl font-bold text-purple-600 mb-4">
                          {hasDiscount ? (
                            <div className="flex items-center gap-3">
                              <span className="text-lg text-gray-400 line-through">
                                ₹{product.price.toFixed(2)}
                              </span>
                              <span className="text-2xl font-bold text-green-600">
                                ₹{finalPrice.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span>₹{product.price.toFixed(2)}</span>
                          )}
                        </div>

                        {product.features && product.features.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm mb-2">Features:</h4>
                            <ul className="list-disc list-inside text-gray-600 text-sm">
                              {product.features.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button onClick={() => handleOrderClick(product)} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        Order Now
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative no-scrollbar">
            <button onClick={() => setShowOrderModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">Place Order for</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">{selectedProduct.name}</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" value={orderForm.name} onChange={(e) => setOrderForm({...orderForm, name: e.target.value})} required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-purple-500 focus:border-purple-500"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" value={orderForm.phone} onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})} required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-purple-500 focus:border-purple-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={orderForm.email} onChange={(e) => setOrderForm({...orderForm, email: e.target.value})} required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-purple-500 focus:border-purple-500"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea value={orderForm.address} onChange={(e) => setOrderForm({...orderForm, address: e.target.value})} required rows={3} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-purple-500 focus:border-purple-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" value={orderForm.quantity} onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value) || 1})} required min="1" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-purple-500 focus:border-purple-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea value={orderForm.description} onChange={(e) => setOrderForm({...orderForm, description: e.target.value})} rows={2} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-purple-500 focus:border-purple-500"></textarea>
              </div>
              <div className="pt-4">
                {selectedProduct && (
                  (() => {
                    let finalPrice = selectedProduct.price;
                    if (selectedProduct.discount_price) {
                      finalPrice = selectedProduct.price - selectedProduct.discount_price;
                    } else if (selectedProduct.discount_percentage) {
                      finalPrice = selectedProduct.price - (selectedProduct.price * selectedProduct.discount_percentage / 100);
                    }
                    return (
                      <button type="submit" disabled={submitting} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300">
                        {submitting ? 'Placing Order...' : `Submit Order (₹${(finalPrice * orderForm.quantity).toFixed(2)})`}
                      </button>
                    );
                  })()
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
            <dotlottie-player
              src="https://lottie.host/be17909e-7124-4836-bcad-806413361c2d/qHGGqgDr3H.lottie"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '250px', margin: '0 auto' }}
              loop
              autoplay
            ></dotlottie-player>
            <h2 className="text-2xl font-bold text-purple-800 mt-4 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. We'll be in touch shortly.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SubCategoryProducts; 