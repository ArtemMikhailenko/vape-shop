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
        event: 'High Times SoCal Medical Cannabis Cup',
        thc: '87%',
        strain: 'Hybrid'
      },
      {
        id: 2,
        place: '1st Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Gelato',
        event: 'High Times Midwest Cannabis Cup',
        thc: '85%',
        strain: 'Hybrid'
      },
      {
        id: 3,
        place: '2nd Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Gelato',
        event: 'High Times NorCal Cannabis Cup',
        thc: '86%',
        strain: 'Hybrid'
      },
      {
        id: 4,
        place: '1st Place',
        category: 'Best Product',
        product: 'Double Barrel Vape',
        event: 'High Times SoCal Harvest Cup',
        thc: '90%',
        strain: 'Various'
      }
    ],
    '2016': [
      {
        id: 5,
        place: '1st Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Cali-O',
        event: 'High Times SoCal Cannabis Cup',
        thc: '84%',
        strain: 'Sativa'
      },
      {
        id: 6,
        place: '2nd Place',
        category: 'Best Vaporizer',
        product: 'OG Kush',
        event: 'High Times SoCal Medical Cannabis Cup',
        thc: '82%',
        strain: 'Indica'
      },
      {
        id: 7,
        place: '2nd Place',
        category: 'Best Vape Pen Cartridges',
        product: 'Cali-O',
        event: 'High Times SoCal Medical Cannabis Cup',
        thc: '83%',
        strain: 'Sativa'
      }
    ],
    '2015': [
      {
        id: 8,
        place: '1st Place',
        category: 'Best Vaporizer',
        product: 'Blue Dream',
        event: 'High Times SoCal Medical Cannabis Cup',
        thc: '80%',
        strain: 'Hybrid'
      },
      {
        id: 9,
        place: '2nd Place',
        category: 'Best Product',
        product: 'Sour Diesel',
        event: 'High Times SoCal Medical Cannabis Cup',
        thc: '81%',
        strain: 'Sativa'
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

  // Функция для определения цвета на основе типа сорта
  const getStrainColor = (strain) => {
    switch(strain.toLowerCase()) {
      case 'sativa':
        return '#F39C12'; // оранжевый
      case 'indica':
        return '#8E44AD'; // фиолетовый
      case 'hybrid':
        return '#27AE60'; // зеленый
      default:
        return '#3498DB'; // синий для прочих
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
      <div className={styles.backgroundElements}>
        <div className={styles.leafPattern}></div>
        <div className={styles.gradientOverlay}></div>
      </div>
      
      <motion.div 
        className={styles.contentWrapper}
        style={{ opacity, scale }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.leafIcon}>
            {/* <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C36.8 0 26.1 13.4 25.6 30.2c0 .4 0 .8-.2 1.2s-.5.6-.9.7c-.2 0-.4 0-.6-.1C15.4 29 6.5 36.2 6.5 46.2c0 6.6 3.5 12.3 8.7 15.3.4.2.6.6.6 1s-.1.8-.5 1c-7.3 5.4-7.3 18.2 1.6 23.2 6.3 3.5 14.2 1.6 19-4.1.3-.3.6-.5 1-.5s.7.1 1 .4c4.3 5.8 11.2 9.5 19 9.5 13.3 0 24-12.3 24-27.5 0-5.7-1.5-11.1-4.2-15.5-.2-.4-.2-.9 0-1.3s.5-.7.9-.8c11.3-2.8 19.4-14.3 19.4-27.6C97 8.4 75.8 0 50 0z"
                fill="#4CAF50" />
            </svg> */}
          </div>
          
          <div className={styles.titleContainer}>
            <motion.div 
              className={styles.awardIcon}
              animate="pulse"
              variants={medalAnimation}
            >
              {/* <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L30 10L38 12L36 20L40 28L32 30L28 38L24 32L20 38L16 30L8 28L12 20L10 12L18 10L24 4Z" fill="#FFD700" stroke="#FFD700"/>
                <circle cx="24" cy="24" r="8" fill="#FFD700" stroke="#FFD700"/>
              </svg> */}
            </motion.div>
            <h2 className={styles.awardTitle}>
              WORLD'S MOST<br/>
              <span className={styles.emphasizedText}>AWARDED</span><br/>
              CANNABIS VAPE
            </h2>
          </div>
          
          <div className={styles.awardBadges}>
            <div className={styles.awardBadge}>
              <div className={styles.badgeNumber}>15+</div>
              <div className={styles.badgeText}>Cannabis Cup Awards</div>
            </div>
            <div className={styles.awardBadge}>
              <div className={styles.badgeNumber}>90%</div>
              <div className={styles.badgeText}>THC Maximum</div>
            </div>
            <div className={styles.awardBadge}>
              <div className={styles.badgeNumber}>3+</div>
              <div className={styles.badgeText}>Years Excellence</div>
            </div>
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
                      boxShadow: "0 10px 30px rgba(76, 175, 80, 0.2)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className={styles.awardPlace}>
                      <div 
                        className={styles.placeBadge}
                        style={{ 
                          color: award.place.includes('1st') ? '#FFD700' : '#C0C0C0',
                          borderColor: award.place.includes('1st') ? 'rgba(255, 215, 0, 0.3)' : 'rgba(192, 192, 192, 0.3)'
                        }}
                      >
                        {award.place}
                      </div>
                    </div>
                    
                    <div className={styles.awardDetails}>
                      <div className={styles.awardMeta}>
                        <div 
                          className={styles.strainTag}
                          style={{ backgroundColor: `${getStrainColor(award.strain)}20`, color: getStrainColor(award.strain) }}
                        >
                          {award.strain}
                        </div>
                        <div className={styles.thcContent}>
                          <span className={styles.thcLabel}>THC</span>
                          <span className={styles.thcValue}>{award.thc}</span>
                        </div>
                      </div>
                      
                      <div className={styles.awardCategory}>
                        {award.category}
                        {award.product && <span> | {award.product}</span>}
                      </div>
                      
                      <div className={styles.awardEvent}>
                        <div className={styles.eventIcon}>🏆</div>
                        <span>{award.event}</span>
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
        
        <div className={styles.cannabisFacts}>
          <div className={styles.factTitle}>What Makes Our Products Award-Winning</div>
          <div className={styles.factsContainer}>
            <div className={styles.factItem}>
              <div className={styles.factIcon}>🧪</div>
              <div className={styles.factContent}>
                <h3>Premium Extraction</h3>
                <p>5-stage distillation process for highest purity</p>
              </div>
            </div>
            <div className={styles.factItem}>
              <div className={styles.factIcon}>🌿</div>
              <div className={styles.factContent}>
                <h3>Strain Selection</h3>
                <p>Only top-shelf cannabis varieties</p>
              </div>
            </div>
            <div className={styles.factItem}>
              <div className={styles.factIcon}>🔬</div>
              <div className={styles.factContent}>
                <h3>Lab Tested</h3>
                <p>Verified potency and zero contaminants</p>
              </div>
            </div>
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
            <svg className={styles.buttonArrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AwardsSection;