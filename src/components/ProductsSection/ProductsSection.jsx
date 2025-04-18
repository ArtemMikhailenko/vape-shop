import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ProductsSection.module.css';

// Импортируем изображения продуктов
import stiiizyPurplePunch from '../../assets/products/cartriges-removebg-preview.png';
import stiiizyOGKush from '../../assets/products/stiizy.png';
import stiiizyPineappleExpress from '../../assets/products/cartriges-removebg-preview.png';
import bigChiefSourTangie from '../../assets/products/bigchief.png';
import bigChiefSourDiesel from '../../assets/products/bigchief.png';
import wcCurePen from '../../assets/products/cure.png';
import brassKnuckles from '../../assets/products/cure.png';

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

  // Определяем продукты
  const products = [
    {
      id: 1,
      name: 'STIIIZY PURPLE PUNCH',
      category: 'INDICA',
      image: stiiizyPurplePunch,
      description: 'PREMIUM THC PODS',
      tag: 'ТОПОВЫЙ ПРОДУКТ'
    },
    {
      id: 2,
      name: 'STIIIZY OG KUSH',
      category: 'INDICA',
      image: stiiizyOGKush,
      description: 'PREMIUM THC PODS',
      tag: 'ПОПУЛЯРНЫЙ'
    },
    {
      id: 3,
      name: 'STIIIZY PINEAPPLE EXPRESS',
      category: 'HYBRID',
      image: stiiizyPineappleExpress,
      description: 'PREMIUM THC PODS',
      tag: 'НОВИНКА'
    },
    {
      id: 4,
      name: 'BIG CHIEF SOUR TANGIE',
      category: 'PREMIUM DISTILLATE',
      image: bigChiefSourTangie,
      description: 'PREMIUM CARTRIDGE',
      tag: 'ХОРОШО ИДЕТ'
    },
    {
      id: 5,
      name: 'BIG CHIEF SOUR DIESEL',
      category: 'PREMIUM DISTILLATE',
      image: bigChiefSourDiesel,
      description: 'PREMIUM CARTRIDGE',
      tag: 'ЛУЧШИЙ ВКУС'
    },
    {
      id: 6,
      name: 'WEST COAST CURE PEN',
      category: 'PREMIUM DISTILLATE',
      image: wcCurePen,
      description: 'SOLVENT FREE CARTRIDGE',
      tag: 'PREMIUM'
    },
    {
      id: 7,
      name: 'BRASS KNUCKLES',
      category: 'GOLD EDITION',
      image: brassKnuckles,
      description: 'PREMIUM CARTRIDGE',
      tag: 'ЭКСКЛЮЗИВ'
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
      y: 50
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
      <div className={styles.sectionBackground}>
        <div className={styles.topDecoration}></div>
      </div>
      
      <div className={styles.sectionContent}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>НАШИ ПРОДУКТЫ</h2>
          <p className={styles.sectionDescription}>
            В постоянно меняющемся мире конопли, чертовски приятно знать, что некоторые
            вещи остаются такими, какими они есть.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.productsContainer}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className={styles.productCard}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 25px 25px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.productImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                />
                {product.tag && (
                  <div className={styles.productTag}>
                    {product.tag}
                  </div>
                )}
              </div>
              
              <div className={styles.productInfo}>
                <div className={styles.productCategory}>{product.category}</div>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.productDescription}>
                  {product.description}
                </div>
              </div>
              
              <div className={styles.productActions}>
                <button className={styles.viewButton}>
                  ПОДРОБНЕЕ
                </button>
                <button className={styles.buyButton}>
                  КУПИТЬ СЕЙЧАС
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.viewAllContainer}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <button className={styles.viewAllButton}>
            ПОКАЗАТЬ ВСЕ ПРОДУКТЫ
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;