import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit, Trash2, Eye, Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import emailjs from 'emailjs-com';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  features: string[];
  sub_category_id: string;
  discount_price: number | null;
  discount_percentage: number | null;
  sub_categories: {
    id: string;
    name: string;
    categories: {
      id: string;
      name: string;
    } | null;
  } | null;
}

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

interface Order {
  id: string;
  product_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  quantity: number;
  description: string;
  created_at?: string;
  product?: Product;
  status?: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  
  const [selectedParentCategory, setSelectedParentCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Product | Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    image_url: '',
    price: '',
    features: '',
    parentCategoryId: '',
    subCategoryId: '',
    discount_price: '',
    discount_percentage: ''
  });
  const [view, setView] = useState<'products' | 'orders' | 'categories'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderCategory, setOrderCategory] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmAction, setConfirmAction] = useState<'confirm' | 'reject' | 'delete' | null>(null);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [ordersPage, setOrdersPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const ORDERS_PER_PAGE = 10;
  const PRODUCTS_PER_PAGE = 10;
  const [modalSubCategories, setModalSubCategories] = useState<SubCategory[]>([]);
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newSubCategoryParentId, setNewSubCategoryParentId] = useState('');
  const [showEditSubCategoryModal, setShowEditSubCategoryModal] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState('');
  const [editSubCategoryParentId, setEditSubCategoryParentId] = useState('');

  const categories = [
    'all',
    'Premium Hatchery Feed',
    'Pre-Starter',
    'Starter',
    'Grower',
    'Finisher',
    'Maintenance',
    'ABIS ACCUASTAR',
    'Himalaya Aqua Products',
    'Alembic Aqua Products',
    'Virbac Aqua Products',
    'Fishery Equipment',
    'RAS Equipments',
    'Biofloc Equipment',
    'Testing Kits',
    'RA Fresh Fish',
    'NR Fresh Fish'
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`*, sub_categories(id, name, categories(id, name))`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast.error(`Error fetching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data: parentData, error: parentError } = await supabase.from('categories').select('*');
      if (parentError) throw parentError;
      setParentCategories(parentData || []);

      const { data: subData, error: subError } = await supabase.from('sub_categories').select('*');
      if (subError) throw subError;
      setSubCategories(subData || []);

    } catch (error: any) {
      toast.error(`Error fetching categories: ${error.message}`);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, product:product_id(*, sub_categories(id, name, categories(id, name)))`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast.error(`Error fetching orders: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    if (view === 'orders') {
      fetchOrders();
    }
  }, [view]);

  const filteredSubcategories = useMemo(() => {
    if (selectedParentCategory === 'all') {
      return subCategories;
    }
    return subCategories.filter(sc => sc.category_id === selectedParentCategory);
  }, [selectedParentCategory, subCategories]);
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const productParentCategoryId = product.sub_categories?.categories?.id;
      const matchesParentCategory = selectedParentCategory === 'all' || productParentCategoryId === selectedParentCategory;
      
      const matchesSubCategory = selectedSubCategory === 'all' || product.sub_category_id === selectedSubCategory;

      return matchesSearch && matchesParentCategory && matchesSubCategory;
    });
  }, [products, searchTerm, selectedParentCategory, selectedSubCategory]);
  
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.email.toLowerCase().includes(orderSearch.toLowerCase()) ||
        (order.product?.name || '').toLowerCase().includes(orderSearch.toLowerCase());
      
      const orderParentCategoryId = order.product?.sub_categories?.categories?.id;
      const matchesCategory = orderCategory === 'all' || orderParentCategoryId === orderCategory;

    return matchesSearch && matchesCategory;
  });
  }, [orders, orderSearch, orderCategory]);

  const handleDeleteClick = (item: Product | Order) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    const table = 'price' in itemToDelete ? 'products' : 'orders';
    try {
      const { error } = await supabase.from(table).delete().eq('id', itemToDelete.id);
      if (error) throw error;
      toast.success(`${table === 'products' ? 'Product' : 'Order'} deleted successfully!`);
      if (table === 'products') fetchProducts();
      else fetchOrders();
    } catch (error: any) {
      toast.error(`Error deleting: ${error.message}`);
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: product.price.toString(),
      features: Array.isArray(product.features) ? product.features.join(', ') : '',
      parentCategoryId: product.sub_categories?.categories?.id || '',
      subCategoryId: product.sub_category_id,
      discount_price: product.discount_price?.toString() || '',
      discount_percentage: product.discount_percentage?.toString() || ''
    });
    setShowEditModal(true);
  };

  useEffect(() => {
    if (editForm.parentCategoryId) {
        const filtered = subCategories.filter(sc => sc.category_id === editForm.parentCategoryId);
        setModalSubCategories(filtered);
    } else {
        setModalSubCategories([]);
    }
  }, [editForm.parentCategoryId, subCategories]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editForm.subCategoryId) {
      toast.error("Please select a sub-category.");
      return;
    }
    
      const featuresArray = editForm.features.split(',').map(f => f.trim()).filter(f => f !== '');
    const price = parseFloat(editForm.price);
    const discount_price = editForm.discount_price ? parseFloat(editForm.discount_price) : null;
    const discount_percentage = editForm.discount_percentage ? parseFloat(editForm.discount_percentage) : null;

    if (isNaN(price)) {
      toast.error("Please enter a valid price.");
        return;
      }

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: editForm.name,
          description: editForm.description,
          image_url: editForm.image_url,
          price,
          features: featuresArray,
          sub_category_id: editForm.subCategoryId,
          discount_price,
          discount_percentage
        })
        .eq('id', editingProduct.id);

      if (error) throw error;
      toast.success('Product updated successfully!');
      fetchProducts();
      setShowEditModal(false);
      setEditingProduct(null);
    } catch (error: any) {
      toast.error(`Error updating product: ${error.message}`);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
    setConfirmAction(null);
    setPendingOrderId(null);
  };

  const sendOrderEmail = async (order: Order, type: 'confirm' | 'reject') => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = type === 'confirm'
      ? import.meta.env.VITE_EMAILJS_CONFIRM_TEMPLATE_ID
      : import.meta.env.VITE_EMAILJS_REJECT_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      toast.error('EmailJS is not configured.');
      return;
    }
    try {
      await emailjs.send(serviceId, templateId, {
          customer_name: order.name,
          order_id: order.id,
          product_name: order.product?.name || '',
          quantity: order.quantity,
          email: order.email,
          status: type === 'confirm' ? 'confirmed' : 'rejected',
      }, publicKey);
      toast.success(`Order ${type} email sent!`);
    } catch (err: any) {
      toast.error('Failed to send email: ' + (err?.text || 'Unknown error'));
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'done' | 'rejected', emailType: 'confirm' | 'reject') => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
      if (error) throw error;
      toast.success(`Order ${status}!`);
      const order = orders.find(o => o.id === orderId);
      if (order) await sendOrderEmail(order, emailType);
      fetchOrders();
    } catch (error: any) {
      toast.error(`Error updating order: ${error.message}`);
    } finally {
      handleCloseOrderModal();
    }
  };

  const handleEditSubCategory = (sub: SubCategory) => {
    setEditingSubCategory(sub);
    setEditSubCategoryName(sub.name);
    setEditSubCategoryParentId(sub.category_id);
    setShowEditSubCategoryModal(true);
  };

  const handleDeleteSubCategory = async (sub: SubCategory) => {
    try {
      const { error } = await supabase.from('sub_categories').delete().eq('id', sub.id);
      if (error) throw error;
      toast.success('Sub-category deleted successfully!');
      fetchCategories();
    } catch (error: any) {
      toast.error(`Error deleting sub-category: ${error.message}`);
    }
  };

  const handleUpdateSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubCategory) return;

    try {
      const { data, error } = await supabase
        .from('sub_categories')
        .update({
          name: editSubCategoryName,
          category_id: editSubCategoryParentId
        })
        .eq('id', editingSubCategory.id);

      if (error) throw error;
      toast.success('Sub-category updated successfully!');
      fetchCategories();
      setShowEditSubCategoryModal(false);
      setEditingSubCategory(null);
    } catch (error: any) {
      toast.error(`Error updating sub-category: ${error.message}`);
    }
  };

  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCategoryName || !newSubCategoryParentId) return;

    try {
      const { data, error } = await supabase
        .from('sub_categories')
        .insert({
          name: newSubCategoryName,
          category_id: newSubCategoryParentId
        });

      if (error) throw error;
      toast.success('Sub-category added successfully!');
      fetchCategories();
      setShowAddSubCategoryModal(false);
      setNewSubCategoryName('');
      setNewSubCategoryParentId('');
    } catch (error: any) {
      toast.error(`Error adding sub-category: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center py-4">
        <div className="flex gap-2">
          <button onClick={() => setView('categories')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Categories</button>
          <button onClick={() => setView('products')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Products</button>
          <button onClick={() => setView('orders')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Orders</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        {view === 'products' && <h2 className="text-2xl font-bold">Product Management</h2>}
        {view === 'orders' && <h2 className="text-2xl font-bold">Order Management</h2>}
        {view === 'products' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 sm:mt-0">
            <Link to="/admin/add-product" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 justify-center">
              <Plus size={20} className="mr-2"/>
              Add Product
          </Link>
          </div>
        )}
      </div>

      {view === 'products' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow"><h3 className="text-gray-500 text-sm">Total Products</h3><p className="text-2xl font-bold">{products.length}</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><h3 className="text-gray-500 text-sm">Filtered Products</h3><p className="text-2xl font-bold">{filteredProducts.length}</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><h3 className="text-gray-500 text-sm">Categories</h3><p className="text-2xl font-bold">{parentCategories.length} <span className="text-base font-normal">({subCategories.length} sub)</span></p></div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border rounded-lg p-2 pl-10" /></div>
              <select value={selectedParentCategory} onChange={(e) => {setSelectedParentCategory(e.target.value); setSelectedSubCategory('all');}} className="w-full border rounded-lg p-2"><option value="all">All Parent Categories</option>{parentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</select>
              <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} disabled={filteredSubcategories.length === 0} className="w-full border rounded-lg p-2 disabled:bg-gray-100"><option value="all">All Sub-Categories</option>{filteredSubcategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</select>
            </div>
            </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b"><th className="p-4">Product Name</th><th className="p-4">Parent Category</th><th className="p-4">Sub-Category</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr></thead><tbody>{loading ? (<tr><td colSpan={5} className="text-center p-8">Loading...</td></tr>) : filteredProducts.length > 0 ? (filteredProducts.map(product => (<tr key={product.id} className="border-b hover:bg-gray-50"><td className="p-4 flex items-center gap-4"><img src={product.image_url || '/images/product-placeholder.png'} alt={product.name} className="w-12 h-12 rounded-lg object-cover" /><div><p className="font-semibold">{product.name}</p><p className="text-xs text-gray-500">ID: {product.id}</p></div></td><td className="p-4">{product.sub_categories?.categories?.name || 'N/A'}</td><td className="p-4">{product.sub_categories?.name || 'N/A'}</td><td className="p-4">₹{product.price.toFixed(2)}</td><td className="p-4"><div className="flex items-center space-x-2"><button onClick={() => handleEditClick(product)} className="text-blue-500 hover:text-blue-700 p-1"><Edit size={18} /></button><button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(product)}><Trash2 size={18} /></button></div></td></tr>))) : (<tr><td colSpan={5} className="text-center p-8">No products found.</td></tr>)}</tbody></table></div>
        </>
      )}

      {view === 'orders' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Order Management</h2>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search orders..." value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} className="w-full border rounded-lg p-2 pl-10" /></div>
              <select value={orderCategory} onChange={(e) => setOrderCategory(e.target.value)} className="w-full border rounded-lg p-2"><option value="all">All Categories</option>{parentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</select>
            </div>
              </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b"><th className="p-4">Customer</th><th className="p-4">Product</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead><tbody>{loading ? (<tr><td colSpan={4} className="text-center p-8">Loading...</td></tr>) : filteredOrders.length > 0 ? (filteredOrders.map(order => (<tr key={order.id} className="border-b hover:bg-gray-50"><td className="p-4"><p className="font-semibold">{order.name}</p><p className="text-xs text-gray-500">{order.email}</p></td><td className="p-4">{order.product?.name || 'N/A'}</td><td className="p-4 text-center">{order.status === 'done' ? <CheckCircle className="w-5 h-5 text-green-500" /> : order.status === 'rejected' ? <XCircle className="w-5 h-5 text-red-500" /> : <Clock className="w-5 h-5 text-gray-400" />}</td><td className="p-4"><div className="flex items-center space-x-2"><button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewDetails(order)}><Eye size={18} /></button><button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(order)}><Trash2 size={18} /></button></div></td></tr>))) : (<tr><td colSpan={4} className="text-center p-8">No orders found.</td></tr>)}</tbody></table></div>
        </>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"><h3 className="text-lg font-semibold mb-4">Order Details</h3><div className="space-y-2 mb-4"><div><span className="font-semibold">Order ID:</span> {selectedOrder.id}</div><div><span className="font-semibold">Product:</span> {selectedOrder.product?.name || 'N/A'}</div><div><span className="font-semibold">Category:</span> {selectedOrder.product?.sub_categories?.categories?.name || '-'}</div><div><span className="font-semibold">Customer:</span> {selectedOrder.name} ({selectedOrder.email}) <a href={`mailto:${selectedOrder.email}`} className="ml-2 text-blue-600 hover:text-blue-800" title="Send Email"><svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg></a></div><div><span className="font-semibold">Phone:</span> {selectedOrder.phone} <a href={`tel:${selectedOrder.phone}`} className="ml-2 text-green-600 hover:text-green-800" title="Call"><svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-1.1 1.1a16.001 16.001 0 006.586 6.586l1.1-1.1a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" /></svg></a></div><div><span className="font-semibold">Address:</span> {selectedOrder.address}</div><div><span className="font-semibold">Quantity:</span> {selectedOrder.quantity}</div><div><span className="font-semibold">Description:</span> {selectedOrder.description || '-'}</div><div><span className="font-semibold">Status:</span> {selectedOrder.status || 'pending'}</div><div><span className="font-semibold">Date:</span> {new Date(selectedOrder.created_at!).toLocaleString()}</div></div><div className="flex flex-wrap gap-3 justify-end pt-4 border-t">
            <button onClick={() => {setConfirmAction('confirm'); setPendingOrderId(selectedOrder.id);}} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center min-w-[100px] justify-center">
              {confirmAction === 'confirm' && pendingOrderId === selectedOrder.id ? (
                <span className="flex items-center justify-center w-full">
                  <dotlottie-player src='https://lottie.host/c9a6186b-a85b-4f34-904f-605879937448/xmcjUUayLy.lottie' background='transparent' speed='1' style={{width: '32px', height: '32px'}} loop autoplay></dotlottie-player>
                </span>
              ) : 'Confirm'}
            </button>
            <button onClick={() => {setConfirmAction('reject'); setPendingOrderId(selectedOrder.id);}} className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center min-w-[100px] justify-center">
              {confirmAction === 'reject' && pendingOrderId === selectedOrder.id ? (
                <span className="flex items-center justify-center w-full">
                  <dotlottie-player src='https://lottie.host/c9a6186b-a85b-4f34-904f-605879937448/xmcjUUayLy.lottie' background='transparent' speed='1' style={{width: '32px', height: '32px'}} loop autoplay></dotlottie-player>
                </span>
              ) : 'Reject'}
            </button>
            <button onClick={handleCloseOrderModal} className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Close</button>
          </div></div></div>
      )}

      {confirmAction && pendingOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"><h3 className="text-lg font-semibold mb-4">Confirm Action</h3><p className="mb-6">Are you sure you want to {confirmAction} this order?</p><div className="flex justify-end gap-3"><button onClick={() => {if(confirmAction === 'confirm') updateOrderStatus(pendingOrderId, 'done', 'confirm'); else if (confirmAction === 'reject') updateOrderStatus(pendingOrderId, 'rejected', 'reject');}} className="px-4 py-2 rounded-lg text-white bg-blue-600">Yes</button><button onClick={handleCloseOrderModal} className="px-4 py-2 rounded-lg bg-gray-200">Cancel</button></div></div></div>
      )}

      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} rows={3} className="w-full border-gray-300 rounded-md shadow-sm"></textarea>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="url" value={editForm.image_url} onChange={(e) => setEditForm({...editForm, image_url: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" />
          </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma-separated)</label>
                <input type="text" value={editForm.features} onChange={(e) => setEditForm({...editForm, features: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                  <select value={editForm.parentCategoryId} onChange={(e) => setEditForm({...editForm, parentCategoryId: e.target.value, subCategoryId: ''})} className="w-full border-gray-300 rounded-md shadow-sm" required>
                    <option value="">Select Parent</option>
                    {parentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category</label>
                  <select value={editForm.subCategoryId} onChange={(e) => setEditForm({...editForm, subCategoryId: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" required disabled={!editForm.parentCategoryId}>
                    <option value="">Select Sub</option>
                    {modalSubCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                  </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount (₹)</label>
                  <input type="number" value={editForm.discount_price} onChange={(e) => setEditForm({...editForm, discount_price: e.target.value, discount_percentage: ''})} className="w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
                  <input type="number" value={editForm.discount_percentage} onChange={(e) => setEditForm({...editForm, discount_percentage: e.target.value, discount_price: ''})} className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                                </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                            </div>
            </form>
                            </div>
                          </div>
      )}

      {view === 'categories' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Sub-Categories Management</h2>
                            <button
              onClick={() => setShowAddSubCategoryModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
            >
              <Plus size={20} className="mr-2" />
              Add Sub-Category
                            </button>
                          </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4">Sub-Category Name</th>
                  <th className="p-4">Parent Category</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.length === 0 ? (
                  <tr><td colSpan={3} className="text-center p-8">No sub-categories found.</td></tr>
                ) : (
                  subCategories.map((sub) => {
                    const parent = parentCategories.find(cat => cat.id === sub.category_id);
                    return (
                      <tr key={sub.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{sub.name}</td>
                        <td className="p-4">{parent ? parent.name : <span className="text-gray-400">Unknown</span>}</td>
                        <td className="p-4">
                          <button onClick={() => handleEditSubCategory(sub)} className="text-blue-500 hover:text-blue-700 p-1 mr-2"><Edit size={18} /></button>
                          <button onClick={() => handleDeleteSubCategory(sub)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    );
                  })
                )}
                  </tbody>
                </table>
          </div>

          {/* Add Sub-Category Modal */}
          {showAddSubCategoryModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Add Sub-Category</h2>
                <form onSubmit={handleAddSubCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category Name</label>
                    <input type="text" value={newSubCategoryName} onChange={e => setNewSubCategoryName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                    <select value={newSubCategoryParentId} onChange={e => setNewSubCategoryParentId(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required>
                      <option value="">Select Parent</option>
                      {parentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button type="button" onClick={() => setShowAddSubCategoryModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add</button>
                </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Sub-Category Modal */}
          {showEditSubCategoryModal && editingSubCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Edit Sub-Category</h2>
                <form onSubmit={handleUpdateSubCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category Name</label>
                    <input type="text" value={editSubCategoryName} onChange={e => setEditSubCategoryName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                    <select value={editSubCategoryParentId} onChange={e => setEditSubCategoryParentId(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required>
                      <option value="">Select Parent</option>
                      {parentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button type="button" onClick={() => setShowEditSubCategoryModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductManagement; 