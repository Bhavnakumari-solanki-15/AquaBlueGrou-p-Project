import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Pill, FlaskConical, Microscope } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Products: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAndRedirect = async () => {
      // Fetch the first sub-category (ordered by name or id)
      const { data, error } = await supabase
        .from('sub_categories')
        .select('name')
        .order('id', { ascending: true })
        .limit(1);
      if (data && data.length > 0) {
        // Convert name to slug (as used in SubCategoryProducts)
        const slug = data[0].name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/products/${slug}`);
      } else {
        // No sub-categories found
        // Optionally show a message
      }
    };
    fetchAndRedirect();
  }, [navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg text-gray-600">Redirecting to products...</span>
    </div>
  );
};

export default Products;