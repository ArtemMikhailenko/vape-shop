import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './AboutSection.module.css';
import cartridgeImage from '../../assets/Kingpen-Oil.jpg';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
    const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Create cannabis leaf elements that float around
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const createLeaf = () => {
      if (!sectionRef.current) return;
      
      const leaf = document.createElement('div');
      leaf.className = styles.floatingLeaf;
      
      // Random positioning and animation
      const size = Math.random() * 20 + 20; // 20-40px
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.top = `${Math.random() * 100}%`;
      
      leaf.style.animationDuration = `${Math.random() * 20 + 20}s`;
      leaf.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random rotation
      leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      sectionRef.current.appendChild(leaf);
      
      // Remove leaf after animation completes
      setTimeout(() => {
        if (leaf.parentNode) {
          leaf.remove();
        }
      }, 40000);
    };
    
    // Create initial leaves
    for (let i = 0; i < 10; i++) {
      createLeaf();
    }
    
    // Add more leaves periodically
    const leafInterval = setInterval(createLeaf, 3000);
    
    return () => clearInterval(leafInterval);
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <motion.div 
            className={styles.imageContainer}
            style={{  y: useTransform(scrollYProgress, [0, 0.5], [50, -50]) }}
          >
            <div className={styles.imageFrame}>
              <img src={cartridgeImage} alt="BADVAPE картриджи" className={styles.image} />
              <div className={styles.glow}></div>
            </div>
            
            <motion.div 
              className={styles.badgeQuality}
              initial={{ x: 100}}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className={styles.badgeIcon}>★</div>
              <div className={styles.badgeContent}>
                <div className={styles.badgeTitle}>Premium</div>
                <div className={styles.badgeSubtitle}>quality</div>
              </div>
            </motion.div>
            
            <div className={styles.thcContent}>
              <div className={styles.thcLabel}>THC</div>
              <div className={styles.thcValue}>85-90%</div>
            </div>
            
            <motion.div 
              className={styles.productSpecs}
              initial={{  y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.specItem}>
                <div className={styles.specIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5L5 19M9 5H5V9M15 19H19V15" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.specContent}>
                  <div className={styles.specLabel}>Объем</div>
                  <div className={styles.specValue}>1.0G</div>
                </div>
              </div>
              
              <div className={styles.specItem}>
                <div className={styles.specIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34835 22 12C22 14.6522 20.9447 17.1957 19.07 19.07M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" 
                      stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.specContent}>
                  <div className={styles.specLabel}>Вкус</div>
                  <div className={styles.specValue}>Насыщенный</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={styles.textContainer}
            style={{ y }}
          >
            <div className={styles.sectionTag}>О нашем продукте</div>
            <h2 className={styles.title}>ЧТО ТАКОЕ BADVAPE</h2>
            
            <p className={styles.description}>
              Масло BAD VAPE производится в нашей собственной современной заводской лаборатории. 
              Его перегоняет 5 раз для получения высококачественного продукта, который проходит 
              строгие тесты и оценки качества Европейских и Американских экспертных организаций.
            </p>
            
            <p className={styles.description}>
              Затем мы добавляем запатентованные смеси терпенов (природных ароматизаторов из 
              хвойных растений) для достижения возможного наилучшего вкуса. Нет PG, VG, PEG или 
              других добавок, таких как ГМО.
            </p>
            
            <motion.div 
              className={styles.qualityMarkers}
              initial={{  }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            >
              <motion.div 
                className={styles.qualityItem}
                variants={{
                  hidden: {  x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className={styles.qualityIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>5-кратная перегонка</span>
              </motion.div>
              
              <motion.div 
                className={styles.qualityItem}
                variants={{
                  hidden: {  x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className={styles.qualityIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Натуральные терпены</span>
              </motion.div>
              
              <motion.div 
                className={styles.qualityItem}
                variants={{
                  hidden: {  x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className={styles.qualityIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Без PG, VG и ГМО</span>
              </motion.div>
            </motion.div>
            
            <div className={styles.labTested}>
              <div className={styles.labIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3H15M10 9L14 9M12 3V21M8.5 21H15.5C16.3284 21 17 20.3284 17 19.5V6C17 4.89543 16.1046 4 15 4H9C7.89543 4 7 4.89543 7 6V19.5C7 20.3284 7.67157 21 8.5 21Z" 
                    stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.labTestContent}>
                <div className={styles.labTestTitle}>Лабораторно протестировано</div>
                <div className={styles.labTestDesc}>Все продукты проходят строгие лабораторные испытания на чистоту и эффективность</div>
              </div>
            </div>
            
            <div className={styles.ctaButtonGroup}>
              <motion.button 
                className={styles.learnMoreButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
              >
                <span>УЗНАТЬ БОЛЬШЕ</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
              
              <motion.button 
                className={styles.shopButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop')}
              >
                <span>КАТАЛОГ</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className={styles.backgroundElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
      
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </section>
  );
};

export default AboutSection;