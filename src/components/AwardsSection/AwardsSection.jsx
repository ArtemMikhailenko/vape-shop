import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './AwardsSection.module.css';
import { FaTrophy, FaLeaf, FaFlask, FaMedal } from 'react-icons/fa';

const AwardsSection = () => {
  const sectionRef = useRef(null);
  const [activeYear, setActiveYear] = useState('2017');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  
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
  
  const years = Object.keys(awards).sort((a, b) => b - a); // Sort descending
  
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

  // Function to determine color based on strain type
  const getStrainColor = (strain) => {
    switch(strain.toLowerCase()) {
      case 'sativa':
        return '#F39C12'; // orange
      case 'indica':
        return '#8E44AD'; // purple
      case 'hybrid':
        return '#27AE60'; // green
      default:
        return '#3498DB'; // blue for others
    }
  };
  
  return (
    <section ref={sectionRef} className={styles.awardsSection}>
      <div className={styles.backgroundElements}>
        <div className={styles.leafPattern}></div>
        <div className={styles.gradientOverlay}></div>
      </div>
      
      <motion.div 
        className={styles.contentWrapper}
        style={{ opacity, scale }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <motion.div 
              className={styles.awardIcon}
              animate="pulse"
              variants={medalAnimation}
            >
              <FaTrophy size={60} color="#FFD700" />
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
                        <FaTrophy className={styles.eventIcon} />
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
              <div className={styles.factIcon}>
                <FaFlask />
              </div>
              <div className={styles.factContent}>
                <h3>Premium Extraction</h3>
                <p>5-stage distillation process for highest purity</p>
              </div>
            </div>
            <div className={styles.factItem}>
              <div className={styles.factIcon}>
                <FaLeaf />
              </div>
              <div className={styles.factContent}>
                <h3>Strain Selection</h3>
                <p>Only top-shelf cannabis varieties</p>
              </div>
            </div>
            <div className={styles.factItem}>
              <div className={styles.factIcon}>
                <FaMedal />
              </div>
              <div className={styles.factContent}>
                <h3>Lab Tested</h3>
                <p>Verified potency and zero contaminants</p>
              </div>
            </div>
          </div>
        </div>
        
        
      </motion.div>
    </section>
  );
};

export default AwardsSection;