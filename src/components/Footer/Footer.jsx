import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logoImg from '../../assets/logo2.png';
import { FaTelegramPlane, FaShoppingCart, FaMapMarkerAlt, FaShieldAlt, FaFileAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#000000" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <motion.div 
            className={styles.brandSection}
            initial={{  y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.logoContainer}>
              <img src={logoImg} alt="BADVAPE" className={styles.footerLogo} />
            </div>
            <p className={styles.brandTagline}>Высококачественные продукты для истинных ценителей</p>
          </motion.div>
          
          <motion.div 
            className={styles.linksSection}
            initial={{  y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={styles.sectionTitle}>Навигация</h3>
            <div className={styles.linksGrid}>
              <Link to="/" className={styles.footerLink}>Главная</Link>
              <Link to="/shop" className={styles.footerLink}>Каталог</Link>
              <Link to="/about" className={styles.footerLink}>О нас</Link>
              <Link to="/faq" className={styles.footerLink}>FAQ</Link>
              <Link to="/contacts" className={styles.footerLink}>Контакты</Link>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.contactSection}
            initial={{  y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={styles.sectionTitle}>Связаться с нами</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FaTelegramPlane className={styles.contactIcon} />
                <a href="https://t.me/vapehub_operator" className={styles.contactLink}>@vapehub_operator</a>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span className={styles.contactText}>Доставка по всей стране</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.ctaSection}
            initial={{   y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className={styles.sectionTitle}>Оформить заказ</h3>
            <p className={styles.ctaText}>Готовы сделать заказ? Свяжитесь с нами через Telegram или нажмите кнопку ниже</p>
            <Link to="/shop" className={styles.buyButton}>
              <FaShoppingCart className={styles.buttonIcon} />
              <span>Купить сейчас</span>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.footerMiddle}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.footerDivider}></div>
          
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11.003 16L6.76 11.757L8.174 10.343L11.003 13.172L16.659 7.515L18.074 8.929L11.003 16Z" fill="#4CAF50"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4>Качество</h4>
                <p>Только оригинальная продукция</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00008 6V9H5.00008V6H8.00008ZM3.00008 4V11H10.0001V4H3.00008ZM14.0001 6V9H11.0001V6H14.0001ZM9.00008 4V11H16.0001V4H9.00008ZM20.0001 6V9H17.0001V6H20.0001ZM15.0001 4V11H22.0001V4H15.0001ZM8.00008 16V19H5.00008V16H8.00008ZM3.00008 14V21H10.0001V14H3.00008ZM14.0001 16V19H11.0001V16H14.0001ZM9.00008 14V21H16.0001V14H9.00008ZM20.0001 16V19H17.0001V16H20.0001ZM15.0001 14V21H22.0001V14H15.0001Z" fill="#4CAF50"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4>Доставка</h4>
                <p>По всей стране</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="#4CAF50"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4>Поддержка</h4>
                <p>24/7 через Telegram</p>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
};

export default Footer;