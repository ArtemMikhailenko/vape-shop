import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './CertificationSection.module.css';
import nonGmoLogo from '../../assets/non-gmo-logo.png'; // Логотип NonGMO Project

const CertificationSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section ref={sectionRef} className={styles.certificationSection}>
      <div className={styles.brushTop}></div>
      
      <div className={styles.contentContainer}>
        <motion.div 
          className={styles.certificationContent}
          style={{ opacity }}
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.logoContainer}>
            <img 
              src={nonGmoLogo} 
              alt="NonGMO Project Verified" 
              className={styles.nonGmoLogo} 
            />
          </div>
          
          <div className={styles.textContainer}>
            <h2 className={styles.title}>НАШИ ПРОДУКТЫ</h2>
            <h3 className={styles.subtitle}>БЕЗ ХИМИИ И ГМО</h3>
            
            <motion.div 
              className={styles.benefitsList}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            >
              <motion.div 
                className={styles.benefitItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>100% натуральные ингредиенты</p>
              </motion.div>
              
              <motion.div 
                className={styles.benefitItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>Сертифицированное качество</p>
              </motion.div>
              
              <motion.div 
                className={styles.benefitItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>Без искусственных добавок</p>
              </motion.div>
              
              <motion.div 
                className={styles.benefitItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>Регулярное лабораторное тестирование</p>
              </motion.div>
            </motion.div>
            
            <motion.button 
              className={styles.learnMoreButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ПОДРОБНЕЕ О СЕРТИФИКАТАХ
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <div className={styles.brushBottom}></div>
    </section>
  );
};

export default CertificationSection;