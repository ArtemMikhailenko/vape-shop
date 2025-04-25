import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './ContactsPage.module.css';

// Импорт иконок (установите react-icons: npm install react-icons)
import { FaTelegramPlane, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { BiCopy, BiChevronRight } from 'react-icons/bi';
import { FaSmoking, FaLeaf, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { IoTimeOutline } from 'react-icons/io5';

const ContactPages = () => {
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
  
  // Эффект движения листьев при движении мыши
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
  
  // Генерация листьев каннабиса для фона
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createLeafParticle = () => {
      if (!containerRef.current) return;
      
      const leaf = document.createElement('div');
      leaf.className = styles.leafParticle;
      
      // Позиционирование частиц
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const rotation = Math.random() * 360;
      const scale = Math.random() * 0.5 + 0.5;
      
      leaf.style.left = `${posX}%`;
      leaf.style.top = `${posY}%`;
      leaf.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      leaf.style.animationDuration = `${Math.random() * 5 + 10}s`;
      leaf.style.opacity = Math.random() * 0.3 + 0.05;
      
      containerRef.current.appendChild(leaf);
      
      // Удаление частицы после анимации
      setTimeout(() => {
        if (leaf && leaf.parentNode) {
          leaf.remove();
        }
      }, 15000);
    };
    
    // Создание частиц с интервалом
    const leafInterval = setInterval(createLeafParticle, 2000);
    // Создаем начальные частицы
    for (let i = 0; i < 5; i++) {
      createLeafParticle();
    }
    
    return () => clearInterval(leafInterval);
  }, []);
  
  // Информация о продуктах с сортами каннабиса
  const products = [
    { 
      name: 'STIIIZY', 
      strains: ['Purple Punch', 'OG Kush', 'Blue Dream'],
      type: 'Hybrid',
      color: '#27AE60'
    },
    { 
      name: 'BRASS KNUCKLES', 
      strains: ['Sour Diesel', 'Gelato'],
      type: 'Sativa',
      color: '#F39C12'
    },
    { 
      name: 'BIG CHIEF', 
      strains: ['Northern Lights', 'Granddaddy Purple'],
      type: 'Indica',
      color: '#8E44AD'
    },
    { 
      name: 'CUREpen', 
      strains: ['Wedding Cake', 'Gorilla Glue'],
      type: 'Hybrid',
      color: '#27AE60'
    }
  ];
  
  // Содержимое вкладок
  const tabsContent = {
    info: (
      <div className={styles.infoContent}>
        <motion.h2 
          className={styles.infoTitle}
          initial={{  y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Общая информация
        </motion.h2>
        
        <motion.div 
          className={styles.assortmentInfo}
          initial={{  y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={styles.assortmentTitle}>Актуальный ассортимент</h3>
          <div className={styles.productCategories}>
            {products.map((product, index) => (
              <div key={product.name} className={styles.productCategory}>
                <div className={styles.productHeader}>
                  <div 
                    className={styles.strainIndicator} 
                    style={{ backgroundColor: product.color }}
                  ></div>
                  <span className={styles.productName}>{product.name}</span>
                  <span 
                    className={styles.strainType}
                    style={{ backgroundColor: `${product.color}20`, color: product.color }}
                  >
                    {product.type}
                  </span>
                </div>
                <div className={styles.strainList}>
                  {product.strains.map(strain => (
                    <div key={strain} className={styles.strainItem}>
                      <FaLeaf className={styles.strainIcon} style={{ color: product.color }} />
                      <span>{strain}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.infoBox}>
            <div className={styles.infoBoxIcon}>
              <IoTimeOutline />
            </div>
            <p className={styles.stockInfo}>Наличие уточняйте у менеджера. Ассортимент регулярно обновляется.</p>
          </div>
          
          <div className={styles.buttonGroup}>
            <a href="/shop" className={styles.shopButton}>
              <span>Перейти в каталог</span>
              <BiChevronRight className={styles.buttonIcon} />
            </a>
          </div>
          
          <div className={styles.cannabisInfo}>
            <div className={styles.infoItem}>
              <div className={styles.infoItemIcon} style={{ backgroundColor: '#8E44AD20', color: '#8E44AD' }}>
                <FaLeaf />
              </div>
              <div className={styles.infoContent}>
                <h4>Indica</h4>
                <p>Расслабляющий эффект для спокойного вечера</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoItemIcon} style={{ backgroundColor: '#F39C1220', color: '#F39C12' }}>
                <FaLeaf />
              </div>
              <div className={styles.infoContent}>
                <h4>Sativa</h4>
                <p>Энергичный и креативный эффект</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoItemIcon} style={{ backgroundColor: '#27AE6020', color: '#27AE60' }}>
                <FaLeaf />
              </div>
              <div className={styles.infoContent}>
                <h4>Hybrid</h4>
                <p>Сбалансированный эффект для любого времени</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    ),
    
    manager: (
      <div className={styles.managerContent}>
        <motion.h2 
          className={styles.managerTitle}
          initial={{  y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Наш менеджер для связи
        </motion.h2>
        
        <motion.div 
          className={styles.contactCard}
          initial={{  scale: 0.9 }}
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
            
            <div className={styles.workingHours}>
              <div className={styles.workingHoursHeader}>
                <div className={styles.hourIcon}>
                  <IoTimeOutline />
                </div>
                <h4>График работы</h4>
              </div>
              <div className={styles.hoursGrid}>
                <div className={styles.hourDay}>Пн-Пт:</div>
                <div className={styles.hourTime}>10:00 - 22:00</div>
                <div className={styles.hourDay}>Сб-Вс:</div>
                <div className={styles.hourTime}>11:00 - 20:00</div>
              </div>
            </div>
            
            <div className={styles.additionalInfo}>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Время ответа:</div>
                <div className={styles.infoValue}>10-15 минут</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Доставка:</div>
                <div className={styles.infoValue}>По всей России</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Оплата:</div>
                <div className={styles.infoValue}>Предоплата 100%</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {copied && (
            <motion.div 
              className={styles.copiedNotification}
              initial={{  y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{  y: -20 }}
              transition={{ duration: 0.3 }}
            >
              Контакт скопирован!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),
    
    // faq: (
    //   <div className={styles.faqContent}>
    //     <motion.h2 
    //       className={styles.faqTitle}
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6 }}
    //     >
    //       Часто задаваемые вопросы
    //     </motion.h2>
        
    //     <motion.div 
    //       className={styles.faqList}
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ duration: 0.6, delay: 0.2 }}
    //     >
    //       {[
    //         {
    //           question: 'Как сделать заказ?',
    //           answer: 'Для оформления заказа напишите нашему менеджеру в Telegram @Vapehub_operator с указанием выбранных позиций, количества и предпочтительного способа доставки.',
    //           icon: <FaMapMarkerAlt />,
    //           color: '#4CAF50'
    //         },
    //         {
    //           question: 'Какие способы доставки доступны?',
    //           answer: 'Мы осуществляем доставку по всей России. Доступны варианты: СДЭК, Почта России, PickPoint, а также доставка в постаматы. Подробности уточняйте у менеджера при оформлении заказа.',
    //           icon: <FaMapMarkerAlt />,
    //           color: '#F39C12'
    //         },
    //         {
    //           question: 'Как проверить подлинность продукции?',
    //           answer: 'Вся наша продукция оригинальная и имеет соответствующие маркировки и защитные элементы. При получении товара вы можете проверить его подлинность по специальным кодам.',
    //           icon: <FaCheckCircle />,
    //           color: '#8E44AD'
    //         },
    //         {
    //           question: 'Есть ли оптовые цены?',
    //           answer: 'Да, для оптовых заказов у нас действуют специальные цены. Для уточнения деталей и получения прайс-листа обратитесь к нашему менеджеру.',
    //           icon: <FaBoxes />,
    //           color: '#3498DB'
    //         }
    //       ].map((item, index) => (
    //         <motion.div 
    //           key={index} 
    //           className={styles.faqItem}
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
    //           style={{ borderColor: `${item.color}30` }}
    //         >
    //           <div 
    //             className={styles.faqIcon}
    //             style={{ backgroundColor: `${item.color}20`, color: item.color }}
    //           >
    //             {item.icon}
    //           </div>
    //           <div className={styles.faqContent}>
    //             <h3 
    //               className={styles.faqQuestion}
    //               style={{ color: item.color }}
    //             >
    //               {item.question}
    //             </h3>
    //             <p className={styles.faqAnswer}>{item.answer}</p>
    //           </div>
    //         </motion.div>
    //       ))}
    //     </motion.div>
        
    //     <div className={styles.contactBox}>
    //       <div className={styles.contactBoxIcon}>
    //         <FaQuestionCircle />
    //       </div>
    //       <div className={styles.contactBoxContent}>
    //         <h3>Остались вопросы?</h3>
    //         <p>Свяжитесь с нами для получения дополнительной информации</p>
    //         <a href="https://t.me/Vapehub_operator" className={styles.contactBoxButton}>
    //           Написать в Telegram
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // )
  };
  
  return (
    <div className={styles.contactsPage} ref={containerRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.leafPattern}></div>
      </div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y, opacity }}
      >
        <motion.div 
          className={styles.contactsHeader}
          initial={{   y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pageBadge}>Свяжитесь с нами</div>
          <h1 className={styles.pageTitle}>Контакты</h1>
          <p className={styles.pageSubtitle}>Выберите удобный для вас способ связи</p>
        </motion.div>
        
        <motion.div 
          className={styles.contactsCard}
          initial={{  y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.tabsNavigation}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'info' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <span className={styles.tabIcon}>🌿</span>
              <span>Информация</span>
              {activeTab === 'info' && (
                <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />
              )}
            </button>
            
            <button 
              className={`${styles.tabButton} ${activeTab === 'manager' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('manager')}
            >
              <span className={styles.tabIcon}>💬</span>
              <span>Связаться</span>
              {activeTab === 'manager' && (
                <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />
              )}
            </button>
            
            {/* <button 
              className={`${styles.tabButton} ${activeTab === 'faq' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              <span className={styles.tabIcon}>❓</span>
              <span>FAQ</span>
              {activeTab === 'faq' && (
                <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />
              )}
            </button> */}
          </div>
          
          <div className={styles.tabContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{  x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{  x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabsContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        <div className={styles.socialLinksContainer}>
          <div className={styles.socialHeader}>Мы в социальных сетях</div>
          <motion.div 
            className={styles.socialLinks}
            initial={{  y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="https://t.me/Vapehub_operator" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className={styles.socialIcon} />
              <span className={styles.socialName}>Telegram</span>
            </a>
            <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <FaInstagram className={styles.socialIcon} />
              <span className={styles.socialName}>Instagram</span>
            </a>
            <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className={styles.socialIcon} />
              <span className={styles.socialName}>WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      <div className={styles.certificateStrip}>
        <div className={styles.stripContainer}>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🏆</div>
            <div className={styles.stripText}>Лучшее качество</div>
          </div>
          <div className={styles.stripItem}>
            <div className={styles.stripIcon}>🔍</div>
            <div className={styles.stripText}>Лабораторно протестировано</div>
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

// Добавим компонент FaCheckCircle и FaBoxes, которые использованы в коде
const FaCheckCircle = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" {...props}>
    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
  </svg>
);

const FaBoxes = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" {...props}>
    <path d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16zm-384-64h224c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16h-80v96l-32-21.3L256 96V0h-80c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16z"></path>
  </svg>
);

export default ContactPages;