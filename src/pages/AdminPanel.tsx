import React, { useEffect, useState } from 'react';
import { FormService } from '../services/formService';
import { supabase } from '../lib/supabase';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { TABLES } from '../types/forms';
import { useAuth } from '../context/AuthContext';
import ProductManagement from './Admin/ProductManagement';
import BlogManagement from './Admin/BlogManagement';

const AdminPanel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  
  // Read tab from query param on mount
  const getTabFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    return tab === 'join' ? 'join' : tab === 'products' ? 'products' : tab === 'blogs' ? 'blogs' : 'contact';
  };
  
  const [activeTab, setActiveTab] = useState<'contact' | 'join' | 'products' | 'blogs'>(getTabFromQuery());
  const [contactData, setContactData] = useState<any[]>([]);
  const [joinData, setJoinData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update tab if URL changes
  useEffect(() => {
    setActiveTab(getTabFromQuery());
  }, [location.search]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'products' || activeTab === 'blogs') return; // Products and Blogs tabs handle their own data
      
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'contact') {
          const { data, error } = await supabase.from(TABLES.CONTACT_US).select('*').order('created_at', { ascending: false });
          if (error) throw error;
          setContactData(data || []);
        } else if (activeTab === 'join') {
          const { data, error } = await supabase.from(TABLES.JOIN_US).select('*').order('created_at', { ascending: false });
          if (error) throw error;
          setJoinData(data || []);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // Delete handlers
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    setLoading(true);
    setError(null);
    try {
      let result;
      if (activeTab === 'contact') {
        result = await FormService.deleteContactUsSubmission(id);
        if (result?.success) setContactData(prev => prev.filter((row) => row.id !== id));
      } else if (activeTab === 'join') {
        result = await FormService.deleteJoinUsSubmission(id);
        if (result?.success) setJoinData(prev => prev.filter((row) => row.id !== id));
      }
      if (result && !result.success) throw new Error(result.error);
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  // CSV Download
  const downloadCSV = (rows: any[], type: 'contact' | 'join') => {
    if (!rows.length) return;
    const replacer = (_key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(','),
      ...rows.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_submissions.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Table renderers
  const renderTable = (rows: any[], type: 'contact' | 'join') => (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg">
        <thead>
          <tr>
            {Object.keys(rows[0] || {}).map((key) => (
              <th key={key} className="px-4 py-2 border-b bg-gray-50 text-left text-xs font-semibold text-gray-700">{key.replace(/_/g, ' ')}</th>
            ))}
            <th className="px-4 py-2 border-b bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {Object.entries(row).map(([key, value]) => (
                <td key={key} className="px-4 py-2 border-b text-sm">
                  {key === 'file_url' && typeof value === 'string' && value.startsWith('http') ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
                  ) : (
                    value === null || value === undefined || (typeof value === 'object' && Object.keys(value).length === 0)
                      ? ''
                      : (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
                        ? String(value)
                        : JSON.stringify(value)
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border-b text-sm">
                <button onClick={() => handleDelete(row.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Tab switcher updates URL
  const handleTabSwitch = (tab: 'contact' | 'join' | 'products' | 'blogs') => {
    navigate(`/admin?tab=${tab}`);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading admin panel...</div>;
  }

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Access Denied: You are not authorized to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#2d215b]">Admin Panel</h1>
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${activeTab === 'contact' ? 'bg-[#6a4da8] text-white border-[#6a4da8]' : 'bg-white text-[#6a4da8] border-[#6a4da8]'}`}
            onClick={() => handleTabSwitch('contact')}
          >
            Contact Us Submissions
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${activeTab === 'join' ? 'bg-[#6a4da8] text-white border-[#6a4da8]' : 'bg-white text-[#6a4da8] border-[#6a4da8]'}`}
            onClick={() => handleTabSwitch('join')}
          >
            Join Us Submissions
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${activeTab === 'products' ? 'bg-[#6a4da8] text-white border-[#6a4da8]' : 'bg-white text-[#6a4da8] border-[#6a4da8]'}`}
            onClick={() => handleTabSwitch('products')}
          >
            Products Management
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${activeTab === 'blogs' ? 'bg-[#6a4da8] text-white border-[#6a4da8]' : 'bg-white text-[#6a4da8] border-[#6a4da8]'}`}
            onClick={() => handleTabSwitch('blogs')}
          >
            Blog Management
          </button>
          <Link
            to="/admin/team"
            className="px-6 py-2 rounded-lg font-semibold border transition-colors bg-white text-[#6a4da8] border-[#6a4da8] hover:bg-gray-100"
          >
            Team Management
          </Link>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        
        {/* Products Tab Content */}
        {activeTab === 'products' && <ProductManagement />}
        
        {/* Blogs Tab Content */}
        {activeTab === 'blogs' && <BlogManagement />}
        
        {/* Contact and Join Tab Content */}
        {activeTab !== 'products' && activeTab !== 'blogs' && (
          <>
            <div className="mb-4 flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold"
                onClick={() => downloadCSV(activeTab === 'contact' ? contactData : joinData, activeTab)}
                disabled={loading || (activeTab === 'contact' ? contactData.length === 0 : joinData.length === 0)}
              >
                Download CSV
              </button>
            </div>
            {loading ? (
              <div className="text-center py-12 text-lg text-gray-500">Loading...</div>
            ) : (
              <div>
                {activeTab === 'contact' && contactData.length > 0 && renderTable(contactData, 'contact')}
                {activeTab === 'join' && joinData.length > 0 && renderTable(joinData, 'join')}
                {activeTab === 'contact' && contactData.length === 0 && <div className="text-center text-gray-400 py-12">No contact us submissions found.</div>}
                {activeTab === 'join' && joinData.length === 0 && <div className="text-center text-gray-400 py-12">No join us submissions found.</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;  