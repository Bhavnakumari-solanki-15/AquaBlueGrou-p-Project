import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Services from './pages/Services';
import Products from './pages/Products';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import RasEquipment from './pages/RasEquipment';
import TestingKits from './pages/TestingKits';
import JoinUs from './pages/JoinUs';
import Maintenance from './pages/Maintenance';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import AdminPanel from './pages/AdminPanel';
import AddProduct from './pages/Admin/AddProduct';
import AddMaintenanceProduct from './pages/Admin/AddMaintenanceProduct';
import AddRASEquipment from './pages/Admin/AddRASEquipment';
import AddTestingKit from './pages/Admin/AddTestingKit';
import AddSubCategory from './pages/Admin/AddSubCategory';
import AddBlog from './pages/Admin/AddBlog';
import BlogPost from './pages/BlogPost';
import SubCategoryProducts from './pages/SubCategoryProducts';
import TeamManagement from './pages/Admin/TeamManagement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<SubCategoryProducts />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ras-equipment" element={<RasEquipment />} />
              <Route path="/testing-kits" element={<TestingKits />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products/maintenance" element={<Maintenance />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/add-maintenance-product" element={<AddMaintenanceProduct />} />
              <Route path="/admin/add-ras-equipment" element={<AddRASEquipment />} />
              <Route path="/admin/add-testing-kit" element={<AddTestingKit />} />
              <Route path="/admin/add-sub-category" element={<AddSubCategory />} />
              <Route path="/admin/add-blog" element={<AddBlog />} />
              <Route path="/admin/team" element={<TeamManagement />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;