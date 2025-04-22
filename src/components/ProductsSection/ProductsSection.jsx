import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ProductsSection.module.css';

// Import product images (these would be your actual images)
import stiiizyImage from '../../assets/products/stiizy.png';
import bigChiefImage from '../../assets/products/bigchief.png';
import cureImage from '../../assets/products/cure.png';

const ProductsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Product data
  const products = [
    {
      id: 1,
      name: 'STIIIZY PURPLE PUNCH',
      category: 'INDICA',
      image: stiiizyImage,
      description: 'Premium THC pods with natural terpenes for a rich flavor profile.',
      tag: 'BEST SELLER',
      rating: 4.9,
      effect: 'Relaxing'
    },
    {
      id: 2,
      name: 'STIIIZY OG KUSH',
      category: 'INDICA',
      image: stiiizyImage,
      description: 'Classic OG Kush flavor in our premium quality distillate pods.',
      tag: 'POPULAR',
      rating: 4.8,
      effect: 'Calming'
    },
    {
      id: 3,
      name: 'STIIIZY PINEAPPLE EXPRESS',
      category: 'HYBRID',
      image: stiiizyImage,
      description: 'Tropical pineapple flavor with energizing and creative effects.',
      tag: 'NEW',
      rating: 4.7,
      effect: 'Uplifting'
    },
    {
      id: 4,
      name: 'BIG CHIEF SOUR TANGIE',
      category: 'PREMIUM DISTILLATE',
      image: bigChiefImage,
      description: 'Citrus flavor with a sour twist, perfect for daytime use.',
      tag: 'TRENDING',
      rating: 4.8,
      effect: 'Energizing'
    },
    {
      id: 5,
      name: 'CURE PEN ORIGINAL',
      category: 'PREMIUM DISTILLATE',
      image: cureImage,
      description: 'Clean, solvent-free distillate with natural terpene profile.',
      tag: 'PREMIUM',
      rating: 4.9,
      effect: 'Balanced'
    },
    {
      id: 6,
      name: 'BRASS KNUCKLES GOLD',
      category: 'GOLD EDITION',
      image: cureImage,
      description: 'The gold standard in premium cannabis cartridges.',
      tag: 'EXCLUSIVE',
      rating: 4.9,
      effect: 'Powerful'
    }
  ];

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

  return (
    <section className={styles.productsSection} ref={ref}>
      <div className={styles.backgroundElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
      
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.sectionTag}>Our Collection</span>
          <h2 className={styles.sectionTitle}>Premium Products</h2>
          <p className={styles.sectionDescription}>
            Explore our selection of premium cannabis products, crafted with care for quality and effectiveness.
            Each product is lab-tested to ensure purity and potency.
          </p>
          
          <div className={styles.filterContainer}>
            <button className={`${styles.filterButton} ${styles.activeFilter}`}>All Products</button>
            <button className={styles.filterButton}>Indica</button>
            <button className={styles.filterButton}>Sativa</button>
            <button className={styles.filterButton}>Hybrid</button>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.productsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className={styles.productCard}
              variants={itemVariants}
              // whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={styles.productHeader}>
                <div className={styles.productTag}>{product.tag}</div>
                <div className={styles.productRating}>
                  <span className={styles.ratingIcon}>★</span>
                  <span>{product.rating}</span>
                </div>
              </div>
              
              <div className={styles.productImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                />
                
                <div className={styles.effectBadge}>
                  <span className={styles.effectIcon}>⬤</span>
                  <span>{product.effect}</span>
                </div>
              </div>
              
              <div className={styles.productContent}>
                <div className={styles.productCategory}>{product.category}</div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
              </div>
              
              <div className={styles.productFooter}>
                <button className={styles.detailsButton}>
                  Details
                </button>
                <button className={styles.addButton}>
                  <span>Add to Cart</span>
                  <span className={styles.buttonIcon}>+</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.viewAllContainer}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <button className={styles.viewAllButton}>
            <span>View All Products</span>
            <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;