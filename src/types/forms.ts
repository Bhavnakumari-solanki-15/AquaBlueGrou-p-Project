import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Join Us Form Types
export interface JoinUsFormData {
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  area: string;
  file?: File;
}

// Contact Us Form Types
export interface ContactUsFormData {
  question: string;
  email: string;
  description: string;
  file?: File;
  createdAt?: string;
}

// Tenant Down Form Types
export interface TenantDownFormData {
  name: string;
  email: string;
  tenantUrl: string;
  description: string;
  createdAt?: string;
}

// Database table names
export const TABLES = {
  JOIN_US: 'join_us',
  CONTACT_US: 'contact_us',
  TENANT_DOWN: 'tenant_down_submissions'
} as const; 