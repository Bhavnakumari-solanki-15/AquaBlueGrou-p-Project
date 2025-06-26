import React, { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
}

// IMPORTANT: Use this page to add ALL products, including Maintenance, Pre-Starter, and Biofloc Equipment.
// Always select the correct category from the dropdown for proper display on product pages.
// Do NOT use any old/special add pages for these categories.

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string>('');

  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const [discountAmount, setDiscountAmount] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    const fetchParentCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) {
        toast.error('Failed to fetch parent categories.');
        console.error(error);
      } else {
        setParentCategories(data || []);
      }
    };
    fetchParentCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedParentCategory) {
        setSubCategories([]);
        setSelectedSubCategory('');
        return;
      }
      const { data, error } = await supabase
        .from('sub_categories')
        .select('id, name')
        .eq('category_id', selectedParentCategory);
      
      if (error) {
        toast.error('Failed to fetch sub-categories.');
        console.error(error);
      } else {
        setSubCategories(data || []);
        if (data && data.length > 0) {
          setSelectedSubCategory(data[0].id);
        } else {
          setSelectedSubCategory('');
        }
      }
    };
    fetchSubCategories();
  }, [selectedParentCategory]);

  useEffect(() => {
    // Calculate discounted price
    const productPrice = parseFloat(price);
    let discounted = '';
    if (discountAmount) {
      const discount = parseFloat(discountAmount);
      if (!isNaN(productPrice) && !isNaN(discount)) {
        discounted = (productPrice - discount).toFixed(2);
      }
    } else if (discountPercent) {
      const percent = parseFloat(discountPercent);
      if (!isNaN(productPrice) && !isNaN(percent)) {
        discounted = (productPrice - (productPrice * percent / 100)).toFixed(2);
      }
    }
    setFinalPrice(discounted);
  }, [price, discountAmount, discountPercent]);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(''); // Clear URL when a file is selected
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedSubCategory) {
        toast.error('Please select a sub-category.');
        setLoading(false);
        return;
    }

    const featuresArray = features.split(',').map(f => f.trim()).filter(f => f !== '');
    const productPrice = parseFloat(price);
    const discount_price = discountAmount ? parseFloat(discountAmount) : null;
    const discount_percentage = discountPercent ? parseFloat(discountPercent) : null;

    if (isNaN(productPrice)) {
      toast.error('Please enter a valid price.');
      setLoading(false);
      return;
    }

    let finalImageUrl = imageUrl;

    try {
      if (uploadMethod === 'upload' && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        finalImageUrl = urlData.publicUrl;
      }

      const { data, error } = await supabase
        .from('products')
        .insert([{ name, description, image_url: finalImageUrl, price: productPrice, features: featuresArray, sub_category_id: selectedSubCategory, discount_price, discount_percentage }]);

      if (error) {
        throw error;
      }

      toast.success('Product added successfully!');
      // Clear form
      setName('');
      setDescription('');
      setImageUrl('');
      setImageFile(null);
      setImagePreview('');
      setPrice('');
      setFeatures('');
      setDiscountAmount('');
      setDiscountPercent('');
      setFinalPrice('');
      setSelectedParentCategory('');
      setSelectedSubCategory('');

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 pt-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Add New Product</h1>
          <p className="text-lg text-gray-700">Fill in the details below to add a new product to your inventory.</p>
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
              <label htmlFor="parent-category" className="block text-gray-700 text-sm font-bold mb-2">Parent Category:</label>
              <select
                id="parent-category"
                value={selectedParentCategory}
                onChange={(e) => setSelectedParentCategory(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-200"
              >
                <option value="">Select Parent Category</option>
                {parentCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <label htmlFor="sub-category" className="block text-gray-700 text-sm font-bold mb-2">Sub-Category:</label>
              <select
                id="sub-category"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                required
                disabled={!selectedParentCategory || subCategories.length === 0}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-200 disabled:bg-gray-200"
              >
                <option value="">Select Sub-Category</option>
                {subCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </motion.div>

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
              <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadMethod"
                    value="url"
                    checked={uploadMethod === 'url'}
                    onChange={() => {
                      setUploadMethod('url');
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="form-radio h-4 w-4 text-purple-600"
                  />
                  <span className="ml-2 text-gray-700">From URL</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadMethod"
                    value="upload"
                    checked={uploadMethod === 'upload'}
                    onChange={() => {
                      setUploadMethod('upload');
                      setImageUrl('');
                    }}
                    className="form-radio h-4 w-4 text-purple-600"
                  />
                  <span className="ml-2 text-gray-700">Upload File</span>
                </label>
              </div>

              {uploadMethod === 'url' ? (
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.png"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                />
              ) : (
                <input
                  type="file"
                  id="imageFile"
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/gif"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              )}
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Image Preview" className="rounded-lg max-h-48 mx-auto" />
                </div>
              )}
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="discountAmount" className="block text-gray-700 text-sm font-bold mb-2">Discount Amount (₹):</label>
                  <input
                    type="number"
                    id="discountAmount"
                    value={discountAmount}
                    onChange={e => { setDiscountAmount(e.target.value); setDiscountPercent(''); }}
                    min="0"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="discountPercent" className="block text-gray-700 text-sm font-bold mb-2">Discount Percentage (%):</label>
                  <input
                    type="number"
                    id="discountPercent"
                    value={discountPercent}
                    onChange={e => { setDiscountPercent(e.target.value); setDiscountAmount(''); }}
                    min="0"
                    max="100"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                  />
                </div>
              </div>
              {/* Live Discount Preview */}
              {finalPrice && price && parseFloat(finalPrice) < parseFloat(price) && (
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-lg text-gray-500 line-through animate-strike relative">
                    ₹{parseFloat(price).toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-green-700 animate-bounceIn">
                    ₹{finalPrice}
                  </span>
                  <span className="ml-2 text-sm text-green-700 font-semibold bg-green-100 px-2 py-1 rounded">
                    {discountAmount ? `-₹${discountAmount}` : discountPercent ? `-${discountPercent}%` : ''} OFF
                  </span>
                </div>
              )}
              <style>{`
                @keyframes strike {
                  0% { text-decoration-thickness: 0; }
                  100% { text-decoration-thickness: 2px; }
                }
                .animate-strike {
                  text-decoration: line-through;
                  animation: strike 0.5s ease;
                }
                @keyframes bounceIn {
                  0% { transform: scale(0.8); opacity: 0.5; }
                  60% { transform: scale(1.1); opacity: 1; }
                  100% { transform: scale(1); opacity: 1; }
                }
                .animate-bounceIn {
                  animation: bounceIn 0.5s;
                }
              `}</style>
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

export default AddProduct;
