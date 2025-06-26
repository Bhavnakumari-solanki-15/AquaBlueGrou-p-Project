import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { useDocumentTitle, useMetaDescription } from '../hooks/useSeo';

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
  meta_title?: string;
  meta_description?: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set SEO tags dynamically
  useDocumentTitle(blog ? `${blog.meta_title || blog.title} | Aqua Blue` : 'Blog | Aqua Blue');
  useMetaDescription(blog ? blog.meta_description || blog.excerpt || '' : 'Read our latest blog posts.');

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug]);

  const fetchBlogPost = async (blogSlug: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          blog_categories(id, name)
        `)
        .eq('slug', blogSlug)
        .eq('status', 'published')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          setError('Blog post not found');
        } else {
          throw error;
        }
      } else {
        setBlog(data);
        // Increment view count
        incrementViewCount(data.id);
      }
    } catch (error: any) {
      console.error('Error fetching blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (blogId: string) => {
    try {
      await supabase.rpc('increment_view_count', { blog_id_to_update: blogId });
    } catch (error) {
      // It's okay if this fails, we don't want to bother the user.
      // We'll just log it for debugging.
      console.error('Error incrementing view count:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Blog Post Content */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {blog.blog_categories?.name && (
              <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                {blog.blog_categories.name}
              </span>
            )}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  {blog.tags.join(', ')}
                </span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d215b] mb-4">
            {blog.title}
          </h1>
          
          {blog.excerpt && (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Featured Image */}
          {blog.featured_image_url && (
            <div className="mb-8">
              <img 
                src={blog.featured_image_url} 
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-t border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    {blog.author === 'Admin' ? 'Rajaqul Islam' : blog.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {blog.author === 'Admin' ? 'Founder & Chief Executive Officer' : 'Author'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(blog.created_at)}
              </div>
              <div>
                {blog.view_count} view{blog.view_count !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={createMarkup(blog.content)}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Share this post:</span>
              <div className="flex gap-2">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  Twitter
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Facebook
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            
            <Link 
              to="/blog" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost; 