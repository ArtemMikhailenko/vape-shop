import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
import ShopPage from './pages/Shop/ShopPage';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Global SEO Settings */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Breaking-Bad | Премиальные вейп продукты</title>
          <meta name="description" content="Breaking-Bad - магазин премиальных вейп продуктов. Высококачественные масла конопли, ручки и картриджи от лучших производителей. Доставка по всей России." />
          <meta name="keywords" content="вейп, картриджи, масло конопли, Breaking-Bad, премиум вейп, STIIIZY, Brass Knuckles, Big Chief, CUREpen" />
          <meta name="author" content="Breaking-Bad" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://breaking-bad.ru/" />
          <meta property="og:title" content="Breaking-Bad | Премиальные вейп продукты" />
          <meta property="og:description" content="Breaking-Bad - магазин премиальных вейп продуктов. Высококачественные масла конопли, ручки и картриджи от лучших производителей. Доставка по всей России." />
          <meta property="og:image" content="https://breaking-bad.ru/img/og-image.jpg" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://breaking-bad.ru/" />
          <meta property="twitter:title" content="Breaking-Bad | Премиальные вейп продукты" />
          <meta property="twitter:description" content="Breaking-Bad - магазин премиальных вейп продуктов. Высококачественные масла конопли, ручки и картриджи от лучших производителей. Доставка по всей России." />
          <meta property="twitter:image" content="https://breaking-bad.ru/img/twitter-image.jpg" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://breaking-bad.ru/" />
        </Helmet>

        <Header />
        <Routes>
          <Route path="/" element={
            <>
              {/* Home page specific SEO */}
              <Helmet>
                <title>Breaking-Bad | Главная | Премиальные вейп продукты</title>
                <meta name="description" content="Breaking-Bad - ваш премиальный поставщик высококачественных вейп продуктов. Ручки и картриджи от лучших производителей с доставкой по всей России." />
                <link rel="canonical" href="https://breaking-bad.ru/" />
              </Helmet>
              <Hero />
              <ProductsSection />
              <AboutSection />
              <PensCartridgesSection />
              <AwardsSection />
              <CertificationSection />
            </>
          } />
          <Route path="/about" element={
            <>
              <Helmet>
                <title>О нас | Breaking-Bad | Премиальные вейп продукты</title>
                <meta name="description" content="Узнайте о Breaking-Bad - ведущем импортере масла конопли из США в Россию. Наша история, ценности и миссия." />
                <link rel="canonical" href="https://breaking-bad.ru/about" />
              </Helmet>
              <AboutUsPage />
            </>
          } />
          <Route path="/contacts" element={
            <>
              <Helmet>
                <title>Контакты | Breaking-Bad | Премиальные вейп продукты</title>
                <meta name="description" content="Свяжитесь с нами для заказа премиальных вейп продуктов. Telegram, социальные сети и другие способы связи." />
                <link rel="canonical" href="https://breaking-bad.ru/contacts" />
              </Helmet>
              <ContactsPage/>
            </>
          } />
          <Route path="/faq" element={
            <>
              <Helmet>
                <title>FAQ | Breaking-Bad | Часто задаваемые вопросы</title>
                <meta name="description" content="Ответы на часто задаваемые вопросы о продукции Breaking-Bad, доставке, оплате и других аспектах сотрудничества." />
                <link rel="canonical" href="https://breaking-bad.ru/faq" />
              </Helmet>
              <FAQPage/>
            </>
          } />
          <Route path="/purchase" element={
            <>
              <Helmet>
                <title>Оформление заказа | Breaking-Bad | Премиальные вейп продукты</title>
                <meta name="description" content="Пошаговая инструкция по оформлению заказа в Breaking-Bad. Выбор продукции, способы доставки и оплаты." />
                <link rel="canonical" href="https://breaking-bad.ru/purchase" />
              </Helmet>
              <PurchasePage/>
            </>
          } />
          <Route path="/production" element={
            <>
              <Helmet>
                <title>Производство | Breaking-Bad | Премиальные вейп продукты</title>
                <meta name="description" content="Узнайте о производственном процессе премиальных вейп продуктов Breaking-Bad. Современные технологии, оборудование и контроль качества." />
                <link rel="canonical" href="https://breaking-bad.ru/production" />
              </Helmet>
              <ProductionPage/>
            </>
          } />
          <Route path="/shop" element={
            <>
              <Helmet>
                <title>Магазин | Breaking-Bad | Премиальные вейп продукты</title>
                <meta name="description" content="Интернет-магазин премиальных вейп продуктов Breaking-Bad. Широкий ассортимент ручек и картриджей от лучших производителей." />
                <link rel="canonical" href="https://breaking-bad.ru/shop" />
              </Helmet>
              <ShopPage/>
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;