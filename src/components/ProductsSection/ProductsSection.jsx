import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ProductsSection.module.css';

// Import product images (these would be your actual images)
import stiiizyImage from '../../assets/products/stiizy.png';
import bigChiefImage from '../../assets/products/bigchief.png';
import cureImage from '../../assets/products/cure.png';

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Product data
  const products = [
    {
      id: 1,
      name: 'STIIIZY PURPLE PUNCH',
      category: 'indica',
      image: stiiizyImage,
      description: 'Premium THC pods with natural terpenes for a rich flavor profile.',
      tag: 'BEST SELLER',
      rating: 4.9,
      effect: 'Relaxing',
      thc: '85%',
      price: '$45.00'
    },
    {
      id: 2,
      name: 'STIIIZY OG KUSH',
      category: 'indica',
      image: stiiizyImage,
      description: 'Classic OG Kush flavor in our premium quality distillate pods.',
      tag: 'POPULAR',
      rating: 4.8,
      effect: 'Calming',
      thc: '82%',
      price: '$45.00'
    },
    {
      id: 3,
      name: 'STIIIZY PINEAPPLE EXPRESS',
      category: 'hybrid',
      image: stiiizyImage,
      description: 'Tropical pineapple flavor with energizing and creative effects.',
      tag: 'NEW',
      rating: 4.7,
      effect: 'Uplifting',
      thc: '80%',
      price: '$45.00'
    },
    {
      id: 4,
      name: 'BIG CHIEF SOUR TANGIE',
      category: 'sativa',
      image: bigChiefImage,
      description: 'Citrus flavor with a sour twist, perfect for daytime use.',
      tag: 'TRENDING',
      rating: 4.8,
      effect: 'Energizing',
      thc: '86%',
      price: '$40.00'
    },
    {
      id: 5,
      name: 'CURE PEN ORIGINAL',
      category: 'hybrid',
      image: cureImage,
      description: 'Clean, solvent-free distillate with natural terpene profile.',
      tag: 'PREMIUM',
      rating: 4.9,
      effect: 'Balanced',
      thc: '84%',
      price: '$40.00'
    },
    {
      id: 6,
      name: 'BRASS KNUCKLES GOLD',
      category: 'indica',
      image: cureImage,
      description: 'The gold standard in premium cannabis cartridges.',
      tag: 'EXCLUSIVE',
      rating: 4.9,
      effect: 'Powerful',
      thc: '90%',
      price: '$50.00'
    }
  ];

  // Categories
  const categories = [
    { id: 'all', label: 'All Products', icon: '🌿' },
    { id: 'indica', label: 'Indica', icon: '🌙' },
    { id: 'sativa', label: 'Sativa', icon: '☀️' },
    { id: 'hybrid', label: 'Hybrid', icon: '⚡' }
  ];

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Start animation when section is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Handle filter click
  const handleFilterClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <section className={styles.productsSection} ref={ref}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientBg}></div>
        <div className={styles.particles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className={styles.particle}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
        >
          <span className={styles.sectionTag}>BADVAPE Collection</span>
          <h2 className={styles.sectionTitle}>Наши Премиальные Продукты</h2>
          <p className={styles.sectionDescription}>
            Откройте для себя мир высококачественных вейп продуктов, созданных с заботой о качестве и эффективности.
            Каждый продукт проходит лабораторные испытания, чтобы гарантировать чистоту и потенцию.
          </p>
        </motion.div>

        <motion.div 
          className={styles.categoriesContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
        >
          {/* <div className={styles.categoriesWrapper}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.activeCategory : ''}`}
                onClick={() => handleFilterClick(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryLabel}>{category.label}</span>
                {selectedCategory === category.id && (
                  <motion.div 
                    className={styles.activeIndicator}
                    layoutId="activeCategoryIndicator"
                  ></motion.div>
                )}
              </button>
            ))}
          </div> */}
        </motion.div>
        
        <motion.div 
          className={styles.productsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {visibleProducts.map((product) => (
            <motion.div 
              key={product.id}
              className={styles.productCard}
              variants={itemVariants}
              // onMouseEnter={() => setHoveredProduct(product.id)}
              // onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className={styles.productImageContainer}>
                <div className={styles.categoryBadge}>
                  {product.category === 'indica' && <span style={{color: '#8E44AD'}}>Indica</span>}
                  {product.category === 'sativa' && <span style={{color: '#F39C12'}}>Sativa</span>}
                  {product.category === 'hybrid' && <span style={{color: '#27AE60'}}>Hybrid</span>}
                </div>
                
                <div className={styles.tagBadge}>{product.tag}</div>
                
                <motion.div
                  className={styles.imageWrapper}
                  animate={{
                    y: hoveredProduct === product.id ? -10 : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={styles.productImage} 
                  />
                </motion.div>
                
                <div className={styles.productQuickInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>THC</span>
                    <span className={styles.infoValue}>{product.thc}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Effect</span>
                    <span className={styles.infoValue}>{product.effect}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.productDetails}>
                <div className={styles.ratingContainer}>
                  <div className={styles.ratingStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`${styles.star} ${i < Math.floor(product.rating) ? styles.fullStar : ''} ${product.rating % 1 !== 0 && i === Math.floor(product.rating) ? styles.halfStar : ''}`}
                      >★</span>
                    ))}
                  </div>
                  <div className={styles.ratingValue}>{product.rating}</div>
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
              </div>
              
              {/* <div className={styles.productFooter}>
                <div className={styles.productPrice}>{product.price}</div>
                <div className={styles.productActions}>
                  <button className={styles.actionButton}>
                    <svg className={styles.actionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M2 9h20M12 5v8M7 15h10v4a1 1 0 01-1 1H8a1 1 0 01-1-1v-4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className={styles.primaryButton}>
                    <span>Buy Now</span>
                    <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
        
        {/* <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a href="/shop" className={styles.ctaButton}>
            <span>View All Products</span>
            <svg className={styles.ctaIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div> */}
      </div>
      
      <div className={styles.productFeaturesSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌿</div>
              <h3 className={styles.featureTitle}>100% Натуральный</h3>
              <p className={styles.featureDescription}>Наша продукция создана из 100% натуральных ингредиентов без вредных добавок</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧪</div>
              <h3 className={styles.featureTitle}>Лабораторно Проверено</h3>
              <p className={styles.featureDescription}>Каждая партия проходит строгие лабораторные тесты на чистоту и качество</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3 className={styles.featureTitle}>Отмеченный Наградами</h3>
              <p className={styles.featureDescription}>Многократный победитель престижных конкурсов Cannabis Cup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;