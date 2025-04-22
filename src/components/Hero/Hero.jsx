import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
  const smokeRef = useRef(null);
  const videoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for the parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Smoke animation with GSAP
  useEffect(() => {
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
      {/* Video Background */}
      <video 
        ref={videoRef}
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://video.wixstatic.com/video/d47472_58cce06729c54ccb935886c4b3647274/1080p/mp4/file.mp4" type="video/mp4" />
      </video>

      {/* Smoke effect */}
      <div className={styles.smokeEffect}></div>
      
      {/* Overlay */}
      <div className={styles.overlayGradient}></div>
      
      {/* Content */}
      <motion.div 
        className={styles.heroContent}
        style={{ 
          x: -mousePosition.x,
          y: -mousePosition.y,
          transition: { type: 'spring', stiffness: 75, damping: 30, mass: 2 }
        }}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.badgeContainer}>
            <div className={styles.productBadge}>Premium Quality</div>
          </div>
          
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            BADVAPE<span className={styles.titleHighlight}>-HUB</span>
          </motion.h1>
          
          <motion.h2 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ПРЕМИАЛЬНЫЕ ВЕЙП ПРОДУКТЫ
          </motion.h2>
          
          <motion.div
            className={styles.titleBar}
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1, delay: 0.4 }}
          ></motion.div>
          
          <motion.p 
            className={styles.heroParagraph}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Откройте для себя мир качественных вейп-устройств и жидкостей, созданных с заботой о вашем опыте
          </motion.p>
          
          <motion.div 
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className={`${styles.button} ${styles.primaryButton}`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(76, 175, 80, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.buttonText}>КАТАЛОГ ПРОДУКЦИИ</span>
              <span className={styles.buttonIcon}>→</span>
            </motion.button>
            
            <motion.button 
              className={`${styles.button} ${styles.secondaryButton}`}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(255, 255, 255, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.buttonText}>УЗНАТЬ БОЛЬШЕ</span>
              <span className={styles.buttonIcon}>+</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className={styles.scrollText}>Прокрутите вниз</div>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot}></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;