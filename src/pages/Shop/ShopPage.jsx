import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './ShopPage.module.css';

// Icons
import { 
  FaShoppingCart, 
  FaLeaf, 
  FaFlask, 
  FaCheckCircle, 
  FaAngleRight, 
  FaStar, 
  FaInfoCircle,
  FaMapMarkerAlt 
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

// Product images (replace with your actual imports)
import stiiizyImage from '../../assets/products/stiizy.png';
import brassKnucklesImage from '../../assets/products/cure.png';
import bigChiefImage from '../../assets/products/bigchief.png';
import curepenImage from '../../assets/products/cure.png';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pods');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Product data
  const products = [
    {
      id: 1,
      name: 'STIIIZY',
      category: 'pods',
      image: stiiizyImage,
      description: 'Premium THC pods with natural terpenes',
      price: '2000₽',
      tag: 'Популярный',
      features: ['Без PG/VG/PEG', '100% натуральные терпены', 'Многократная дистилляция'],
      strains: [
        { name: 'Purple Punch', type: 'indica' },
        { name: 'OG Kush', type: 'indica' },
        { name: 'Pineapple Express', type: 'hybrid' }
      ],
      contactPerson: '@Vapehub_operator',
      rating: 4.9,
      reviews: 128
    },
    {
      id: 2,
      name: 'BRASS KNUCKLES',
      category: 'cartridges',
      image: brassKnucklesImage,
      description: 'Gold Edition premium cartridges',
      price: '2000₽',
      tag: 'Эксклюзив',
      features: ['Без растворителей', 'Мощный эффект', 'Премиум качество'],
      strains: [
        { name: 'Girl Scout Cookies', type: 'hybrid' },
        { name: 'Skywalker OG', type: 'indica' }
      ],
      contactPerson: '@Vapehub_operator',
      rating: 4.8,
      reviews: 94
    },
    {
      id: 3,
      name: 'BIG CHIEF',
      category: 'cartridges',
      image: bigChiefImage,
      description: 'Premium distillate cartridges',
      price: '1800₽',
      tag: 'Хорошо идет',
      features: ['Высокая концентрация', 'Проверенное качество', 'Долгий срок службы'],
      strains: [
        { name: 'Sour Tangie', type: 'sativa' },
        { name: 'Sour Diesel', type: 'sativa' }
      ],
      contactPerson: '@Vapehub_operator',
      rating: 4.7,
      reviews: 76
    },
    {
      id: 4,
      name: 'CUREpen',
      category: 'pens',
      image: curepenImage,
      description: 'Solvent-free premium cartridges',
      price: '2200₽',
      tag: 'Премиум',
      features: ['Без растворителей', 'Чистый экстракт', 'Элегантный дизайн'],
      strains: [
        { name: 'Wedding Cake', type: 'hybrid' },
        { name: 'GG4', type: 'hybrid' }
      ],
      contactPerson: '@Vapehub_operator',
      rating: 4.9,
      reviews: 112
    }
  ];

  // Categories for filter
  const categories = [
    { id: 'all', name: 'Все продукты', icon: <FaShoppingCart /> },
    { id: 'pods', name: 'Под-системы', icon: <FaLeaf /> },
    { id: 'cartridges', name: 'Картриджи', icon: <FaFlask /> },
    { id: 'pens', name: 'Pen-системы', icon: <FaStar /> }
  ];

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Effect to create particles
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
    
    // Add particles with interval
    const particleInterval = setInterval(createParticle, 3000);
    // Initial creation of particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    return () => clearInterval(particleInterval);
  }, []);

  // Functions to get strain type color
  const getStrainColor = (type) => {
    switch(type) {
      case 'indica':
        return '#5E60CE'; // Purple for indica
      case 'sativa':
        return '#F05454'; // Red for sativa
      case 'hybrid':
        return '#2A9D8F'; // Teal for hybrid
      default:
        return '#aaa';
    }
  };

  // Animated variants for the products grid
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Tab content for product types tabs
  const tabContent = {
    pods: (
      <div className={styles.tabContent}>
        <div className={styles.tabDescription}>
          <h3>ПОД-СИСТЕМЫ</h3>
          <p>
            Под-системы предлагают компактный и удобный способ использования. Эти устройства 
            используют предварительно заполненные картриджи (поды), которые легко заменяются.
            Идеальны для тех, кто ценит простоту и портативность.
          </p>
          
          <div className={styles.tabFeatures}>
            <div className={styles.tabFeature}>
              <div className={styles.featureIcon}><FaLeaf /></div>
              <div className={styles.featureText}>
                <h4>Удобство</h4>
                <p>Простая система без лишних настроек</p>
              </div>
            </div>
            
            <div className={styles.tabFeature}>
              <div className={styles.featureIcon}><FaCheckCircle /></div>
              <div className={styles.featureText}>
                <h4>Портативность</h4>
                <p>Компактный размер для удобного ношения</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.tabImage}>
          <img src={stiiizyImage} alt="Под-система" />
        </div>
      </div>
    ),
    
    cartridges: (
      <div className={styles.tabContent}>
        <div className={styles.tabDescription}>
          <h3>КАРТРИДЖИ</h3>
          <p>
            Картриджи представляют собой сменные резервуары, которые подключаются к аккумулятору. 
            Они содержат масло с высоким содержанием активных компонентов и предлагают более широкий 
            выбор вкусов и эффектов.
          </p>
          
          <div className={styles.tabFeatures}>
            <div className={styles.tabFeature}>
              <div className={styles.featureIcon}><FaFlask /></div>
              <div className={styles.featureText}>
                <h4>Разнообразие</h4>
                <p>Широкий выбор сортов и концентраций</p>
              </div>
            </div>
            
            <div className={styles.tabFeature}>
              <div className={styles.featureIcon}><FaCheckCircle /></div>
              <div className={styles.featureText}>
                <h4>Экономичность</h4>
                <p>Выгодное соотношение цены и количества</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.tabImage}>
          <img src={bigChiefImage} alt="Картридж" />
        </div>
      </div>
    ),
    
    pens: (
      <div className={styles.tabContent}>
        <div className={styles.tabDescription}>
          <h3>PEN-СИСТЕМЫ</h3>
          <p>
            Pen-системы представляют собой компактные устройства в форме ручки, которые сочетают в себе 
            аккумулятор и резервуар для масла. Они предлагают возможность настройки мощности и температуры 
            для персонализации опыта.
          </p>
          
          <div className={styles.tabFeatures}>
            <div className={styles.tabFeature}>
              <div className={styles.featureIcon}><FaStar /></div>
              <div className={styles.featureText}>
                <h4>Настраиваемость</h4>
                <p>Регулировка мощности и температуры</p>
              </div>
            </div>
            
            <div className={styles.tabFeature}>
              <div className={styles.featureIcon}><FaCheckCircle /></div>
              <div className={styles.featureText}>
                <h4>Дизайн</h4>
                <p>Элегантный вид и удобство использования</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.tabImage}>
          <img src={curepenImage} alt="Pen-система" />
        </div>
      </div>
    )
  };

  return (
    <div className={styles.shopPage} ref={containerRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOverlay}></div>
      </div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y }}
      >
        <motion.div 
          className={styles.shopHeader}
          initial={{ opacity: 1, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.pageTitle}>Магазин</h1>
          <p className={styles.pageSubtitle}>
            Выберите из нашего ассортимента премиальных продуктов для истинных ценителей
          </p>
        </motion.div>
        
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Поиск по названию или описанию..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className={styles.categories}>
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className={styles.productsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map(product => (
            <motion.div 
              key={product.id}
              className={styles.productCard}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.08)",
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.productImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                />
                {product.tag && (
                  <div className={styles.productTag}>{product.tag}</div>
                )}
              </div>
              
              <div className={styles.productInfo}>
                <div className={styles.productCategory}>
                  {product.category === 'pods' ? 'Под-система' : 
                   product.category === 'cartridges' ? 'Картридж' : 'Pen-система'}
                </div>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDescription}>{product.description}</p>
                
                <div className={styles.productFeatures}>
                  {product.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <FaCheckCircle className={styles.featureIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty} 
                      />
                    ))}
                  </div>
                  <div className={styles.ratingText}>
                    {product.rating} ({product.reviews} отзывов)
                  </div>
                </div>
                
                <div className={styles.strainsContainer}>
                  <div className={styles.strainsTitle}>Доступные сорта:</div>
                  <div className={styles.strainsList}>
                    {product.strains.map((strain, index) => (
                      <div key={index} className={styles.strainItem}>
                        <div 
                          className={styles.strainColor} 
                          style={{ backgroundColor: getStrainColor(strain.type) }}
                        ></div>
                        <span>{strain.name}</span>
                        <span className={styles.strainType}>
                          {strain.type === 'indica' ? 'Indica' : 
                           strain.type === 'sativa' ? 'Sativa' : 'Hybrid'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.productBottom}>
                  
                  <div className={styles.productActions}>
                    {/* <motion.button 
                      className={`${styles.actionButton} ${styles.detailsButton}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Подробнее <FaAngleRight />
                    </motion.button> */}
                    <motion.button 
                      className={`${styles.actionButton} ${styles.orderButton}`}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 8px 20px rgba(42, 157, 143, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a 
                        href={`https://t.me/${product.contactPerson}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.telegramLink}
                      >
                        <FaShoppingCart /> Заказать
                      </a>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className={styles.infoSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Выбери свой стиль</h2>
            <p className={styles.sectionSubtitle}>
              Ознакомьтесь с различными типами наших продуктов и выберите идеальный вариант для себя
            </p>
          </div>
          
          <div className={styles.processTabs}>
            <div className={styles.tabsNavigation}>
              {['pods', 'cartridges', 'pens'].map(tab => (
                <button
                  key={tab}
                  className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'pods' ? 'Под-системы' : 
                   tab === 'cartridges' ? 'Картриджи' : 'Pen-Системы'}
                  {activeTab === tab && <motion.div className={styles.activeIndicator} layoutId="activeTabIndicator" />}
                </button>
              ))}
            </div>
            
            <div className={styles.tabContentPanel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{  y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className={styles.orderProcess}>
          <h2 className={styles.processTitle}>Как сделать заказ</h2>
          
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Выбор товара</h3>
                <p className={styles.stepDescription}>
                  Выберите товар из нашего каталога, который вас интересует
                </p>
              </div>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Связь с менеджером</h3>
                <p className={styles.stepDescription}>
                  Напишите нашему менеджеру в Telegram, указав выбранный товар
                </p>
              </div>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Оплата</h3>
                <p className={styles.stepDescription}>
                  Выберите удобный способ оплаты: банковский перевод, электронные кошельки или криптовалюта
                </p>
              </div>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Доставка</h3>
                <p className={styles.stepDescription}>
                  Получите ваш заказ через СДЭК, почтомат или другим удобным способом
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.noticeSection}>
          <div className={styles.noticeTitle}>
            <FaInfoCircle />
            <span>Обратите внимание</span>
          </div>
          <p className={styles.noticeText}>
            Все наши продукты проходят тщательный контроль качества и имеют сертификаты соответствия.
            Мы гарантируем подлинность и высокое качество каждого товара. Для уточнения наличия и актуальных
            цен обращайтесь к нашему менеджеру.
          </p>
          
          <a 
            href="https://t.me/Vapehub_operator" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.contactButton}
          >
            <FaMapMarkerAlt className={styles.buttonIcon} />
            <span>Связаться с менеджером</span>
          </a>
        </div>
        
        <div className={styles.priceSection}>
          <h2 className={styles.priceTitle}>Полный прайс-лист</h2>
          <p className={styles.priceDescription}>
            Для просмотра полного прайс-листа с актуальными ценами на всю нашу продукцию перейдите по ссылке:
          </p>
          <a 
            href="https://telegra.ph/Assortiment-i-ceny-12-15" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.priceButton}
          >
            Посмотреть прайс <FiExternalLink />
          </a>
        </div>
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

export default ShopPage;