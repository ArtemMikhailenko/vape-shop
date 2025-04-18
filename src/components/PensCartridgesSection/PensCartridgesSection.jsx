// PensCartridgesSection.jsx
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
    { id: 1, text: "Низкий расход батареи" },
    { id: 2, text: "Бесперебойный поток воздуха" },
    { id: 3, text: "Настраиваемые уровни мощности" },
    { id: 4, text: "Предварительный нагрев" },
    { id: 5, text: "Стильный дизайн" }
  ];
  
  return (
    <section ref={sectionRef} className={styles.pensCartridgesSection}>
      <div className={styles.background}>
        <div className={styles.smokeEffect}></div>
      </div>
      
      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.textContainer}
          style={{ opacity, x: xText }}
        >
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>РУЧКИ И КАРТРИДЖИ</h2>
            <h3 className={styles.subtitle}>BAD VAPE</h3>
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
                <div className={styles.featureIcon}>+</div>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button 
            className={styles.learnMoreButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            УЗНАТЬ БОЛЬШЕ
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
        </motion.div>
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