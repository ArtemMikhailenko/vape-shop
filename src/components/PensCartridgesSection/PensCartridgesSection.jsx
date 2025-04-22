import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './PensCartridgesSection.module.css';
import pensImage from '../../assets/Kingpen-Vape-Pens.jpg'; // Изображение линейки ручек

const PensCartridgesSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const xText = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const xImage = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  // Характеристики для анимации
  const features = [
    { id: 1, text: "Низкий расход батареи", icon: "🔋" },
    { id: 2, text: "Бесперебойный поток воздуха", icon: "💨" },
    { id: 3, text: "Настраиваемые уровни мощности", icon: "⚡" },
    { id: 4, text: "Предварительный нагрев", icon: "🔥" },
    { id: 5, text: "Стильный дизайн", icon: "✨" }
  ];
  
  const strains = [
    { name: 'Indica', color: '#8E44AD' },
    { name: 'Sativa', color: '#F39C12' },
    { name: 'Hybrid', color: '#27AE60' }
  ];
  
  return (
    <section ref={sectionRef} className={styles.pensSection}>
      <div className={styles.sectionBackground}>
        <div className={styles.leafPattern}></div>
        <div className={styles.gradientOverlay}></div>
      </div>
      
      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.textContainer}
          style={{ opacity, x: xText }}
        >
          <div className={styles.categoryTag}>Наши продукты</div>
          
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>РУЧКИ И КАРТРИДЖИ</h2>
            <h3 className={styles.subtitle}>BAD VAPE</h3>
            
            <div className={styles.strainsIcons}>
              {strains.map(strain => (
                <div 
                  key={strain.name} 
                  className={styles.strainBadge}
                  style={{ backgroundColor: `${strain.color}20`, borderColor: strain.color }}
                >
                  <div 
                    className={styles.strainDot} 
                    style={{ backgroundColor: strain.color }}
                  ></div>
                  <span>{strain.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className={styles.description}>
            Наши ручки поддерживает одни из самых низких показателей расхода батареи на рынке,
            а наши картриджи спроектированы для обеспечения бесперебойного и стабильного 
            воздушного потока.
          </p>
          
          <p className={styles.description}>
            Кроме этого, наши ручки имеют несколько уровней мощности, так что вы можете 
            контролировать свои настройки нагрева (низкий, средний и горячий) и использовать 
            режим предварительного нагрева, который позволяет нагревать масло перед употреблением.
          </p>
          
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <div className={styles.cannabisInfo}>
            <div className={styles.cannabisIcon}>
              <svg viewBox="0 0 100 100" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C36.8 0 26.1 13.4 25.6 30.2c0 .4 0 .8-.2 1.2s-.5.6-.9.7c-.2 0-.4 0-.6-.1C15.4 29 6.5 36.2 6.5 46.2c0 6.6 3.5 12.3 8.7 15.3.4.2.6.6.6 1s-.1.8-.5 1c-7.3 5.4-7.3 18.2 1.6 23.2 6.3 3.5 14.2 1.6 19-4.1.3-.3.6-.5 1-.5s.7.1 1 .4c4.3 5.8 11.2 9.5 19 9.5 13.3 0 24-12.3 24-27.5 0-5.7-1.5-11.1-4.2-15.5-.2-.4-.2-.9 0-1.3s.5-.7.9-.8c11.3-2.8 19.4-14.3 19.4-27.6C97 8.4 75.8 0 50 0z"
                  fill="#4CAF50" />
              </svg>
            </div>
            <div className={styles.cannabisContent}>
              <p>Наши картриджи содержат высококачественное масло каннабиса с полным спектром натуральных терпенов и каннабиноидов.</p>
            </div>
          </div>
          
          <motion.button 
            className={styles.learnMoreButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>УЗНАТЬ БОЛЬШЕ</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>
        
        <motion.div 
          className={styles.imageContainer}
          style={{ opacity, x: xImage }}
        >
          <div className={styles.imageWrapper}>
            <img src={pensImage} alt="BADVAPE ручки" className={styles.image} />
            
            <motion.div 
              className={styles.imageBadge}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              ПРЕМИУМ КАЧЕСТВО
            </motion.div>
            
            <div className={styles.productsMenu}>
              <div className={styles.menuTitle}>Доступные варианты</div>
              <div className={styles.menuItems}>
                <div className={styles.menuItem}>
                  <div className={styles.menuItemDot} style={{backgroundColor: "#8E44AD"}}></div>
                  <span>Purple Kush</span>
                </div>
                <div className={styles.menuItem}>
                  <div className={styles.menuItemDot} style={{backgroundColor: "#F39C12"}}></div>
                  <span>Tangie</span>
                </div>
                <div className={styles.menuItem}>
                  <div className={styles.menuItemDot} style={{backgroundColor: "#27AE60"}}></div>
                  <span>Gelato</span>
                </div>
                <div className={styles.menuItem}>
                  <div className={styles.menuItemDot} style={{backgroundColor: "#E74C3C"}}></div>
                  <span>OG Kush</span>
                </div>
              </div>
            </div>
            
            <div className={styles.imageOverlay}>
              <div className={styles.specItem}>
                <div className={styles.specLabel}>Срок работы</div>
                <div className={styles.specValue}>до 300 затяжек</div>
              </div>
              
              <div className={styles.specItem}>
                <div className={styles.specLabel}>Ёмкость</div>
                <div className={styles.specValue}>1000 мг</div>
              </div>
            </div>
          </div>
          
          <div className={styles.potencyIndicator}>
            <div className={styles.potencyLabel}>THC</div>
            <div className={styles.potencyScale}>
              <div className={styles.potencyFill}></div>
            </div>
            <div className={styles.potencyValue}>85-90%</div>
          </div>
        </motion.div>
      </div>
      
      <div className={styles.certificateStrip}>
        <div className={styles.stripContainer}>
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
      
      <div className={styles.decorElements}>
        <div className={styles.decorLine1}></div>
        <div className={styles.decorLine2}></div>
        <div className={styles.decorDot1}></div>
        <div className={styles.decorDot2}></div>
      </div>
    </section>
  );
};

export default PensCartridgesSection;