-- Blog Database Setup
-- Run this in your Supabase SQL editor

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    author VARCHAR(100) DEFAULT 'Admin',
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    slug VARCHAR(255) UNIQUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    tags TEXT[],
    category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    slug VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some default blog categories
INSERT INTO blog_categories (name, description, slug) VALUES
('Aquaculture Tips', 'Tips and best practices for aquaculture', 'aquaculture-tips'),
('Industry News', 'Latest news and updates from the aquaculture industry', 'industry-news'),
('Product Guides', 'Guides and tutorials for our products', 'product-guides'),
('Company Updates', 'Updates about our company and services', 'company-updates')
ON CONFLICT (name) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blogs table
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs (public read, admin write)
CREATE POLICY "Public can view published blogs" ON blogs
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all blogs" ON blogs
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for blog categories (public read, admin write)
CREATE POLICY "Public can view blog categories" ON blog_categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage blog categories" ON blog_categories
    FOR ALL USING (auth.role() = 'authenticated'); 