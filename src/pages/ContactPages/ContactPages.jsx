import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './ContactsPage.module.css';

// Импорт иконок (установите react-icons: npm install react-icons)
import { FaTelegramPlane, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { BiCopy } from 'react-icons/bi';
import { FaSmoking } from 'react-icons/fa';
const ContactsPage = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Обработка копирования контакта
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Эффект движения дыма при движении мыши
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Генерация дымовых частиц
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createSmokeParticle = () => {
      if (!containerRef.current) return;
      
      const smoke = document.createElement('div');
      smoke.className = styles.smokeParticle;
      
      // Позиционирование дымовых частиц
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      smoke.style.left = `${posX}%`;
      smoke.style.top = `${posY}%`;
      smoke.style.animationDuration = `${Math.random() * 5 + 8}s`;
      smoke.style.opacity = Math.random() * 0.3 + 0.05;
      
      containerRef.current.appendChild(smoke);
      
      // Удаление частицы после анимации
      setTimeout(() => {
        if (smoke && smoke.parentNode) {
          smoke.remove();
        }
      }, 13000);
    };
    
    // Создание частиц с интервалом
    const smokeInterval = setInterval(createSmokeParticle, 800);
    return () => clearInterval(smokeInterval);
  }, []);
  
  // Содержимое вкладок
  const tabsContent = {
    info: (
      <div className={styles.infoContent}>
        <motion.h2 
          className={styles.infoTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Общая информация
        </motion.h2>
        
        <motion.div 
          className={styles.assortmentInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={styles.assortmentTitle}>Актуальный ассортимент</h3>
          <div className={styles.productCategories}>
            <div className={styles.productCategory}>
              <FaSmoking className={styles.categoryIcon} />
              <span>STIIIZY</span>
            </div>
            <div className={styles.productCategory}>
              <FaSmoking className={styles.categoryIcon} />
              <span>BRASS KNUCKLES</span>
            </div>
            <div className={styles.productCategory}>
              <FaSmoking className={styles.categoryIcon} />
              <span>BIG CHIEF</span>
            </div>
            <div className={styles.productCategory}>
              <FaSmoking className={styles.categoryIcon} />
              <span>CUREpen</span>
            </div>
          </div>
          <p className={styles.stockInfo}>Наличие уточняйте у менеджера</p>
          <a href="/shop" className={styles.shopButton}>Перейти в каталог</a>
        </motion.div>
      </div>
    ),
    
    manager: (
      <div className={styles.managerContent}>
        <motion.h2 
          className={styles.managerTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Наш менеджер для связи
        </motion.h2>
        
        <motion.div 
          className={styles.contactCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.contactHeader}>
            <div className={styles.contactAvatar}>
              <FaTelegramPlane className={styles.avatarIcon} />
            </div>
            <div className={styles.contactDetails}>
              <h3 className={styles.contactName}>Telegram</h3>
              <p className={styles.contactPosition}>Оперативная связь 24/7</p>
            </div>
          </div>
          
          <div className={styles.contactBody}>
            <div className={styles.contactMethod}>
              <div className={styles.methodLabel}>Telegram:</div>
              <div className={styles.methodValue}>
                <span className={styles.valueText}>@Vapehub_operator</span>
                <button 
                  className={styles.copyButton} 
                  onClick={() => handleCopy('@Vapehub_operator')}
                >
                  <BiCopy />
                </button>
              </div>
            </div>
            
            <div className={styles.contactLinks}>
              <a href="https://t.me/Vapehub_operator" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane className={styles.linkIcon} />
                <span>Написать в Telegram</span>
              </a>
            </div>
            
            <div className={styles.additionalInfo}>
              <p>
                <strong>График работы:</strong> Ежедневно с 10:00 до 22:00
              </p>
              <p>
                <strong>Ответ:</strong> В течение 10-15 минут
              </p>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {copied && (
            <motion.div 
              className={styles.copiedNotification}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              Контакт скопирован!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),
    
    faq: (
      <div className={styles.faqContent}>
        <motion.h2 
          className={styles.faqTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Часто задаваемые вопросы
        </motion.h2>
        
        <motion.div 
          className={styles.faqList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              question: 'Как сделать заказ?',
              answer: 'Для оформления заказа напишите нашему менеджеру в Telegram @Vapehub_operator с указанием выбранных позиций, количества и предпочтительного способа доставки.'
            },
            {
              question: 'Какие способы доставки доступны?',
              answer: 'Мы осуществляем доставку по всей России. Подробности и стоимость доставки уточняйте у менеджера при оформлении заказа.'
            },
            {
              question: 'Как проверить подлинность продукции?',
              answer: 'Вся наша продукция оригинальная и имеет соответствующие маркировки и защитные элементы. При получении товара вы можете проверить его подлинность по специальным кодам.'
            },
            {
              question: 'Есть ли оптовые цены?',
              answer: 'Да, для оптовых заказов у нас действуют специальные цены. Для уточнения деталей и получения прайс-листа обратитесь к нашему менеджеру.'
            }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <h3 className={styles.faqQuestion}>{item.question}</h3>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  };
  
  return (
    <div className={styles.contactsPage} ref={containerRef}>
      <div 
        className={styles.smokeEffect}
        style={{ 
          transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)` 
        }}
      ></div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y, opacity }}
      >
        <motion.div 
          className={styles.contactsHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.pageTitle}>Контакты</h1>
          <p className={styles.pageSubtitle}>Свяжитесь с нами удобным для вас способом</p>
        </motion.div>
        
        <motion.div 
          className={styles.contactsCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.tabsNavigation}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'info' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Информация
              {activeTab === 'info' && (
                <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />
              )}
            </button>
            
            <button 
              className={`${styles.tabButton} ${activeTab === 'manager' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('manager')}
            >
              Связаться
              {activeTab === 'manager' && (
                <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />
              )}
            </button>
            
            <button 
              className={`${styles.tabButton} ${activeTab === 'faq' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
              {activeTab === 'faq' && (
                <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />
              )}
            </button>
          </div>
          
          <div className={styles.tabContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabsContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.socialLinks}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://t.me/Vapehub_operator" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className={styles.socialIcon} />
          </a>
          <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaInstagram className={styles.socialIcon} />
          </a>
          <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className={styles.socialIcon} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactsPage;