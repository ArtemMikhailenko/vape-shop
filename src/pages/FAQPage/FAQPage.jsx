import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styles from './FAQPage.module.css';

// Import icons
import { 
  FaLeaf, 
  FaGlobeAmericas, 
  FaCheckCircle, 
  FaTruck, 
  FaCreditCard, 
  FaClock, 
  FaSearch, 
  FaFilePdf,
  FaShippingFast, 
  FaPhoneAlt 
} from 'react-icons/fa';
import { FiChevronDown, FiExternalLink } from 'react-icons/fi';

const FAQPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Generate particles for background effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createParticle = () => {
      if (!containerRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Random positioning
      const size = Math.random() * 8 + 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.transform = `rotate(${rotation}deg)`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      containerRef.current.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle && particle.parentNode) {
          particle.remove();
        }
      }, (duration + delay) * 1000);
    };
    
    // Add particles at intervals
    const particleInterval = setInterval(createParticle, 3000);
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    return () => clearInterval(particleInterval);
  }, []);
  
  // FAQ data
  const faqData = [
    {
      id: 1,
      question: 'Содержит ли продукция химию?',
      answer: 'Нет, в нашей продукции нет синтетических добавок. Используется исключительно чистое масло конопли высокого качества.',
      icon: <FaLeaf />,
      tag: 'Продукт'
    },
    {
      id: 2,
      question: 'В какой стране производится ваша продукция?',
      answer: 'Вся линейка представленных товаров производится в США на сертифицированных предприятиях с соблюдением всех норм качества и безопасности.',
      icon: <FaGlobeAmericas />,
      tag: 'Происхождение'
    },
    {
      id: 3,
      question: 'Является ли продукция оригинальной?',
      answer: 'Да, мы работаем исключительно с оригинальной продукцией. Все устройства и картриджи проходят сертификацию и поставляются напрямую от проверенных производителей.',
      icon: <FaCheckCircle />,
      tag: 'Качество'
    },
    {
      id: 4,
      question: 'Возможна ли отправка наложенным платежом?',
      answer: 'К сожалению, отправка наложенным платежом не предусмотрена. Работаем только по 100% предоплате.',
      icon: <FaTruck />,
      tag: 'Оплата'
    },
    {
      id: 5,
      question: 'Какие способы оплаты вы принимаете?',
      answer: (
        <>
          <p>Для вашего удобства мы принимаем несколько вариантов оплаты:</p>
          <ul className={styles.paymentList}>
            <li>Банковский перевод</li>
            <li>Электронные кошельки</li>
            <li>Криптовалюта</li>
          </ul>
        </>
      ),
      icon: <FaCreditCard />,
      tag: 'Оплата'
    },
    {
      id: 6,
      question: 'В какие сроки осуществляется отправка?',
      answer: 'Отправка производится в течение 48 часов с момента подтверждения оплаты.',
      icon: <FaClock />,
      tag: 'Доставка'
    },
    {
      id: 7,
      question: 'Каким способом осуществляется доставка?',
      answer: (
        <>
          <p>Мы предлагаем несколько вариантов доставки на выбор:</p>
          <ul className={styles.deliveryList}>
            <li>СДЭК, PickPoint, Почта России</li>
            <li>Почтоматы — любой удобный для вас</li>
            <li>Также возможен курьерский клад в указанном вами районе (доступность города уточняйте у менеджера)</li>
          </ul>
          <p className={styles.deliveryNote}>
            Сроки доставки зависят от региона — обычно от 1 до 6 дней.<br />
            Стоимость доставки уже включена в цену товара.
          </p>
        </>
      ),
      icon: <FaShippingFast />,
      tag: 'Доставка'
    },
    {
      id: 8,
      question: 'Где можно посмотреть полный прайс?',
      answer: (
        <>
          <p>Вы можете ознакомиться с полным прайс-листом: </p>
          <a href="https://telegra.ph/Assortiment-i-ceny-12-15" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            <span>Посмотреть прайс</span>
            <FaFilePdf className={styles.linkButtonIcon} />
          </a>
        </>
      ),
      icon: <FaFilePdf />,
      tag: 'Цены'
    },
    {
      id: 9,
      question: 'Как с вами связаться?',
      answer: (
        <>
          <p>Наш менеджер доступен для консультаций и заказов: </p>
          <a href="https://t.me/Vapehub_operator" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            <span>@Vapehub_operator</span>
            <FiExternalLink className={styles.linkButtonIcon} />
          </a>
        </>
      ),
      icon: <FaPhoneAlt />,
      tag: 'Контакты'
    }
  ];
  
  // Filter questions by search query
  const filteredFaq = faqData.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Unique tags for filtering
  const uniqueTags = [...new Set(faqData.map(item => item.tag))];
  
  // Handler for accordion click
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };
  
  return (
    <div className={styles.faqPage} ref={containerRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOverlay}></div>
      </div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y, opacity }}
      >
        <motion.div 
          className={styles.faqHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionBadge}>FAQ</div>
          <h1 className={styles.pageTitle}>Часто задаваемые вопросы</h1>
          <p className={styles.pageSubtitle}>
            Ниже представлены ответы на самые распространенные вопросы о нашей продукции и услугах.
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Поиск по вопросам..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className={styles.clearSearchButton}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            
            <div className={styles.tagsList}>
              {uniqueTags.map(tag => (
                <button 
                  key={tag} 
                  className={`${styles.tagButton} ${searchQuery === tag ? styles.activeTag : ''}`}
                  onClick={() => setSearchQuery(searchQuery === tag ? '' : tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.faqList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredFaq.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>
                <FaSearch />
              </div>
              <h3>По вашему запросу ничего не найдено</h3>
              <p>Попробуйте изменить поисковый запрос или сбросить фильтры</p>
              <button className={styles.resetButton} onClick={() => setSearchQuery('')}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            filteredFaq.map((item) => (
              <motion.div
                key={item.id}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.id * 0.05 }}
              >
                <div 
                  className={`${styles.faqQuestion} ${activeAccordion === item.id ? styles.active : ''}`}
                  onClick={() => toggleAccordion(item.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={activeAccordion === item.id}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleAccordion(item.id);
                    }
                  }}
                >
                  <div className={styles.questionIcon}>{item.icon}</div>
                  <div className={styles.questionText}>
                    <h3>{item.question}</h3>
                    <span className={styles.questionTag}>{item.tag}</span>
                  </div>
                  <motion.div
                    className={styles.arrowIcon}
                    animate={{ rotate: activeAccordion === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {activeAccordion === item.id && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.answerContent}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <motion.div 
          className={styles.contactSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className={styles.contactTitle}>Остались вопросы?</h2>
          <p className={styles.contactText}>
            Если у вас остались дополнительные вопросы, свяжитесь с нашим менеджером напрямую
          </p>
          <a 
            href="https://t.me/Vapehub_operator" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.contactButton}
          >
            Связаться с менеджером
            <FiExternalLink className={styles.contactButtonIcon} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQPage;