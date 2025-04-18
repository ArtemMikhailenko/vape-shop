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
      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.imageContainer}
          style={{ opacity, y: useTransform(scrollYProgress, [0, 0.5], [50, -50]) }}
        >
          <div className={styles.imageFrame}>
            <img src={cartridgeImage} alt="BADVAPE картриджи" className={styles.image} />
            <div className={styles.glow}></div>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.textContainer}
          style={{ opacity, y }}
        >
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
                    stroke="#e63e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    stroke="#e63e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    stroke="#e63e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Без PG, VG и ГМО</span>
            </motion.div>
          </motion.div>
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

