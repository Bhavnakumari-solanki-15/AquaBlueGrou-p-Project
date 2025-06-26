import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';

interface Category {
  id: string;
  name: string;
}

const AddSubCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subCategoryName, setSubCategoryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) {
        console.error('Error fetching categories:', error);
      } else if (data) {
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!selectedCategory || !subCategoryName) {
      setError('Please select a category and provide a sub-category name.');
      setIsLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('sub_categories').insert({
      name: subCategoryName,
      category_id: selectedCategory,
    });

    if (insertError) {
      setError(`Error adding sub-category: ${insertError.message}`);
    } else {
      setSuccess('Sub-category added successfully!');
      setSubCategoryName('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 pt-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Add New Sub-Category</h1>
          <p className="text-lg text-gray-700">Select a parent category and enter the name for the new sub-category.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                Parent Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                className="block appearance-none w-full bg-white border border-purple-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-200"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subCategoryName" className="block text-gray-700 text-sm font-bold mb-2">
                Sub-Category Name
              </label>
              <input
                id="subCategoryName"
                type="text"
                value={subCategoryName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSubCategoryName(e.target.value)}
                placeholder="Enter sub-category name"
                required
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6a4da8] hover:bg-[#583f8d] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding...' : 'Add Sub-Category'}
            </button>
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            {success && <p className="mt-4 text-center text-green-500">{success}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory; 