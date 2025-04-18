import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styles from './FAQPage.module.css';

// Импорт иконок
import { FaLeaf, FaGlobeAmericas, FaCheckCircle, FaTruck, FaCreditCard, FaClock, FaStar, FaListAlt, FaShippingFast, FaPhoneAlt } from 'react-icons/fa';
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
  
  // Генерируем частицы для фонового эффекта
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createParticle = () => {
      if (!containerRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Рандомное позиционирование
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
      
      // Удаление частицы
      setTimeout(() => {
        if (particle && particle.parentNode) {
          particle.remove();
        }
      }, (duration + delay) * 1000);
    };
    
    // Добавление частиц с интервалом
    const particleInterval = setInterval(createParticle, 3000);
    // Начальное создание некоторого количества частиц
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    return () => clearInterval(particleInterval);
  }, []);
  
  // Данные FAQ
  const faqData = [
    {
      id: 1,
      question: 'Там есть химия?',
      answer: 'Нет, там химии нету. Это чистое масло конопли.',
      icon: <FaLeaf />,
      tag: 'Продукт'
    },
    {
      id: 2,
      question: 'Производство какой страны ваш товар?',
      answer: 'Весь наш товар произведен в Соединённых Штатах Америки.',
      icon: <FaGlobeAmericas />,
      tag: 'Происхождение'
    },
    {
      id: 3,
      question: 'Ваша продукция оригинальная?',
      answer: 'Да, наша продукция вся оригинальная.',
      icon: <FaCheckCircle />,
      tag: 'Качество'
    },
    {
      id: 4,
      question: 'Наложкой отправляете?',
      answer: 'Нет, мы не шлем без 100% предоплаты.',
      icon: <FaTruck />,
      tag: 'Оплата'
    },
    {
      id: 5,
      question: 'Как можно оплатить?',
      answer: (
        <>
          <p>Мы принимаем несколько способов оплаты:</p>
          <ol className={styles.paymentList}>
            <li>Банковский перевод</li>
            <li>Электронные кошельки</li>
            <li>Криптовалюта</li>
          </ol>
        </>
      ),
      icon: <FaCreditCard />,
      tag: 'Оплата'
    },
    {
      id: 6,
      question: 'Как быстро отправка происходит?',
      answer: 'В течении 48 часов после оплаты.',
      icon: <FaClock />,
      tag: 'Доставка'
    },
    {
      id: 7,
      question: 'У вас есть отзывы?',
      answer: (
        <>
          <p>Независимые отзывы о нас: </p>
          <a href="https://rep-vseti.ru/site/bad-vape.ru" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            <span>Посмотреть отзывы</span>
            <FiExternalLink />
          </a>
        </>
      ),
      icon: <FaStar />,
      tag: 'Отзывы'
    },
    {
      id: 8,
      question: 'Где можно посмотреть полный прайс?',
      answer: (
        <>
          <p>По этой ссылке: </p>
          <a href="https://telegra.ph/Assortiment-i-ceny-12-15" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            <span>Посмотреть прайс</span>
            <FiExternalLink />
          </a>
        </>
      ),
      icon: <FaListAlt />,
      tag: 'Цены'
    },
    {
      id: 9,
      question: 'Как вы осуществляете доставку',
      answer: (
        <>
          <p>У нас есть несколько вариантов доставки:</p>
          <ol className={styles.deliveryList}>
            <li>СДЭК, PickPoint, Почта России</li>
            <li>Почтомат (любой удобный для вас)</li>
            <li>Курьер может сделать клад в районе который вы укажите (Город уточнять у менеджера!)</li>
          </ol>
          <p className={styles.deliveryNote}>
            Обычно идёт от 1 до 6 дней Смотря в каком городе вы находитесь.<br />
            Доставка входит в стоимость товара
          </p>
        </>
      ),
      icon: <FaShippingFast />,
      tag: 'Доставка'
    },
    {
      id: 10,
      question: 'Как с вами связаться?',
      answer: (
        <>
          <p>Наш менеджер: </p>
          <a href="https://t.me/Vapehub_operator" target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            <span>@Vapehub_operator</span>
            <FiExternalLink />
          </a>
        </>
      ),
      icon: <FaPhoneAlt />,
      tag: 'Контакты'
    }
  ];
  
  // Фильтрация вопросов по поисковому запросу
  const filteredFaq = faqData.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Уникальные теги для фильтрации
  const uniqueTags = [...new Set(faqData.map(item => item.tag))];
  
  // Обработчик клика по аккордеону
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
          <h1 className={styles.pageTitle}>Часто задаваемые вопросы</h1>
          <p className={styles.pageSubtitle}>
            Приветствую, Вас! У Вас могут возникнуть вопросы при первой покупке, для этого мы написали краткий FAQ по ним.
          </p>
          
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Поиск по вопросам..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                >
                  <div className={styles.questionIcon}>{item.icon}</div>
                  <div className={styles.questionText}>
                    <h3>{item.id}. {item.question}</h3>
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
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQPage;