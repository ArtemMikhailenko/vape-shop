import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Header.module.css';
import logoImage from '../../assets/logo.png'; // Предполагается, что у вас есть логотип

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'ГЛАВНАЯ', path: '/' },
    { name: 'ПРОИЗВОДСТВО', path: '/production' },
    { name: 'МАГАЗИН', path: '/shop' },
    { name: 'О НАС', path: '/about' },
    { name: 'КОНТАКТЫ', path: '/contacts' },
    { name: 'FAQ', path: '/faq' },
    { name: 'ОСУЩЕСТВЛЕНИЕ ПОКУПКИ', path: '/purchase' }
  ];

  return (
    <motion.header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <motion.img 
              src={logoImage} 
              alt="BADVAPE-HUB" 
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </div>
        
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <motion.li 
                key={index} 
                className={styles.navItem}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={styles.navLink}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;