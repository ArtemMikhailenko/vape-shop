import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logoImg from '../../assets/logo.png'; // Логотип BADVAPE

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerInfo}>
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Vape</span>
                <a href="https://t.me/vapehub_operator" className={styles.contactLink}>@vapehub_operator</a>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Магазин ©</span>
                <span className={styles.contactText}>2020 - {currentYear}</span>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.footerLinks}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/contacts" className={styles.footerLink}>Контакты</Link>
              <Link to="/where-to-buy" className={styles.footerLink}>Где купить?</Link>
            </motion.div>
          </div>
          
          <motion.div 
            className={styles.ctaContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/buy" className={styles.buyButton}>
              КУПИТЬ СЕЙЧАС
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.footerBottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className={styles.logoContainer}>
            <img src={logoImg} alt="BADVAPE" className={styles.footerLogo} />
          </div>
          
          <div className={styles.copyrightText}>
            © {currentYear} BADVAPE-HUB. Все права защищены.
          </div>
          
          <div className={styles.legalLinks}>
            <Link to="/privacy" className={styles.legalLink}>Политика конфиденциальности</Link>
            <Link to="/terms" className={styles.legalLink}>Условия использования</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;