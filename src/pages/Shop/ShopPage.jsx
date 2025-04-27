import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ShopPage.module.css';

// Icons
import { 
  FaLeaf, 
  FaShoppingCart, 
  FaTelegramPlane, 
  FaStar, 
  FaCheck, 
  FaAngleDown, 
  FaAngleUp, 
  FaInfoCircle,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

// Import your product images here
// import stiiizyImage from '../../assets/products/stiizy.png';
// import bigChiefImage from '../../assets/products/bigchief.png';
// import curepenImage from '../../assets/products/cure.png';
// import muhaImage from '../../assets/products/muha.png';

// Placeholder for images (remove this when you have actual images)
const placeholderImages = {
  stiiizy: "/api/placeholder/220/300",
  bigChief: "/api/placeholder/220/300",
  curepen: "/api/placeholder/220/300",
  muha: "/api/placeholder/220/300"
};

const ShopPage = () => {
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    search: ''
  });
  const containerRef = useRef(null);

  // Scroll to expanded section when a brand is clicked
  useEffect(() => {
    if (expandedBrand && containerRef.current) {
      const element = document.getElementById(`brand-${expandedBrand}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [expandedBrand]);

  // Brand data
  const brands = [
    {
      id: 'stiiizy',
      name: 'STIIIZY',
      tagline: 'Премиальные под-системы',
      description: 'STIIIZY предлагает премиальные картриджи с фирменными маслами, обогащенными натуральными терпенами для максимального вкуса и эффекта.',
      image: placeholderImages.stiiizy,
      badge: 'Бестселлер',
      strains: [
        {
          id: 'sour-diesel',
          name: 'Sour Diesel',
          type: 'sativa',
          thc: '90%',
          description: 'Легендарная сатива с резким дизельным ароматом и лёгкими цитрусовыми нотками.',
          effects: ['Быстрый бодряк', 'Энергия, фокус, подъём', 'Идеально на день'],
          flavor: 'Цитрусовый с дизельными нотками'
        },
        {
          id: 'lemon-haze',
          name: 'Lemon Haze',
          type: 'sativa',
          thc: '88%',
          description: 'Цитрусовый аромат и освежающий вкус лимона. Классика бодрой сативы.',
          effects: ['Вдохновляет', 'Очищает голову', 'Подходит для дел и общения'],
          flavor: 'Яркий лимонный с нотками сладости'
        },
        {
          id: 'strawnana',
          name: 'Strawnana',
          type: 'hybrid',
          thc: '91%',
          description: 'Сладкий вкус клубники с бананом, приятный аромат и сбалансированный эффект.',
          effects: ['Лёгкая эйфория', 'Мягкое расслабление без «пришибленности»', 'Универсальный вариант'],
          flavor: 'Сладкий фруктовый микс клубники и банана'
        },
        {
          id: 'gelato',
          name: 'Gelato',
          type: 'hybrid',
          thc: '92%',
          description: 'Кремово-десертный гибрид с лёгкой цитрусовой горчинкой. Очень ароматный и насыщенный.',
          effects: ['Уравновешивает', 'Настраивает на позитив', 'Отлично на вечер'],
          flavor: 'Сладкий десертный с нотками ягод и мяты'
        },
        {
          id: 'skywalker-og',
          name: 'Skywalker OG',
          type: 'indica',
          thc: '93%',
          description: 'Плотный аромат хвои и специй, глубокое индика-расслабление.',
          effects: ['Успокаивает тело и ум', 'Уносит стресс', 'Засыпаешь как младенец'],
          flavor: 'Землистый с нотками специй и сосны'
        },
        {
          id: 'purple-punch',
          name: 'Purple Punch',
          type: 'indica',
          thc: '94%',
          description: 'Яркий ягодный вкус, сочный аромат и мягкий, но мощный седативный эффект.',
          effects: ['Убирает тревожность', 'Идеален для сна', 'Глубокий вечерний релакс'],
          flavor: 'Сладкий ягодный с нотками винограда'
        },
        {
          id: 'og-kush',
          name: 'OG Kush',
          type: 'indica',
          thc: '92%',
          description: 'Знаменитая классика с землистым, цитрусово-пряным вкусом и мощным фоном.',
          effects: ['Быстрое снятие стресса', 'Ментальный релакс + телесное расслабление', 'Отличный выбор для конца дня'],
          flavor: 'Землистый с нотками цитрусовых и сосны'
        }
      ]
    },
    {
      id: 'bigChief',
      name: 'BIG CHIEF',
      tagline: 'Премиальные дистиллятные картриджи',
      description: 'Big Chief предлагает премиальные дистиллятные картриджи, созданные для обеспечения чистого и мощного эффекта.',
      image: placeholderImages.bigChief,
      badge: 'Популярный',
      strains: [
        {
          id: 'ak-47',
          name: 'AK-47',
          type: 'sativa',
          thc: '92%',
          description: 'Сорт AK-47 обладает приятным сладким фруктовым вкусом с нотками хвои, сканка и сандала.',
          effects: ['Сильный сативный базз', 'Подходит для общения и творчества', 'Поднимает настроение'],
          flavor: 'Сладкий фруктовый с нотками хвои и сандала'
        },
        {
          id: 'jack-herer',
          name: 'Jack Herer',
          type: 'sativa',
          thc: '91%',
          description: 'Гибридный сорт с преобладанием сативы, классические землистые ноты, а во вкусе преобладают оттенки сладости и топлива.',
          effects: ['Ощущение счастья и полета', 'Радикальная борьба со стрессами', 'Ярко выраженная эйфория'],
          flavor: 'Землистый с нотками сладости и специй'
        },
        {
          id: 'apple-fritter',
          name: 'Apple Fritter',
          type: 'indica',
          thc: '95%',
          description: 'Apple fritter имитирует вкус кондитерских изделий с добавлением едва уловимого сырного привкуса.',
          effects: ['Мощный и успокаивающий кайф', 'Сильнейшее расслабление по всему телу', 'Глубокий релакс'],
          flavor: 'Сырный яблочный пирог со сладостью и землистостью'
        },
        {
          id: 'green-crack',
          name: 'Green Crack',
          type: 'indica',
          thc: '90%',
          description: 'Один из наиболее позитивных сортов марихуаны с преобладанием индики, заслуживший своё название благодаря необычному эйфорическому действию.',
          effects: ['Эйфория', 'Расслабление мускулатуры', 'Ощущение красоты окружающего мира'],
          flavor: 'Богатый фруктовый вкус (манго)'
        },
        {
          id: 'strawnana-bc',
          name: 'Strawnana',
          type: 'hybrid',
          thc: '92%',
          description: 'Из-за высокого уровня ТГК сорт Strawberry Bannana обладает сильным гибридным эффектом.',
          effects: ['Энергия', 'Высокое внимание', 'Ясность мышления'],
          flavor: 'Клубнично-банановый микс с кремовыми нотками'
        },
        {
          id: 'chief-of',
          name: 'Chief OG',
          type: 'hybrid',
          thc: '88%',
          description: 'Эйфория от Chief OG так же восхитительна, как и звучит, она создает ощущение спокойствия и концентрации.',
          effects: ['Хорошее настроение', 'Ясный мозг', 'Блестящая умственная сила'],
          flavor: 'Кислый цитрусовый с нотками сосны'
        }
      ]
    },
    {
      id: 'curepen',
      name: 'CURE PEN',
      tagline: 'Солвент-фри картриджи',
      description: 'CUREpen предлагает элегантную pen-систему с картриджами без растворителей для чистого и насыщенного опыта.',
      image: placeholderImages.curepen,
      badge: 'Премиум',
      strains: [
        {
          id: 'cali-o',
          name: 'Cali-O',
          type: 'sativa',
          thc: '89%',
          description: 'Cali-O, или Калифорнийский апельсин, - это штамм старой школы, датируемый началом 1980-х годов.',
          effects: ['Оптимистичный', 'Ясный кайф', 'Прилив энергии'],
          flavor: 'Цитрусовые ароматы с нотками свежего апельсина'
        },
        {
          id: 'super-lemon-haze',
          name: 'Super Lemon Haze',
          type: 'sativa',
          thc: '92%',
          description: 'Доминирующий сатива. Lemon Skunk и Super Silver Haze и двукратный обладатель Кубка каннабиса от Green House Seeds.',
          effects: ['Энергичный', 'Живой', 'Приподнятое настроение'],
          flavor: 'Пикантный, цитрусовый и сладкий'
        },
        {
          id: 'king-louis-og',
          name: 'King Louis OG',
          type: 'indica',
          thc: '93%',
          description: 'Штамм индики, выведенный из генетического позвоночника каннабиса Западного побережья, OG Kush.',
          effects: ['Глубокое расслабление', 'Снятие напряжения', 'Идеально на ночь'],
          flavor: 'Сосна, земляная и древесная'
        },
        {
          id: 'banana-sherbet',
          name: 'Banana Sherbet',
          type: 'hybrid',
          thc: '90%',
          description: 'Гибридный штамм со сладким и фруктовым ароматом.',
          effects: ['Расслабляющая эйфория', 'Целенаправленное творчество', 'Сбалансированное состояние'],
          flavor: 'Сладкий банановый с нотками шербета'
        },
        {
          id: 'gelato-cure',
          name: 'Gelato',
          type: 'hybrid',
          thc: '91%',
          description: 'Этот гибрид с несколькими наградами Cannabis Cup готов раскрыть творческий потенциал и обеспечить серьезное расслабление.',
          effects: ['Креативность', 'Расслабление', 'Эйфория'],
          flavor: 'Сладкий шербет с фруктовым черничным и апельсиновым вкусом'
        },
        {
          id: 'jillybean',
          name: 'Jillybean',
          type: 'hybrid',
          thc: '88%',
          description: 'Гибридный штамм, который является лучшим выбором для творческих умов, ищущих идеальный эйфорический кайф в дневное время.',
          effects: ['Эйфорический кайф', 'Креативное мышление', 'Оптимистичное настроение'],
          flavor: 'Сладкий, цитрусовый и тропический'
        },
        {
          id: 'three-kings',
          name: 'Three Kings',
          type: 'hybrid',
          thc: '90%',
          description: 'Гибрид, выведенный из всемогущих штаммов марихуаны - Headband, Sour Diesel и OG Kush.',
          effects: ['Серьезное расслабление', 'Эйфория', 'Баланс тела и ума'],
          flavor: 'Кислый с нотками дизеля и специй'
        }
      ]
    },
    {
      id: 'muha',
      name: 'MUHA MEDS',
      tagline: 'Высокопотентные картриджи',
      description: 'Muha Meds предлагает широкий ассортимент высокопотентных картриджей с разнообразными сортами для любого настроения и времени суток.',
      image: placeholderImages.muha,
      badge: 'Топ продаж',
      strains: [
        {
          id: 'super-silver-haze',
          name: 'Super Silver Haze',
          type: 'sativa',
          thc: '89%',
          description: 'Классическая сатива с мощным бодрящим эффектом.',
          effects: ['Повышает концентрацию', 'Ускоряет мышление', 'Дневной заряд'],
          flavor: 'Цитрусовый с нотками специй и дыма'
        },
        {
          id: 'strawberry-cough',
          name: 'Strawberry Cough',
          type: 'sativa',
          thc: '87%',
          description: 'Поднимает настроение, даёт лёгкое, ясное и при этом уверенное состояние.',
          effects: ['Выход из замкнутого мышления', 'Лёгкость и энергия', 'Творческие задачи'],
          flavor: 'Сладкий клубничный с нотками земли'
        },
        {
          id: 'super-sour-diesel',
          name: 'Super Sour Diesel',
          type: 'sativa',
          thc: '91%',
          description: 'Мощный прилив энергии, активное, немного хаотичное воодушевление.',
          effects: ['Энергия действия', 'Стимуляция идей', 'Активная коммуникация'],
          flavor: 'Дизельный с кислыми цитрусовыми нотками'
        },
        {
          id: 'skywalker-og-muha',
          name: 'Skywalker OG',
          type: 'indica',
          thc: '93%',
          description: 'Сорт полной перезагрузки — тяжёлый, глубокий, расслабляющий до костей.',
          effects: ['Перезагрузка', 'Снимает напряжение', 'Гасит тревогу'],
          flavor: 'Землистый с нотками сосны и специй'
        },
        {
          id: 'watermelon-og',
          name: 'Watermelon OG',
          type: 'indica',
          thc: '88%',
          description: 'Мягкое и медитативное состояние. Не валит, а как бы растворяет в спокойствии.',
          effects: ['Медитативное состояние', 'Спокойствие', 'Релакс'],
          flavor: 'Сладкий арбузный с земляными нотками'
        },
        {
          id: 'garlic-jelly',
          name: 'Garlic Jelly',
          type: 'indica',
          thc: '90%',
          description: 'Тяжёлый, уравновешивающий эффект, хороший антистресс.',
          effects: ['Заземление', 'Снятие стресса', 'Восстановление'],
          flavor: 'Сладкий с пряными и чесночными нотками'
        },
        {
          id: 'berry-gelato',
          name: 'Berry Gelato',
          type: 'hybrid',
          thc: '89%',
          description: 'Сбалансированное состояние "ясной головы и расслабленного тела".',
          effects: ['Комфорт', 'Хорошее настроение', 'Баланс'],
          flavor: 'Сладкий ягодный с кремовыми нотками'
        },
        {
          id: 'donny-burger',
          name: 'Donny Burger',
          type: 'hybrid',
          thc: '92%',
          description: 'Медленно накрывает, приводит к состоянию внутреннего равновесия.',
          effects: ['Внутреннее равновесие', 'Тепло и мягкость', 'Умиротворение'],
          flavor: 'Пряный с нотками специй и сладости'
        },
        {
          id: 'mango-madness',
          name: 'Mango Madness',
          type: 'hybrid',
          thc: '88%',
          description: 'Чёткий гибрид: лёгкое приподнятое настроение, спокойствие без сонливости.',
          effects: ['Приподнятое настроение', 'Спокойствие', 'Универсальность'],
          flavor: 'Сладкий манговый с тропическими нотками'
        }
      ]
    }
  ];

  // Price packages data
  const pricePackages = [
    {
      id: '1ml',
      size: '1 мл',
      price: '13.000₽',
      puffs: '350-400',
      sessions: '50-60'
    },
    {
      id: '1.3ml',
      size: '1.3 мл',
      price: '14.000₽',
      puffs: '550-600',
      sessions: '80-90'
    },
    {
      id: '2.2ml',
      size: '2.2 мл',
      price: '17.000₽',
      puffs: '1000-1100',
      sessions: '160-200'
    }
  ];

  // Filter strains based on active filters
  const getFilteredStrains = (strains) => {
    if (!strains) return [];
    
    return strains.filter(strain => {
      // Filter by type
      const typeMatch = activeFilters.type === 'all' || strain.type === activeFilters.type;
      
      // Filter by search term
      const searchMatch = activeFilters.search === '' || 
        strain.name.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
        strain.description.toLowerCase().includes(activeFilters.search.toLowerCase());
      
      return typeMatch && searchMatch;
    });
  };

  // Helper functions for strain types
  const getStrainTypeColor = (type) => {
    switch(type) {
      case 'sativa':
        return '#E53E3E'; // Red
      case 'indica':
        return '#6B46C1'; // Purple
      case 'hybrid':
        return '#2F855A'; // Green
      default:
        return '#718096'; // Gray
    }
  };

  const getStrainTypeName = (type) => {
    switch(type) {
      case 'sativa':
        return 'Сатива';
      case 'indica':
        return 'Индика';
      case 'hybrid':
        return 'Гибрид';
      default:
        return 'Неизвестно';
    }
  };

  // Toggle brand expansion
  const toggleBrand = (brandId) => {
    setExpandedBrand(expandedBrand === brandId ? null : brandId);
    setSelectedStrain(null);
  };

  // Toggle strain selection
  const toggleStrain = (strainId) => {
    setSelectedStrain(selectedStrain === strainId ? null : strainId);
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    handleFilterChange('search', e.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
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
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={styles.shopPage} ref={containerRef}>
      {/* Header Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Breaking Bad</h1>
          <p className={styles.heroSubtitle}>
            Выберите из нашего премиального ассортимента продуктов высшего качества
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className={styles.contentContainer}>
        {/* Brands Overview Section */}
        <motion.div 
          className={styles.brandsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {brands.map(brand => (
            <motion.div
              key={brand.id}
              id={`brand-card-${brand.id}`}
              className={styles.brandCard}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
              onClick={() => toggleBrand(brand.id)}
            >
              {brand.badge && (
                <div className={styles.brandBadge}>
                  {brand.badge}
                </div>
              )}
              <div className={styles.brandImageContainer}>
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className={styles.brandImage}
                />
              </div>
              <div className={styles.brandInfo}>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <p className={styles.brandTagline}>{brand.tagline}</p>
                <p className={styles.brandDescription}>{brand.description}</p>
                <button 
                  className={`${styles.brandButton} ${expandedBrand === brand.id ? styles.brandButtonActive : ''}`}
                >
                  {expandedBrand === brand.id ? (
                    <>Свернуть <FaAngleUp /></>
                  ) : (
                    <>Посмотреть сорта <FaAngleDown /></>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded Brand Section */}
        <AnimatePresence>
          {expandedBrand && (
            <motion.div
              key={`expanded-${expandedBrand}`}
              id={`brand-${expandedBrand}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.expandedSection}
            >
              <div className={styles.expandedContainer}>
                {/* Brand header */}
                <div className={styles.expandedHeader}>
                  <div className={styles.expandedHeaderContent}>
                    <div>
                      <h2 className={styles.expandedTitle}>
                        {brands.find(b => b.id === expandedBrand)?.name}
                      </h2>
                      <p className={styles.expandedDescription}>
                        {brands.find(b => b.id === expandedBrand)?.description}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleBrand(expandedBrand)}
                      className={styles.collapseButton}
                    >
                      Свернуть <FaAngleUp />
                    </button>
                  </div>
                </div>
                
                {/* Strain filters */}
                <div className={styles.filtersContainer}>
                  <div className={styles.filtersTop}>
                    <div className={styles.filterLabel}>Фильтры:</div>
                    
                    <div className={styles.typeFilters}>
                      <button 
                        onClick={() => handleFilterChange('type', 'all')}
                        className={`${styles.typeFilterButton} ${activeFilters.type === 'all' ? styles.activeFilter : ''}`}
                      >
                        <FaShoppingCart /> Все
                      </button>
                      <button 
                        onClick={() => handleFilterChange('type', 'sativa')}
                        className={`${styles.typeFilterButton} ${styles.sativaButton} ${activeFilters.type === 'sativa' ? styles.activeFilter : ''}`}
                      >
                        <FaLeaf /> Сатива
                      </button>
                      <button 
                        onClick={() => handleFilterChange('type', 'indica')}
                        className={`${styles.typeFilterButton} ${styles.indicaButton} ${activeFilters.type === 'indica' ? styles.activeFilter : ''}`}
                      >
                        <FaLeaf /> Индика
                      </button>
                      <button 
                        onClick={() => handleFilterChange('type', 'hybrid')}
                        className={`${styles.typeFilterButton} ${styles.hybridButton} ${activeFilters.type === 'hybrid' ? styles.activeFilter : ''}`}
                      >
                        <FaLeaf /> Гибрид
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                      <FaSearch className={styles.searchIcon} />
                      <input
                        type="text"
                        placeholder="Поиск сортов..."
                        value={activeFilters.search}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                      />
                      {activeFilters.search && (
                        <button 
                          className={styles.clearSearch}
                          onClick={() => handleFilterChange('search', '')}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Strain cards */}
                <div className={styles.strainsContainer}>
                  {getFilteredStrains(brands.find(b => b.id === expandedBrand)?.strains).length > 0 ? (
                    <motion.div 
                      className={styles.strainsGrid}
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      {getFilteredStrains(brands.find(b => b.id === expandedBrand)?.strains).map((strain) => (
                        <motion.div
                          key={strain.id}
                          className={`${styles.strainCard} ${selectedStrain === strain.id ? styles.activeStrainCard : ''}`}
                          onClick={() => toggleStrain(strain.id)}
                          variants={itemVariants}
                          whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                        >
                          <div 
                            className={styles.strainColorBar}
                            style={{ backgroundColor: getStrainTypeColor(strain.type) }}
                          ></div>
                          
                          <div className={styles.strainContent}>
                            <div className={styles.strainHeader}>
                              <h3 className={styles.strainName}>{strain.name}</h3>
                              <div 
                                className={styles.strainType}
                                style={{ 
                                  backgroundColor: `${getStrainTypeColor(strain.type)}20`,
                                  color: getStrainTypeColor(strain.type)
                                }}
                              >
                                {getStrainTypeName(strain.type)}
                              </div>
                            </div>
                            
                            <div className={styles.strainDetails}>
                              <div className={styles.thcContent}>
                                <span className={styles.thcLabel}>THC:</span>
                                <span className={styles.thcValue}>{strain.thc}</span>
                              </div>
                              
                              <p className={styles.strainDescription}>{strain.description}</p>
                              
                              <div className={styles.strainFlavor}>
                                <span className={styles.flavorLabel}>Вкус:</span>
                                <span className={styles.flavorText}>{strain.flavor}</span>
                              </div>
                            </div>
                            
                            {selectedStrain === strain.id && (
                              <motion.div 
                                className={styles.strainEffects}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <h4 className={styles.effectsTitle}>Эффекты:</h4>
                                <div className={styles.effectsTags}>
                                  {strain.effects.map((effect, index) => (
                                    <div key={index} className={styles.effectTag}>
                                      <FaCheck className={styles.checkIcon} />
                                      <span>{effect}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                            
                            <div className={styles.strainActions}>
                              <button className={styles.detailsButton}>
                                {selectedStrain === strain.id ? 'Скрыть детали' : 'Подробнее'}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className={styles.noResults}>
                      <FaInfoCircle className={styles.noResultsIcon} />
                      <h3>Нет результатов по вашему запросу</h3>
                      <p>Попробуйте изменить параметры фильтрации или поиска</p>
                      <button 
                        className={styles.resetButton}
                        onClick={() => {
                          handleFilterChange('type', 'all');
                          handleFilterChange('search', '');
                        }}
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Pricing Section */}
                <div className={styles.pricingSection}>
                  <h3 className={styles.pricingTitle}>Варианты комплектации</h3>
                  
                  <div className={styles.packagesGrid}>
                    {pricePackages.map(pack => (
                      <div key={pack.id} className={styles.packageCard}>
                        <div className={styles.packageHeader}>
                          <h4 className={styles.packageSize}>{pack.size}</h4>
                          <div className={styles.packagePrice}>{pack.price}</div>
                        </div>
                        <div className={styles.packageDetails}>
                          <div className={styles.packageSpec}>
                            <span className={styles.specLabel}>Количество затяжек:</span>
                            <span className={styles.specValue}>{pack.puffs}</span>
                          </div>
                          <div className={styles.packageSpec}>
                            <span className={styles.specLabel}>Сессий использования:</span>
                            <span className={styles.specValue}>{pack.sessions}</span>
                          </div>
                        </div>
                        <a 
                          href="https://t.me/Vapehub_operator" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.orderButton}
                        >
                          <FaTelegramPlane className={styles.telegramIcon} />
                          Заказать
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.pricingNotes}>
                    <p>
                      <strong>Картридж отдельно</strong> — на <strong>1.000₽ дешевле</strong>, чем полный комплект.
                    </p>
                    <p>
                      <strong>Жидкость отдельно</strong> — <strong>4500₽ за 1 мл</strong>
                    </p>
                    <p className={styles.minOrderNote}>
                      ⚠️ <strong>Продаем от 3 мл!</strong> Минимальный заказ — <strong>13.500₽</strong>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* How to Order Section */}
        <div className={styles.howToOrderSection}>
          <h2 className={styles.sectionTitle}>Как сделать заказ</h2>
          
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Выберите товар</h3>
                <p className={styles.stepDescription}>Ознакомьтесь с нашим ассортиментом и выберите интересующий вас товар</p>
              </div>
            </div>
            
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Свяжитесь с менеджером</h3>
                <p className={styles.stepDescription}>Напишите нашему менеджеру в Telegram для оформления заказа</p>
              </div>
            </div>
            
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Выберите способ доставки</h3>
                <p className={styles.stepDescription}>Мы доставляем по всей России через СДЭК, Почту России или в постаматы</p>
              </div>
            </div>
            
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Оплатите заказ</h3>
                <p className={styles.stepDescription}>Мы принимаем банковские переводы, электронные кошельки и криптовалюту</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact CTA Section */}
        <div className={styles.ctaSection}>
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
              <FaTelegramPlane />
              Написать в Telegram
            </a>
          </div>
        </div>
        
        {/* Quality Banner */}
        <div className={styles.qualityBanner}>
          <div className={styles.qualityItem}>
            <FaStar className={styles.qualityIcon} />
            <span>Премиальное качество</span>
          </div>
          <div className={styles.qualityItem}>
            <FaCheck className={styles.qualityIcon} />
            <span>Лабораторно протестировано</span>
          </div>
          <div className={styles.qualityItem}>
            <FaShoppingCart className={styles.qualityIcon} />
            <span>Доставка по всей России</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;