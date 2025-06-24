-- Create tables for form submissions

-- Join Us table
CREATE TABLE IF NOT EXISTS join_us (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Us table
CREATE TABLE IF NOT EXISTS contact_us (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    email TEXT NOT NULL,
    description TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenant Down table
CREATE TABLE IF NOT EXISTS tenant_down (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    tenant_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE join_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_down ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts on join_us" ON join_us
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on contact_us" ON contact_us
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on tenant_down" ON tenant_down
    FOR INSERT WITH CHECK (true);

-- Create policies to allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to read join_us" ON join_us
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read contact_us" ON contact_us
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read tenant_down" ON tenant_down
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy to allow admins to delete from join_us
CREATE POLICY "Allow admins to delete join_us" ON join_us
    FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admins));

-- Policy to allow admins to delete from contact_us
CREATE POLICY "Allow admins to delete contact_us" ON contact_us
    FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admins));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_join_us_created_at ON join_us(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_us_created_at ON contact_us(created_at);
CREATE INDEX IF NOT EXISTS idx_tenant_down_created_at ON tenant_down(created_at); 