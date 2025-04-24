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
      if (!containerRef.current) return;
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
  
  // Анимация "листьев каннабиса" для фона
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createLeafParticle = () => {
      const leaf = document.createElement('div');
      leaf.className = styles.leafParticle;
      
      // Рандомное позиционирование и анимация
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.top = `${Math.random() * 30 + 30}%`; 
      leaf.style.animationDuration = `${Math.random() * 5 + 8}s`;
      leaf.style.animationDelay = `${Math.random() * 3}s`;
      leaf.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`;
      
      containerRef.current.appendChild(leaf);
      
      // Удаляем частицу после анимации
      setTimeout(() => {
        if (leaf.parentNode) {
          leaf.remove();
        }
      }, 13000);
    };
    
    // Создаем частицы с интервалом
    const particleInterval = setInterval(createLeafParticle, 2000);
    // Сразу создаем несколько частиц
    for (let i = 0; i < 5; i++) {
      createLeafParticle();
    }
    
    return () => clearInterval(particleInterval);
  }, []);
  
  // Секции "о нас" с эффектными заголовками
  const aboutSections = [
    {
      id: 'welcome',
      title: 'Добро пожаловать',
      text: 'Рады приветствовать Вас в нашем магазине Bad Vape',
      icon: '👋',
      color: '#4CAF50'
    },
    {
      id: 'import',
      title: 'Крупнейший импортер',
      text: 'Мы являемся самым большим импортером масла конопли из США в Россию. С помощью нас вы получите незабываемые ощущения от медицины 21 века. Мы постоянно расширяем ассортимент продукции для Вашего гастрономического удовольствия.',
      icon: '🌿',
      color: '#8E44AD'
    },
    {
      id: 'clients',
      title: 'Наши клиенты',
      text: 'Наши клиенты это уважаемые люди в своей сфере взаимодействия, от политиков до инженеров, от врачей до спортсменов, от кочегаров до пилотов болидов, от космонавтов до юристов.',
      icon: '👥',
      color: '#F39C12'
    },
    {
      id: 'innovation',
      title: 'Инженерное искусство',
      text: 'Наша продукция это настоящий шедевр инженерного искусства, который подарит новый способ употребления марихуаны без негативных моментов таких как – запах, сложности употреблять в общественных местах, проблем с дыхательными путями.',
      icon: '🔬',
      color: '#27AE60'
    },
    {
      id: 'partners',
      title: 'Партнерство',
      text: 'Приглашаем к сотрудничеству дистрибьютеров по всей России. Специальные цены для партнеров.',
      icon: '🤝',
      color: '#3498DB'
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
  
  // Добавляем информацию о каннабиноидах
  const cannabinoids = [
    { name: 'THC', value: '85-90%', color: '#4CAF50' },
    { name: 'CBD', value: '1-5%', color: '#3498DB' },
    { name: 'CBN', value: '0.5-1%', color: '#E67E22' }
  ];
  
  return (
    <div className={styles.aboutUsPage} ref={containerRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.leafPattern}></div>
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
            
            <div className={styles.cannabinoidInfo}>
              <div className={styles.infoTitle}>Содержание каннабиноидов</div>
              <div className={styles.cannabinoidStats}>
                {cannabinoids.map((item) => (
                  <div key={item.name} className={styles.statItem}>
                    <div className={styles.statLabel}>{item.name}</div>
                    <div className={styles.statBarContainer}>
                      <div 
                        className={styles.statBar} 
                        style={{ 
                          width: item.name === 'THC' ? '90%' : item.name === 'CBD' ? '30%' : '10%',
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                    <div className={styles.statValue}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.productBadges}>
              <div className={styles.productBadge}>
                <div className={styles.badgeIcon}>🌿</div>
                <span>Premium Quality</span>
              </div>
              <div className={styles.productBadge}>
                <div className={styles.badgeIcon}>🔬</div>
                <span>Lab Tested</span>
              </div>
              <div className={styles.productBadge}>
                <div className={styles.badgeIcon}>✓</div>
                <span>100% Natural</span>
              </div>
            </div>
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
          <div className={styles.pageBadge}>Наша компания</div>
          
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
                style={{ borderColor: `${section.color}30` }}
              >
                <div 
                  className={styles.sectionIcon}
                  style={{ backgroundColor: `${section.color}20`, color: section.color }}
                >
                  {section.icon}
                </div>
                
                <div className={styles.sectionContent}>
                  <h2 
                    className={styles.sectionTitle}
                    style={{ color: section.color }}
                  >
                    {section.title}
                  </h2>
                  <p className={styles.sectionText}>{section.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className={styles.cannabisStrains}>
            <div className={styles.strainsTitle}>Доступные сорта</div>
            <div className={styles.strainsContainer}>
              <div className={styles.strainBadge} style={{ backgroundColor: '#8E44AD20', borderColor: '#8E44AD' }}>
                <div className={styles.strainDot} style={{ backgroundColor: '#8E44AD' }}></div>
                <div className={styles.strainName}>Indica</div>
              </div>
              <div className={styles.strainBadge} style={{ backgroundColor: '#F39C1220', borderColor: '#F39C12' }}>
                <div className={styles.strainDot} style={{ backgroundColor: '#F39C12' }}></div>
                <div className={styles.strainName}>Sativa</div>
              </div>
              <div className={styles.strainBadge} style={{ backgroundColor: '#27AE6020', borderColor: '#27AE60' }}>
                <div className={styles.strainDot} style={{ backgroundColor: '#27AE60' }}></div>
                <div className={styles.strainName}>Hybrid</div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="/contacts" className={styles.contactButton}>
              Связаться с нами
              <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9l6 6-6 6"/><path d="M4 4v7a4 4 0 0 0 4 4h11"/>
              </svg>
            </a>
            <a href="/shop" className={styles.shopButton}>
              Перейти в магазин
              <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <div className={styles.certificateStrip}>
        <div className={styles.stripContainer}>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🏆</div>
            <div className={styles.stripText}>15+ Cannabis Cup Awards</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🔍</div>
            <div className={styles.stripText}>100% Lab Tested</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>📦</div>
            <div className={styles.stripText}>Доставка по всей России</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;