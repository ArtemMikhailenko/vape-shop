import React from 'react';
import { motion } from 'framer-motion';
import styles from './CertificationSection.module.css';
import nonGmoLogo from '../../assets/non-gmo-logo.png'; // Logo image

const CertificationSection = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className={styles.certificationSection}>
      <div className={styles.brushTop}></div>
      
      <div className={styles.contentContainer}>
        <motion.div 
          className={styles.certificationContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.logoContainer}>
            <motion.img 
              src={nonGmoLogo} 
              alt="NonGMO Project Verified" 
              className={styles.nonGmoLogo}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className={styles.textContainer}>
            <div className={styles.headerBadge}>Certification</div>
            <h2 className={styles.title}>OUR PRODUCTS</h2>
            <h3 className={styles.subtitle}>CHEMICAL-FREE AND NON-GMO</h3>
            
            <motion.div 
              className={styles.benefitsList}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className={styles.benefitItem}
                variants={itemVariants}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>100% natural ingredients</p>
              </motion.div>
              
              <motion.div 
                className={styles.benefitItem}
                variants={itemVariants}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>Certified quality</p>
              </motion.div>
              
              <motion.div 
                className={styles.benefitItem}
                variants={itemVariants}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>No artificial additives</p>
              </motion.div>
              
              <motion.div 
                className={styles.benefitItem}
                variants={itemVariants}
              >
                <div className={styles.checkIcon}>✓</div>
                <p>Regular laboratory testing</p>
              </motion.div>
            </motion.div>
            
            
          </div>
        </motion.div>
        
        <div className={styles.certificationGrid}>
          <motion.div 
            className={styles.certCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.certIcon}>🌱</div>
            <h4>Organic Farming</h4>
            <p>All our ingredients are grown using organic farming practices</p>
          </motion.div>
          
          <motion.div 
            className={styles.certCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.certIcon}>🔬</div>
            <h4>Lab Verified</h4>
            <p>All batches undergo rigorous laboratory testing</p>
          </motion.div>
          
          <motion.div 
            className={styles.certCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.certIcon}>🛡️</div>
            <h4>Purity Guaranteed</h4>
            <p>Free from harmful chemicals, pesticides and additives</p>
          </motion.div>
        </div>
      </div>
      
      <div className={styles.brushBottom}></div>
    </section>
  );
};

export default CertificationSection;