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
  FaMapMarkerAlt,
  FaTelegramPlane
} from 'react-icons/fa';

// Product images (replace with your actual imports)
import stiiizyImage from '../../assets/products/stiizy.png';
import brassKnucklesImage from '../../assets/products/cure.png';
import bigChiefImage from '../../assets/products/bigchief.png';
import curepenImage from '../../assets/products/cure.png';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Product data structure
  const products = [
    {
      id: 1,
      name: 'STIIIZY',
      category: 'pods',
      image: stiiizyImage,
      description: 'STIIIZY предлагает премиальные картриджи с фирменными маслами, обогащенными натуральными терпенами для максимального вкуса и эффекта.',
      longDescription: 'STIIIZY — это инновационный бренд, который произвел революцию в индустрии вейпинга своими стильными, простыми в использовании под-системами. Каждый картридж наполнен высококачественным маслом, прошедшим тщательную очистку, с добавлением натуральных терпенов для создания уникального вкусового профиля каждого сорта.',
      features: [
        'Компактный дизайн для дискретного использования',
        'Без PG/VG/PEG добавок',
        '100% натуральные терпены',
        'Специальная технология испарения',
        'Премиальное масло высокой очистки'
      ],
      strains: [
        { 
          name: 'Purple Punch', 
          type: 'indica', 
          thc: '85-90%',
          effects: ['Расслабление', 'Снятие стресса', 'Сон'],
          flavor: 'Ягодно-виноградный с нотками сладкой выпечки'
        },
        { 
          name: 'Blue Dream', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Творчество', 'Расслабление', 'Эйфория'],
          flavor: 'Ягодный с нотками сладких цитрусовых и хвои'
        },
        { 
          name: 'Pineapple Express', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Энергия', 'Фокус', 'Творчество'],
          flavor: 'Тропические фрукты с нотками сосны и кедра'
        },
        { 
          name: 'OG Kush', 
          type: 'indica', 
          thc: '85-90%',
          effects: ['Глубокое расслабление', 'Эйфория', 'Снятие боли'],
          flavor: 'Землистый с нотками цитрусовых и сосны'
        },
        { 
          name: 'Gelato', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Эйфория', 'Творчество', 'Расслабление'],
          flavor: 'Сладкий десертный с нотками ягод и мяты'
        }
      ],
      price: '2000₽',
      tag: 'Бестселлер',
      awards: [
        '1-е место, High Times Cannabis Cup 2018'
      ],
      contactPerson: '@Vapehub_operator'
    },
    {
      id: 2,
      name: 'BRASS KNUCKLES',
      category: 'cartridges',
      image: brassKnucklesImage,
      description: 'Brass Knuckles предлагает картриджи премиум-класса, известные своей исключительной мощностью и чистотой.',
      longDescription: 'Brass Knuckles — один из самых узнаваемых брендов на рынке, известный своими экстра-мощными картриджами. Продукция проходит тщательное тестирование на чистоту и не содержит растворителей, тяжелых металлов и других вредных примесей.',
      features: [
        'Gold Edition — картриджи премиум-класса',
        'Экстра-высокая концентрация каннабиноидов',
        'Без растворителей и вредных примесей',
        'Керамический нагревательный элемент',
        'Исключительная прозрачность и чистота масла'
      ],
      strains: [
        { 
          name: 'Girl Scout Cookies', 
          type: 'hybrid', 
          thc: '80-85%',
          effects: ['Эйфория', 'Расслабление', 'Творчество'],
          flavor: 'Сладкий десертный с нотками мяты и шоколада'
        },
        { 
          name: 'Skywalker OG', 
          type: 'indica', 
          thc: '80-85%',
          effects: ['Глубокое расслабление', 'Снятие боли', 'Сон'],
          flavor: 'Землистый с нотками кедра и цитрусовых'
        },
        { 
          name: 'Sour Diesel', 
          type: 'sativa', 
          thc: '80-85%',
          effects: ['Энергия', 'Фокус', 'Эйфория'],
          flavor: 'Цитрусовый с дизельными нотками'
        }
      ],
      price: '2200₽',
      tag: 'Эксклюзив',
      awards: [
        '1-е место, Best Vaporizer High Times 2017'
      ],
      contactPerson: '@Vapehub_operator'
    },
    {
      id: 3,
      name: 'BIG CHIEF',
      category: 'cartridges',
      image: bigChiefImage,
      description: 'Big Chief предлагает премиальные дистиллятные картриджи, созданные для обеспечения чистого и мощного эффекта.',
      longDescription: 'Big Chief — бренд, который быстро завоевал репутацию благодаря качеству своих картриджей. Каждый продукт содержит чистый дистиллят с высоким содержанием каннабиноидов и обогащен натуральными терпенами для неповторимого вкуса и аромата.',
      features: [
        'Высококачественный дистиллят',
        'Обогащен натуральными терпенами',
        'Проверенное качество и безопасность',
        'Превосходная герметичность',
        'Устойчивость к протеканию'
      ],
      strains: [
        { 
          name: 'Sour Tangie', 
          type: 'sativa', 
          thc: '85-90%',
          effects: ['Энергия', 'Творчество', 'Приподнятое настроение'],
          flavor: 'Цитрусовый с нотками мандарина и кислых фруктов'
        },
        { 
          name: 'Wedding Cake', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Расслабление', 'Эйфория', 'Счастье'],
          flavor: 'Сладкий десертный с ванильными нотками'
        },
        { 
          name: 'Granddaddy Purple', 
          type: 'indica', 
          thc: '85-90%',
          effects: ['Глубокое расслабление', 'Сон', 'Снятие боли'],
          flavor: 'Ягодный с виноградными и землистыми нотками'
        }
      ],
      price: '1800₽',
      tag: 'Популярный',
      awards: [],
      contactPerson: '@Vapehub_operator'
    },
    {
      id: 4,
      name: 'CUREpen',
      category: 'pens',
      image: curepenImage,
      description: 'CUREpen предлагает элегантную pen-систему с картриджами без растворителей для чистого и насыщенного опыта.',
      longDescription: 'CUREpen — премиальный бренд, предлагающий стильные pen-системы с передовой технологией испарения. Картриджи CUREpen наполнены чистым маслом без растворителей, обеспечивая мягкий и чистый вкус с каждой затяжкой.',
      features: [
        'Элегантный и стильный дизайн',
        'Технология без растворителей',
        'Чистый экстракт высшего качества',
        'Улучшенная система дозирования',
        'Долгий срок службы аккумулятора'
      ],
      strains: [
        { 
          name: 'Wedding Cake', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Расслабление', 'Эйфория', 'Счастье'],
          flavor: 'Сладкий десертный с ванильными нотками'
        },
        { 
          name: 'GG4 (Gorilla Glue)', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Расслабление', 'Эйфория', 'Счастье'],
          flavor: 'Землистый с хвойными и шоколадными нотками'
        },
        { 
          name: 'Blue Dream', 
          type: 'hybrid', 
          thc: '85-90%',
          effects: ['Творчество', 'Расслабление', 'Эйфория'],
          flavor: 'Ягодный с нотками сладких цитрусовых и хвои'
        }
      ],
      price: '2200₽',
      tag: 'Премиум',
      awards: [],
      contactPerson: '@Vapehub_operator'
    }
  ];

  // Categories for filter
  const categories = [
    { id: 'all', name: 'Все продукты', icon: <FaShoppingCart /> },
    { id: 'pods', name: 'Под-системы', icon: <FaLeaf /> },
    { id: 'cartridges', name: 'Картриджи', icon: <FaFlask /> },
    { id: 'pens', name: 'Pen-системы', icon: <FaStar /> }
  ];

  // Filter products by category
  const filteredProducts = products.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  // Functions to get strain type color
  const getStrainColor = (type) => {
    switch(type) {
      case 'indica':
        return '#6B46C1'; // Purple for indica
      case 'sativa':
        return '#E53E3E'; // Red for sativa
      case 'hybrid':
        return '#2B9348'; // Green for hybrid
      default:
        return '#718096';
    }
  };

  // Get strain type name in Russian
  const getStrainTypeName = (type) => {
    switch(type) {
      case 'indica':
        return 'Индика';
      case 'sativa':
        return 'Сатива';
      case 'hybrid':
        return 'Гибрид';
      default:
        return type;
    }
  };

  // Effect to create floating particles
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
    for (let i = 0; i < 10; i++) {
      createParticle();
    }
    
    return () => clearInterval(particleInterval);
  }, []);

  // Handle clicking on a product card
  const handleProductClick = (productId) => {
    if (activeProduct === productId) {
      setActiveProduct(null);
      setSelectedStrain(null);
    } else {
      setActiveProduct(productId);
      setSelectedStrain(null);
    }
  };

  // Get the active product data
  const activeProductData = products.find(p => p.id === activeProduct);

  // Variants for animations
  const productCardVariants = {
    inactive: { 
      scale: 1,
      y: 0
    },
    active: { 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

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

  return (
    <div className={styles.shopPage} ref={containerRef}>
      {/* Background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.leafPattern}></div>
      </div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y, opacity }}
      >
        {/* Page Header */}
        <motion.div 
          className={styles.shopHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.pageBadge}>Наш ассортимент</div>
          <h1 className={styles.pageTitle}>МАГАЗИН</h1>
          <p className={styles.pageSubtitle}>
            Выберите из нашего премиального ассортимента продуктов высшего качества
          </p>
        </motion.div>
        
        {/* Categories filter */}
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
        
        {/* Main Products Grid */}
        <motion.div 
          className={styles.productsWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              className={`${styles.productCard} ${activeProduct === product.id ? styles.activeCard : ''}`}
              variants={itemVariants}
              initial="inactive"
              animate={activeProduct === product.id ? "active" : "inactive"}
              whileHover={activeProduct === product.id ? {} : "hover"}
              onClick={() => handleProductClick(product.id)}
              layoutId={`product-${product.id}`}
            >
              <div className={styles.productCardInner}>
                <div className={styles.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={styles.productImage} 
                  />
                  {product.tag && (
                    <div className={styles.productTag}>
                      {product.tag}
                    </div>
                  )}
                </div>
                
                <div className={styles.productInfo}>
                  <div className={styles.productMeta}>
                    <div className={styles.productCategory}>
                      {product.category === 'pods' ? 'Под-система' : 
                       product.category === 'cartridges' ? 'Картридж' : 'Pen-система'}
                    </div>
                    <div className={styles.productPrice}>{product.price}</div>
                  </div>
                  
                  <h2 className={styles.productName}>{product.name}</h2>
                  
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  
                  <div className={styles.productFeatures}>
                    {product.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className={styles.featureItem}>
                        <FaCheckCircle className={styles.featureIcon} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.productActions}>
                    <motion.button 
                      className={styles.actionButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeProduct === product.id ? (
                        <>Скрыть подробности</>
                      ) : (
                        <>Подробнее <FaAngleRight /></>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Product Details Section */}
        <AnimatePresence>
          {activeProductData && (
            <motion.div
              className={styles.productDetails}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.detailsHeader}>
                <div className={styles.detailsHeaderLeft}>
                  <div className={styles.detailsCategory}>
                    {activeProductData.category === 'pods' ? 'Под-система' : 
                     activeProductData.category === 'cartridges' ? 'Картридж' : 'Pen-система'}
                  </div>
                  <h2 className={styles.detailsTitle}>{activeProductData.name}</h2>
                </div>
                <div className={styles.detailsHeaderRight}>
                  <div className={styles.detailsPrice}>{activeProductData.price}</div>
                  <a
                    href={`https://t.me/${activeProductData.contactPerson}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.orderNowButton}
                  >
                    <FaTelegramPlane className={styles.telegramIcon} />
                    Заказать сейчас
                  </a>
                </div>
              </div>
              
              <div className={styles.detailsContent}>
                <div className={styles.detailsDescription}>
                  <h3 className={styles.sectionTitle}>О продукте</h3>
                  <p>{activeProductData.longDescription}</p>
                  
                  <div className={styles.featuresGrid}>
                    {activeProductData.features.map((feature, index) => (
                      <div key={index} className={styles.featureGridItem}>
                        <div className={styles.featureGridIcon}>
                          <FaCheckCircle />
                        </div>
                        <div className={styles.featureGridText}>{feature}</div>
                      </div>
                    ))}
                  </div>
                  
                  {activeProductData.awards && activeProductData.awards.length > 0 && (
                    <div className={styles.awardsSection}>
                      <h3 className={styles.sectionTitle}>Награды</h3>
                      <div className={styles.awardsList}>
                        {activeProductData.awards.map((award, index) => (
                          <div key={index} className={styles.awardItem}>
                            <FaStar className={styles.awardIcon} />
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={styles.strainsSection}>
                  <h3 className={styles.sectionTitle}>Доступные сорта</h3>
                  <div className={styles.strainsGrid}>
                    {activeProductData.strains.map((strain, index) => (
                      <motion.div 
                        key={index}
                        className={`${styles.strainCard} ${selectedStrain === index ? styles.selectedStrain : ''}`}
                        onClick={() => setSelectedStrain(selectedStrain === index ? null : index)}
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <div 
                          className={styles.strainColorBar}
                          style={{ backgroundColor: getStrainColor(strain.type) }}
                        ></div>
                        <div className={styles.strainInfo}>
                          <div className={styles.strainHeader}>
                            <h4 className={styles.strainName}>{strain.name}</h4>
                            <div 
                              className={styles.strainType}
                              style={{ 
                                backgroundColor: `${getStrainColor(strain.type)}20`,
                                color: getStrainColor(strain.type)
                              }}
                            >
                              {getStrainTypeName(strain.type)}
                            </div>
                          </div>
                          
                          <div className={styles.strainContent}>
                            <div className={styles.strainThc}>
                              <span className={styles.strainLabel}>THC:</span>
                              <span className={styles.strainValue}>{strain.thc}</span>
                            </div>
                            
                            <div className={styles.strainEffects}>
                              <span className={styles.strainLabel}>Эффекты:</span>
                              <div className={styles.effectsTags}>
                                {strain.effects.map((effect, i) => (
                                  <span key={i} className={styles.effectTag}>{effect}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className={styles.strainFlavor}>
                              <span className={styles.strainLabel}>Вкус:</span>
                              <span className={styles.strainValue}>{strain.flavor}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.detailsFooter}>
                <div className={styles.contactInfo}>
                  <FaInfoCircle className={styles.contactIcon} />
                  <p>Для заказа и уточнения деталей свяжитесь с нашим менеджером в Telegram: {activeProductData.contactPerson}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* How to Order Section */}
        <div className={styles.howToOrder}>
          <h2 className={styles.sectionTitle}>Как сделать заказ</h2>
          
          <div className={styles.orderSteps}>
            <div className={styles.orderStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Выберите продукт</h3>
                <p>Ознакомьтесь с нашим ассортиментом и выберите интересующий вас товар</p>
              </div>
            </div>
            
            <div className={styles.orderStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Свяжитесь с менеджером</h3>
                <p>Напишите нашему менеджеру в Telegram для оформления заказа</p>
              </div>
            </div>
            
            <div className={styles.orderStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Выберите способ оплаты</h3>
                <p>Мы принимаем банковские переводы, электронные кошельки и криптовалюту</p>
              </div>
            </div>
            
            <div className={styles.orderStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Получите ваш заказ</h3>
                <p>Мы доставляем по всей России через СДЭК, Почту России или в постаматы</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact CTA Section */}
        <div className={styles.contactCta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Остались вопросы?</h2>
            <p className={styles.ctaText}>
              Свяжитесь с нашим менеджером для получения дополнительной информации о продуктах,
              наличии конкретных сортов или условиях доставки
            </p>
            <a 
              href="https://t.me/Vapehub_operator"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <FaTelegramPlane className={styles.telegramIcon} />
              Написать в Telegram
            </a>
          </div>
          
          <div className={styles.productDisclaimer}>
            <div className={styles.disclaimerContent}>
              <FaInfoCircle className={styles.disclaimerIcon} />
              <p>
                Вся наша продукция проходит строгий контроль качества и соответствует международным стандартам.
                Мы гарантируем подлинность и высокое качество каждого товара.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Certificates Strip */}
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