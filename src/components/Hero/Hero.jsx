import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
  const smokeRef = useRef(null);
  
  useEffect(() => {
    // Анимация дыма с GSAP
    if (smokeRef.current) {
      const smoke = smokeRef.current;
      
      gsap.to(smoke, {
        backgroundPosition: '0 -10000px',
        ease: 'linear',
        repeat: -1,
        duration: 120
      });
    }
  }, []);

  return (
    <section className={styles.heroSection}>
      <div ref={smokeRef} className={styles.smokeEffect}></div>
      
      <div className={styles.heroContent}>
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          BADVAPE-HUB
        </motion.h1>
        
        <motion.h2 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ПРЕМИАЛЬНЫЕ ВЕЙП ПРОДУКТЫ
        </motion.h2>
        
        <motion.p 
          className={styles.heroParagraph}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Откройте для себя мир качественных вейп-устройств и жидкостей, созданных с заботой о вашем опыте
        </motion.p>
        
        <motion.div 
          className={styles.buttonContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className={`${styles.button} ${styles.primaryButton}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            КАТАЛОГ ПРОДУКЦИИ
          </motion.button>
          
          <motion.button 
            className={`${styles.button} ${styles.secondaryButton}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            УЗНАТЬ БОЛЬШЕ
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
