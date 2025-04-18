import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import styles from './AboutUsPage.module.css';
import logoImage from '../../assets/logo-snoop.jpg'; // Логотип с изображения 2

const AboutUsPage = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const logoScale = useSpring(1, springConfig);
  const logoRotate = useSpring(0, springConfig);
  
  // Эффект параллакса для карточки с текстом
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Нормализация значений от -1 до 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(normalizedX * 10); // Контролируем силу эффекта
      mouseY.set(normalizedY * 10);
      
      // Анимация логотипа при наведении
      logoScale.set(1.05);
      logoRotate.set(normalizedX * 5); // Наклон до 5 градусов
      
      // Возвращаем логотип в исходное состояние при отсутствии курсора
      setTimeout(() => {
        logoScale.set(1);
        logoRotate.set(0);
      }, 500);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, logoScale, logoRotate]);
  
  // Анимация "дыма" от логотипа
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createSmokeParticle = () => {
      const smoke = document.createElement('div');
      smoke.className = styles.smokeParticle;
      smoke.style.left = `${Math.random() * 20 + 40}%`; // Рандомная позиция
      smoke.style.animationDuration = `${Math.random() * 3 + 4}s`; // Рандомная длительность
      smoke.style.opacity = Math.random() * 0.3 + 0.1; // Рандомная прозрачность
      containerRef.current.appendChild(smoke);
      
      // Удаляем частицу после анимации
      setTimeout(() => {
        smoke.remove();
      }, 7000);
    };
    
    // Создаем частицы дыма с интервалом
    const smokeInterval = setInterval(createSmokeParticle, 1000);
    return () => clearInterval(smokeInterval);
  }, []);
  
  // Секции "о нас" с эффектными заголовками
  const aboutSections = [
    {
      id: 'welcome',
      title: 'Добро пожаловать',
      text: 'Рады приветствовать Вас в нашем магазине Bad Vape',
      icon: '👋'
    },
    {
      id: 'import',
      title: 'Крупнейший импортер',
      text: 'Мы являемся самым большим импортером масла конопли из США в Россию. С помощью нас вы получите незабываемые ощущения от медицины 21 века. Мы постоянно расширяем ассортимент продукции для Вашего гастрономического удовольствия.',
      icon: '🌿'
    },
    {
      id: 'clients',
      title: 'Наши клиенты',
      text: 'Наши клиенты это уважаемые люди в своей сфере взаимодействия, от политиков до инженеров, от врачей до спортсменов, от кочегаров до пилотов болидов, от космонавтов до юристов.',
      icon: '👥'
    },
    {
      id: 'innovation',
      title: 'Инженерное искусство',
      text: 'Наша продукция это настоящий шедевр инженерного искусства, который подарит новый способ употребления марихуаны без негативных моментов таких как – запах, сложности употреблять в общественных местах, проблем с дыхательными путями.',
      icon: '🔬'
    },
    {
      id: 'partners',
      title: 'Партнерство',
      text: 'Приглашаем к сотрудничеству дистрибьютеров по всей России. Специальные цены для партнеров.',
      icon: '🤝'
    }
  ];
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };
  
  return (
    <div className={styles.aboutUsPage} ref={containerRef}>
      <div className={styles.backgroundEffects}>
        <div className={styles.glowEffect1}></div>
        <div className={styles.glowEffect2}></div>
      </div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y: contentY, opacity }}
      >
        <motion.div 
          className={styles.logoSection}
          style={{ 
            scale: logoScale,
            rotateY: logoRotate
          }}
        >
          <div className={styles.logoContainer}>
            <img src={logoImage} alt="VAPE HUB THC" className={styles.logo} />
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.textSection}
          style={{ 
            x: useTransform(mouseX, (value) => value * -1),
            y: useTransform(mouseY, (value) => value * -1)
          }}
          ref={textRef}
        >
          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            О нас
          </motion.h1>
          
          <motion.div
            className={styles.aboutSections}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {aboutSections.map((section, index) => (
              <motion.div 
                key={section.id}
                className={styles.aboutItem}
                variants={itemVariants}
                custom={index}
              >
                <div className={styles.sectionIcon}>
                  {section.icon}
                </div>
                
                <div className={styles.sectionContent}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <p className={styles.sectionText}>{section.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="/contacts" className={styles.contactButton}>
              Связаться с нами
            </a>
            <a href="/shop" className={styles.shopButton}>
              Перейти в магазин
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;