import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'FISH DISEASES: SYMPTOMS & TREATMENTS',
    excerpt: 'Learn about the seven major diseases of fishes, including bacterial, fungal, and parasitic infections. Understand their symptoms and various treatment methods to maintain healthy fish.',
    image: '/images/image11.jpg', // Use image11.jpg as the featured image
    link: '/blog/fish-diseases', // Link to the internal blog post page
  },
];

const Blog: React.FC = () => {
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

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: '#f3d9da' }}>
                {/* Featured Image */}
                <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Text Content */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#2d215b] mb-2">{post.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center mt-4">
                    {/* Add author image here if available in data */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Written by Rajaqul Islam</p>
                      <p className="text-xs text-gray-500">Founder & Chief Executive Officer</p>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <a href="/blog/fish-diseases" className="text-blue-600 hover:underline font-semibold mt-4 inline-block">
                    Read more &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;