import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, User, Tag, Search } from 'lucide-react';

interface BlogPost {
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
  blog_categories: {
    id: string;
    name: string;
  } | null;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

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
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           blog.blog_categories?.id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d215b] mb-4">Blog</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Stay updated with the latest news, insights, and tips on aquaculture from the Aqua Blue Group experts.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {filteredBlogs.map((post, index) => (
                <div key={post.id} className="rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: '#f3d9da' }}>
                  {/* Featured Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <img 
                      src={post.featured_image_url || '/images/blog-placeholder.png'} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/blog-placeholder.png';
                      }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {post.blog_categories?.name && (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {post.blog_categories.name}
                          </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {post.tags.slice(0, 2).join(', ')}
                              {post.tags.length > 2 && ` +${post.tags.length - 2}`}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-semibold text-[#2d215b] mb-2">{post.title}</h2>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {truncateText(post.excerpt || post.content, 200)}
                      </p>
                    </div>

                    {/* Author Info and Date */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div>
                          <p className="text-xs font-semibold text-gray-800">
                            {post.author === 'Admin' ? 'Rajaqul Islam' : post.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {post.author === 'Admin' ? 'Founder & Chief Executive Officer' : 'Author'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(post.created_at)}
                      </div>
                    </div>

                    {/* Read More Link */}
                    <a 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:underline font-semibold mt-4 inline-block"
                    >
                      Read more &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Check back soon for new content'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;