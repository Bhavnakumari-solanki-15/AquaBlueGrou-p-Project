import React, { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Save, Eye, Upload, X } from 'lucide-react';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

const AddBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [author, setAuthor] = useState('Admin');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name, slug')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch categories');
      console.error(error);
    }
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeaturedImageFile(file);
      setFeaturedImageUrl('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug) {
      setSlug(generateSlug(newTitle));
    }
    if (!metaTitle) {
      setMetaTitle(newTitle);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim()) {
      toast.error('Please enter a title');
      setLoading(false);
      return;
    }

    if (!content.trim()) {
      toast.error('Please enter content');
      setLoading(false);
      return;
    }

    let finalImageUrl = featuredImageUrl;

    try {
      // Upload image if file is selected
      if (uploadMethod === 'upload' && featuredImageFile) {
        const fileExt = featuredImageFile.name.split('.').pop();
        const fileName = `blog-${Date.now()}.${fileExt}`;
        const filePath = `blog-images/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images') // Using existing bucket
          .upload(filePath, featuredImageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        finalImageUrl = urlData.publicUrl;
      }

      // Create blog post
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim(),
          featured_image_url: finalImageUrl,
          author: author.trim(),
          status,
          slug: slug.trim() || generateSlug(title),
          meta_title: metaTitle.trim(),
          meta_description: metaDescription.trim(),
          tags: tags.length > 0 ? tags : null,
          category_id: categoryId || null
        }]);

      if (error) throw error;

      toast.success('Blog post created successfully!');
      
      // Clear form
      setTitle('');
      setContent('');
      setExcerpt('');
      setFeaturedImageUrl('');
      setFeaturedImageFile(null);
      setImagePreview('');
      setAuthor('Admin');
      setStatus('draft');
      setSlug('');
      setMetaTitle('');
      setMetaDescription('');
      setTags([]);
      setCategoryId('');

    } catch (error: any) {
      toast.error(`Error creating blog post: ${error.message}`);
      console.error('Error creating blog post:', error);
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
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Create New Blog Post</h1>
          <p className="text-lg text-gray-700">Write and publish engaging content for your audience.</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* Title */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                placeholder="Enter your blog title..."
              />
            </motion.div>

            {/* Slug */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
                URL Slug
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                placeholder="blog-post-url-slug"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
            </motion.div>

            {/* Category */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-200"
              >
                <option value="">Select Category (Optional)</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </motion.div>

            {/* Featured Image */}
            <motion.div variants={fadeInUp}>
              <label className="block text-gray-700 text-sm font-bold mb-2">Featured Image</label>
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadMethod"
                    value="url"
                    checked={uploadMethod === 'url'}
                    onChange={() => {
                      setUploadMethod('url');
                      setFeaturedImageFile(null);
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
                      setFeaturedImageUrl('');
                    }}
                    className="form-radio h-4 w-4 text-purple-600"
                  />
                  <span className="ml-2 text-gray-700">Upload File</span>
                </label>
              </div>

              {uploadMethod === 'url' ? (
                <input
                  type="url"
                  value={featuredImageUrl}
                  onChange={(e) => {
                    setFeaturedImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                />
              ) : (
                <input
                  type="file"
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              )}
              
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Featured Image Preview" className="rounded-lg max-h-48 mx-auto" />
                </div>
              )}
            </motion.div>

            {/* Excerpt */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="excerpt" className="block text-gray-700 text-sm font-bold mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200 resize-none"
                placeholder="Brief summary of your blog post..."
              />
              <p className="text-xs text-gray-500 mt-1">A short description that appears in blog listings</p>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200 resize-none"
                placeholder="Write your blog content here... You can use basic HTML tags like <strong>, <em>, <br>, <h2>, <h3>, etc."
              />
              <p className="text-xs text-gray-500 mt-1">Supports basic HTML formatting</p>
            </motion.div>

            {/* Tags */}
            <motion.div variants={fadeInUp}>
              <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag..."
                  className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Author */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                placeholder="Author name"
              />
            </motion.div>

            {/* Status */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-200"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </motion.div>

            {/* SEO Fields */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="metaTitle" className="block text-gray-700 text-sm font-bold mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200"
                    placeholder="SEO title for search engines"
                  />
                </div>
                <div>
                  <label htmlFor="metaDescription" className="block text-gray-700 text-sm font-bold mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 transition duration-200 resize-none"
                    placeholder="SEO description for search engines"
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeInUp}>
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Blog Post...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Blog Post
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddBlog; 