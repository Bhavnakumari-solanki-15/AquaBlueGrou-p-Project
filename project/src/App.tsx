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
import FishDiseasesBlog from './pages/FishDiseasesBlog';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ras-equipment" element={<RasEquipment />} />
            <Route path="/testing-kits" element={<TestingKits />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/blog/fish-diseases" element={<FishDiseasesBlog />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;