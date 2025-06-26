import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

interface BlogCategoryManagementProps {
  categories: BlogCategory[];
  onCategoriesUpdate: () => void;
}

const BlogCategoryManagement: React.FC<BlogCategoryManagementProps> = ({ categories, onCategoriesUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!editingCategory) {
      setSlug(generateSlug(newName));
    }
  };

  const openModalForNew = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setSlug('');
    setShowModal(true);
  };

  const openModalForEdit = (category: BlogCategory) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || '');
    setSlug(category.slug || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setLoading(true);

    try {
      const categoryData = {
        name: name.trim(),
        description: description.trim(),
        slug: slug.trim() || generateSlug(name),
      };

      let error;

      if (editingCategory) {
        // Update
        const { error: updateError } = await supabase
          .from('blog_categories')
          .update(categoryData)
          .eq('id', editingCategory.id);
        error = updateError;
      } else {
        // Insert
        const { error: insertError } = await supabase
          .from('blog_categories')
          .insert([categoryData]);
        error = insertError;
      }

      if (error) throw error;
      
      toast.success(`Category ${editingCategory ? 'updated' : 'created'} successfully!`);
      onCategoriesUpdate(); // Refresh categories in parent
      closeModal();
    } catch (error: any) {
      toast.error(`Error saving category: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category: BlogCategory) => {
    if (window.confirm(`Are you sure you want to delete the category "${category.name}"? This cannot be undone.`)) {
      try {
        const { error } = await supabase
          .from('blog_categories')
          .delete()
          .eq('id', category.id);
        
        if (error) throw error;
        toast.success('Category deleted successfully');
        onCategoriesUpdate();
      } catch (error: any) {
        toast.error(`Error deleting category: ${error.message}. Make sure no blogs are assigned to it.`);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Manage Categories</h3>
        <button
          onClick={openModalForNew}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>

      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-xs text-gray-500">/{cat.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openModalForEdit(cat)} className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
              <button onClick={() => handleDelete(cat)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-center text-gray-500 py-4">No categories found. Add one to get started.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">{editingCategory ? 'Edit' : 'Add'} Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cat-name" className="block text-sm font-medium text-gray-700">Category Name *</label>
                <input
                  type="text"
                  id="cat-name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="cat-slug" className="block text-sm font-medium text-gray-700">URL Slug</label>
                <input
                  type="text"
                  id="cat-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                />
                 <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
              </div>
              <div>
                <label htmlFor="cat-desc" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="cat-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCategoryManagement; 