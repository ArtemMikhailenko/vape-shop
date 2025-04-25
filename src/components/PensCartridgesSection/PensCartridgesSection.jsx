import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './PensCartridgesSection.module.css';
import pensImage from '../../assets/Kingpen-Vape-Pens.jpg';
import img from '../../assets/kanabis.svg'
const PensCartridgesSection = () => {
  const sectionRef = useRef(null);
  const [selectedVariant, setSelectedVariant] = useState('purple-kush');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yTextContainer = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const yImageContainer = useTransform(scrollYProgress, [0, 0.5], [50, -50]);
  
  // Creating floating particles effect
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = styles.floatingParticle;
      
      // Random styles
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      
      sectionRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle && particle.parentNode) {
          particle.remove();
        }
      }, 30000);
    };
    
    // Create initial particles
    for (let i = 0; i < 8; i++) {
      createParticle();
    }
    
    // Add more periodically
    const particleInterval = setInterval(createParticle, 3000);
    
    return () => clearInterval(particleInterval);
  }, []);
  
  // Features list
  const features = [
    { id: 1, text: "Низкий расход батареи", icon: "🔋" },
    { id: 2, text: "Бесперебойный поток воздуха", icon: "💨" },
    { id: 3, text: "Настраиваемые уровни мощности", icon: "⚡" },
    { id: 4, text: "Предварительный нагрев", icon: "🔥" },
    { id: 5, text: "Стильный дизайн", icon: "✨" }
  ];
  
  // Product variants
  const variants = [
    { id: 'purple-kush', name: 'Purple Kush', color: '#8E44AD', type: 'Indica', effect: 'Расслабляющий' },
    { id: 'tangie', name: 'Tangie', color: '#F39C12', type: 'Sativa', effect: 'Энергичный' },
    { id: 'gelato', name: 'Gelato', color: '#27AE60', type: 'Hybrid', effect: 'Сбалансированный' },
    { id: 'og-kush', name: 'OG Kush', color: '#E74C3C', type: 'Indica', effect: 'Успокаивающий' }
  ];
  
  // Get selected variant details
  const currentVariant = variants.find(variant => variant.id === selectedVariant);
  
  return (
    <section ref={sectionRef} className={styles.pensSection}>
      <div className={styles.sectionBackground}>
        <div className={styles.gradientOverlay}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <motion.div 
            className={styles.textContainer}
            style={{ opacity, y: yTextContainer }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.categoryTag}>Наша продукция</div>
              <h2 className={styles.title}>РУЧКИ И КАРТРИДЖИ</h2>
              <div className={styles.subtitle}>
                <span>BAD</span>
                <span className={styles.accentText}>VAPE</span>
              </div>
            </div>
            
            <div className={styles.contentRow}>
              <div className={styles.textColumn}>
                <p className={styles.description}>
                  Наши ручки поддерживают одни из самых низких показателей расхода батареи на рынке,
                  а наши картриджи спроектированы для обеспечения бесперебойного и стабильного 
                  воздушного потока.
                </p>
                
                <p className={styles.description}>
                  Кроме этого, наши ручки имеют несколько уровней мощности, так что вы можете 
                  контролировать свои настройки нагрева (низкий, средний и горячий) и использовать 
                  режим предварительного нагрева.
                </p>
                
                <div className={styles.cannabisInfo}>
                  <div className={styles.cannabisIcon}>
                    <img src={img} alt="" />
                  </div>
                  <div className={styles.cannabisContent}>
                    <p>Наши картриджи содержат высококачественное масло каннабиса с полным спектром натуральных терпенов и каннабиноидов.</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.featuresColumn}>
                <h3 className={styles.featureHeading}>Особенности</h3>
                
                <motion.div 
                  className={styles.featuresList}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {features.map((feature, index) => (
                    <motion.div 
                      key={feature.id}
                      className={styles.featureItem}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={styles.featureIcon}>{feature.icon}</div>
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <motion.button 
                className={styles.learnMoreButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>УЗНАТЬ БОЛЬШЕ</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
              
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.imageContainer}
            style={{ opacity, y: yImageContainer }}
          >
         
            
            <div className={styles.productDisplay}>
              <div className={styles.imageWrapper}>
                <img src={pensImage} alt="BADVAPE ручки" className={styles.productImage} />
                
                <motion.div 
                  className={styles.productBadge}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  ПРЕМИУМ КАЧЕСТВО
                </motion.div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedVariant}
                  className={styles.productInfo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.productInfoHeader}>
                    <div className={styles.typeTag} style={{ backgroundColor: `${currentVariant.color}20`, color: currentVariant.color }}>
                      {currentVariant.type}
                    </div>
                    <h3 className={styles.productName}>{currentVariant.name}</h3>
                  </div>
                  
                  <div className={styles.productSpecs}>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>⚡</div>
                      <div className={styles.specContent}>
                        <div className={styles.specLabel}>Эффект</div>
                        <div className={styles.specValue}>{currentVariant.effect}</div>
                      </div>
                    </div>
                    
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>⏱️</div>
                      <div className={styles.specContent}>
                        <div className={styles.specLabel}>Срок работы</div>
                        <div className={styles.specValue}>300 затяжек</div>
                      </div>
                    </div>
                    
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>⚖️</div>
                      <div className={styles.specContent}>
                        <div className={styles.specLabel}>Объем</div>
                        <div className={styles.specValue}>1000 мг</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.thcContent}>
                    <div className={styles.thcHeader}>
                      <div className={styles.thcLabel}>THC Содержание</div>
                      <div className={styles.thcValue}>85-90%</div>
                    </div>
                    <div className={styles.thcBar}>
                      <div className={styles.thcFill} style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.certificateStrip}>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🔍</div>
            <div className={styles.stripText}>Лабораторно проверено</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🌿</div>
            <div className={styles.stripText}>100% натуральные терпены</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🛡️</div>
            <div className={styles.stripText}>Сертифицировано</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PensCartridgesSection;