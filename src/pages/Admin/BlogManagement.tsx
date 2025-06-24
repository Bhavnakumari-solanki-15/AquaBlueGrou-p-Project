import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit, Trash2, Eye, Plus, Search, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import BlogCategoryManagement from './BlogCategoryManagement';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  slug: string;
  tags: string[] | null;
  view_count: number;
  created_at: string;
  updated_at: string;
  blog_categories: {
    id: string;
    name: string;
  } | null;
}

interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          blog_categories(id, name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast.error(`Error fetching blogs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name, slug, description')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast.error(`Error fetching categories: ${error.message}`);
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             blog.blog_categories?.id === selectedCategory;
      
      const matchesStatus = selectedStatus === 'all' || blog.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchTerm, selectedCategory, selectedStatus]);

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogToDelete.id);
      
      if (error) throw error;
      
      toast.success('Blog post deleted successfully!');
      fetchBlogs(); // Refresh the list
    } catch (error: any) {
      toast.error(`Error deleting blog: ${error.message}`);
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Link 
          to="/admin/add-blog" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
        >
          <Plus size={20} className="mr-2"/>
          Add Blog Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Posts</h3>
          <p className="text-2xl font-bold">{blogs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Published</h3>
          <p className="text-2xl font-bold text-green-600">
            {blogs.filter(b => b.status === 'published').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Drafts</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {blogs.filter(b => b.status === 'draft').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Categories</h3>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg p-2 pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={blog.featured_image_url || '/images/blog-placeholder.png'}
                            alt={blog.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {blog.excerpt?.substring(0, 100)}...
                          </div>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex items-center mt-1">
                              <Tag size={12} className="text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">
                                {blog.tags.slice(0, 2).join(', ')}
                                {blog.tags.length > 2 && ` +${blog.tags.length - 2}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {blog.blog_categories?.name || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <User size={14} className="text-gray-400 mr-1" />
                        {blog.author}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar size={14} className="text-gray-400 mr-1" />
                        {formatDate(blog.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {blog.view_count}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteClick(blog)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Get started by creating your first blog post'}
            </p>
            {!searchTerm && selectedCategory === 'all' && selectedStatus === 'all' && (
              <Link
                to="/admin/add-blog"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                <Plus size={16} className="mr-2" />
                Create Blog Post
              </Link>
            )}
          </div>
        )}
      </div>

      <BlogCategoryManagement categories={categories} onCategoriesUpdate={fetchCategories} />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && blogToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete "<strong>{blogToDelete.title}</strong>"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement; 