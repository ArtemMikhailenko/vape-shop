import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import logoImage from '../../assets/logo2.png'; // Make sure you have a logo

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  
  // Close mobile menu on location change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Handle scroll effect
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

  // Handle navigation and scroll restoration
  useEffect(() => {
    // If the path changed and we're not at the top, scroll to top
    if (prevPathRef.current !== location.pathname) {
      window.scrollTo(0, 0);
    }
    
    // Update ref for next comparison
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const navItems = [
    { name: 'ГЛАВНАЯ', path: '/' },
    { name: 'ПРОИЗВОДСТВО', path: '/production' },
    { name: 'МАГАЗИН', path: '/shop' },
    { name: 'О НАС', path: '/about' },
    { name: 'КОНТАКТЫ', path: '/contacts' },
    { name: 'FAQ', path: '/faq' },
    { name: 'ПОКУПКА', path: '/purchase' }
  ];

  // Handle navigation click
  const handleNavClick = () => {
    setMenuOpen(false);
    // Ensure we start at the top of the new page
    window.scrollTo(0, 0);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: {  y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuActive : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <Link to="/" onClick={handleNavClick}>
              <motion.div 
                className={styles.logo}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logoImage} alt="Breaking-Bad" />
              </motion.div>
            </Link>
          </div>
          
          <nav className={styles.navigation}>
            <ul className={styles.navList}>
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={styles.navLink}
                    onClick={handleNavClick}
                  >
                    {item.name}
                    {location.pathname === item.path && 
                      <motion.div 
                        className={styles.activeIndicator}
                        layoutId="activeIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    }
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <button 
            className={`${styles.burgerButton} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>
        </div>
      </motion.header>
      
      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className={styles.mobileNavOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={styles.mobileNavContainer}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`${styles.mobileNavItem} ${location.pathname === item.path ? styles.activeNavItem : ''}`}
                  variants={itemVariants}
                >
                  <Link 
                    to={item.path}
                    className={styles.mobileNavLink}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className={styles.mobileNavFooter}
                variants={itemVariants}
              >
                <img src={logoImage} alt="Breaking-Bad" />
                <div className={styles.footerText}>Premium Cannabis Products</div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;