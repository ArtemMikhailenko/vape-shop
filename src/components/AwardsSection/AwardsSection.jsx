import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './AwardsSection.module.css';

const AwardsSection = () => {
  const sectionRef = useRef(null);
  const [activeYear, setActiveYear] = useState('2017');
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: clientX - left,
      y: clientY - top
    });
  };
  
  const awards = {
    '2017': [
      {
        id: 1,
        place: '1st Place',
        category: 'Best Vape Pen',
        product: 'Gelato',
        event: 'High Times SoCal Medical Cannabis Cup'
      },
      {
        id: 2,
        place: '1st Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Gelato',
        event: 'High Times Midwest Cannabis Cup'
      },
      {
        id: 3,
        place: '2nd Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Gelato',
        event: 'High Times NorCal Cannabis Cup'
      },
      {
        id: 4,
        place: '1st Place',
        category: 'Best Product',
        product: 'Double Barrel Vape',
        event: 'High Times SoCal Harvest Cup'
      }
    ],
    '2016': [
      {
        id: 5,
        place: '1st Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Cali-O',
        event: 'High Times SoCal Cannabis Cup'
      },
      {
        id: 6,
        place: '2nd Place',
        category: 'Best Vaporizer',
        product: '',
        event: 'High Times SoCal Medical Cannabis Cup'
      },
      {
        id: 7,
        place: '2nd Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Cali-O',
        event: 'High Times SoCal Medical Cannabis Cup'
      }
    ],
    '2015': [
      {
        id: 8,
        place: '1st Place',
        category: 'Best Vaporizer',
        product: '',
        event: 'High Times SoCal Medical Cannabis Cup'
      },
      {
        id: 9,
        place: '2nd Place',
        category: 'Best Product',
        product: '',
        event: 'High Times SoCal Medical Cannabis Cup'
      }
    ]
  };
  
  const years = Object.keys(awards).sort((a, b) => b - a); // Сортировка по убыванию
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };
  
  const medalAnimation = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef} 
      className={styles.awardsSection}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className={styles.mouseCursor} 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          opacity: isHovering ? 1 : 0
        }}
      ></div>
      
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.particlesContainer}>
          {Array.from({ length: 50 }).map((_, index) => (
            <div 
              key={index}
              className={styles.particle}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className={styles.contentWrapper}
        style={{ opacity, scale }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <motion.div 
              className={styles.awardIcon}
              animate="pulse"
              variants={medalAnimation}
            >
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L30 10L38 12L36 20L40 28L32 30L28 38L24 32L20 38L16 30L8 28L12 20L10 12L18 10L24 4Z" fill="#FFD700" stroke="#FFD700"/>
                <circle cx="24" cy="24" r="8" fill="#FFD700" stroke="#FFD700"/>
              </svg>
            </motion.div>
            <h2 className={styles.awardTitle}>
              WORLD'S MOST<br/>
              <span className={styles.emphasizedText}>AWARDED</span><br/>
              CANNABIS VAPE
            </h2>
          </div>
        </div>
        
        <div className={styles.timelineContainer}>
          <div className={styles.yearsNavigation}>
            {years.map(year => (
              <button
                key={year}
                className={`${styles.yearButton} ${activeYear === year ? styles.yearButtonActive : ''}`}
                onClick={() => setActiveYear(year)}
              >
                <span className={styles.yearText}>{year}</span>
                {activeYear === year && <div className={styles.yearActiveIndicator}></div>}
              </button>
            ))}
          </div>
          
          <div className={styles.awardsList}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={styles.yearAwards}
              >
                <div className={styles.yearIndicator}>
                  <div className={styles.year}>{activeYear}</div>
                  <div className={styles.yearLine}></div>
                </div>
                
                {awards[activeYear].map((award, index) => (
                  <motion.div
                    key={award.id}
                    className={styles.awardCard}
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 30px rgba(230, 62, 62, 0.2)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className={styles.awardPlace}>
                      <div className={styles.placeBadge}>{award.place}</div>
                    </div>
                    
                    <div className={styles.awardDetails}>
                      <div className={styles.awardCategory}>
                        {award.category}
                        {award.product && <span> | {award.product}</span>}
                      </div>
                      
                      <div className={styles.awardEvent}>
                        {award.event}
                      </div>
                    </div>
                    
                    <div className={styles.awardDecoration}>
                      {award.place.includes('1st') && (
                        <div className={styles.goldDecoration}></div>
                      )}
                      {award.place.includes('2nd') && (
                        <div className={styles.silverDecoration}></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <button className={styles.ctaButton}>
            КУПИТЬ СЕЙЧАС
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AwardsSection;
