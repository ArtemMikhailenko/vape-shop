import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import './App.css';
import ProductsSection from './components/ProductsSection/ProductsSection';
import AboutSection from './components/AboutSection/AboutSection';
import PensCartridgesSection from './components/PensCartridgesSection/PensCartridgesSection';
import AwardsSection from './components/AwardsSection/AwardsSection';
import CertificationSection from './components/CertificationSection/CertificationSection';
import Footer from './components/Footer/Footer';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ContactsPage from './pages/ContactPages/ContactPages';
import FAQPage from './pages/FAQPage/FAQPage';
import PurchasePage from './pages/PurchasePage/PurchasePage';
import ProductionPage from './pages/Production/Production';
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductsSection />
              <AboutSection />
              <PensCartridgesSection />
              <AwardsSection />
              <CertificationSection />
            </>
          } />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contacts" element={<ContactsPage/>} />
          <Route path="/faq" element={<FAQPage/>} />
          <Route path="/purchase" element={<PurchasePage/>} />
          <Route path="/production" element={<ProductionPage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;