import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './AboutSection.module.css';
import cartridgeImage from '../../assets/Kingpen-Oil.jpg'; // Изображение картриджей на деревянной поверхности

const AboutSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.leafPattern}></div>
      
      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.imageContainer}
          style={{ opacity, y: useTransform(scrollYProgress, [0, 0.5], [50, -50]) }}
        >
          <div className={styles.imageFrame}>
            <img src={cartridgeImage} alt="BADVAPE картриджи" className={styles.image} />
            <div className={styles.glow}></div>
            
            <motion.div 
              className={styles.badgeQuality}
              initial={{ x: 100, opacity: 0 }}
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
          </div>
          
          <motion.div 
            className={styles.cannabisLeaf}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C36.8 0 26.1 13.4 25.6 30.2c0 .4 0 .8-.2 1.2s-.5.6-.9.7c-.2 0-.4 0-.6-.1C15.4 29 6.5 36.2 6.5 46.2c0 6.6 3.5 12.3 8.7 15.3.4.2.6.6.6 1s-.1.8-.5 1c-7.3 5.4-7.3 18.2 1.6 23.2 6.3 3.5 14.2 1.6 19-4.1.3-.3.6-.5 1-.5s.7.1 1 .4c4.3 5.8 11.2 9.5 19 9.5 13.3 0 24-12.3 24-27.5 0-5.7-1.5-11.1-4.2-15.5-.2-.4-.2-.9 0-1.3s.5-.7.9-.8c11.3-2.8 19.4-14.3 19.4-27.6C97 8.4 75.8 0 50 0z"
                fill="#4CAF50" fillOpacity="0.2" />
            </svg>
          </motion.div>
          
          <div className={styles.thcContent}>
            <div className={styles.thcLabel}>THC</div>
            <div className={styles.thcValue}>85-90%</div>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.textContainer}
          style={{ opacity, y }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            <motion.div 
              className={styles.qualityItem}
              variants={{
                hidden: { opacity: 0, x: -20 },
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
                hidden: { opacity: 0, x: -20 },
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
                hidden: { opacity: 0, x: -20 },
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
          
          <motion.button 
            className={styles.learnMoreButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>УЗНАТЬ БОЛЬШЕ</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
      
      <div className={styles.backgroundElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.smokePath}></div>
      </div>
    </section>
  );
};

export default AboutSection;