import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './ProductionPage.module.css';

// Import images (you'll need to add these to your assets)
import labImage from '../../assets/lab-image.jpg';
import distillationImage from '../../assets/lab-image.jpg';
import packagingImage from '../../assets/lab-image.jpg';
import qualityControlImage from '../../assets/lab-image.jpg';
import logoImage from '../../assets/loudpack-farms-logo.jpg';
import labTechnicianImage from '../../assets/lab-technician.jpg';

// Импорт иконок
import { FaLeaf, FaFlask, FaVial, FaCheck, FaMedal, FaSeedling } from 'react-icons/fa';

const ProductionPage = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('process');
  
  // Tabs for the different sections
  const tabs = [
    { id: 'process', label: 'ПРОЦЕСС', icon: <FaSeedling /> },
    { id: 'stages', label: 'ЭТАПЫ', icon: <FaFlask /> },
    { id: 'technology', label: 'ТЕХНОЛОГИИ', icon: <FaVial /> },
    { id: 'equipment', label: 'ОБОРУДОВАНИЕ', icon: <FaMedal /> }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Эффект анимированных листьев
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createLeaf = () => {
      if (!containerRef.current) return;
      
      const leaf = document.createElement('div');
      leaf.className = styles.leafParticle;
      
      // Рандомное позиционирование
      const startX = Math.random() * 100;
      
      leaf.style.left = `${startX}%`;
      leaf.style.top = `${Math.random() * 100}%`;
      leaf.style.animationDuration = `${Math.random() * 10 + 15}s`;
      leaf.style.opacity = Math.random() * 0.3 + 0.1;
      leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      containerRef.current.appendChild(leaf);
      
      // Удаление листа
      setTimeout(() => {
        if (leaf && leaf.parentNode) {
          leaf.remove();
        }
      }, 25000);
    };
    
    // Добавление листьев с интервалом
    const leafInterval = setInterval(createLeaf, 3000);
    // Начальное создание некоторого количества листьев
    for (let i = 0; i < 8; i++) {
      createLeaf();
    }
    
    return () => clearInterval(leafInterval);
  }, []);

  // Production stages data
  const productionStages = [
    {
      id: 'sourcing',
      title: 'СЫРЬЕ',
      description: 'Мы начинаем с отбора только высококачественного сырья, выращенного в экологически чистых районах Калифорнии. Наши партнерские фермы используют органические методы выращивания без применения пестицидов и ГМО.',
      image: labImage,
      facts: [
        'Отборное высококачественное сырье',
        'Органические методы выращивания',
        'Без пестицидов и ГМО'
      ],
      iconPoints: [
        { icon: '🌱', text: 'Органическое сырье' },
        { icon: '🧪', text: 'Лабораторные тесты' },
        { icon: '♻️', text: 'Экологичность' }
      ]
    },
    {
      id: 'extraction',
      title: 'ЭКСТРАКЦИЯ И ДИСТИЛЛЯЦИЯ',
      description: 'Масло BAD VAPE производится в нашей собственной современной заводской лаборатории. Его перегоняют 5 раз для получения высококачественного продукта. Мы используем передовые технологии СО2-экстракции, которые позволяют сохранить все полезные свойства растения.',
      image: distillationImage,
      facts: [
        '5-кратная перегонка',
        'СО2-экстракция без растворителей',
        'Сохранение терпенового профиля'
      ],
      iconPoints: [
        { icon: '🔬', text: '5 этапов очистки' },
        { icon: '💧', text: 'Чистота 98.6%' },
        { icon: '🔄', text: 'Полный контроль процесса' }
      ]
    },
    {
      id: 'formulation',
      title: 'СОЗДАНИЕ ФОРМУЛЫ',
      description: 'Затем мы добавляем запатентованные смеси терпенов (природных ароматизаторов из хвойных растений) для достижения возможного наилучшего вкуса. Нет PG, VG, PEG или других добавок, таких как ГМО. Наши мастера-технологи тщательно разрабатывают уникальные профили для каждого сорта.',
      image: labImage,
      facts: [
        'Натуральные терпены',
        'Без PG, VG и искусственных добавок',
        'Уникальные вкусовые профили'
      ],
      iconPoints: [
        { icon: '🌿', text: 'Натуральные терпены' },
        { icon: '❌', text: 'Без PG и VG' },
        { icon: '👅', text: 'Богатый вкусовой профиль' }
      ]
    },
    {
      id: 'quality',
      title: 'КОНТРОЛЬ КАЧЕСТВА',
      description: 'Каждая партия проходит строгие тесты и оценки качества Европейских и Американских экспертных организаций. Мы проверяем не только содержание активных веществ, но и отсутствие пестицидов, тяжелых металлов, микробных загрязнений и остаточных растворителей.',
      image: qualityControlImage,
      facts: [
        'Многоуровневое тестирование',
        'Независимые лаборатории',
        'Сертификация безопасности'
      ],
      iconPoints: [
        { icon: '📊', text: 'Постоянный мониторинг' },
        { icon: '🏆', text: 'Высшие стандарты' },
        { icon: '📝', text: 'Полная документация' }
      ]
    },
    {
      id: 'packaging',
      title: 'УПАКОВКА И ДОСТАВКА',
      description: 'Финальным этапом становится упаковка продукта в фирменную тару, которая защищает его от внешних воздействий и сохраняет все свойства. Мы используем специальные контейнеры, которые предотвращают окисление и деградацию активных компонентов.',
      image: packagingImage,
      facts: [
        'Герметичная упаковка',
        'Защита от УФ-излучения',
        'Система контроля вскрытия'
      ],
      iconPoints: [
        { icon: '📦', text: 'Защитная упаковка' },
        { icon: '🚫', text: 'Защита от подделок' },
        { icon: '🛡️', text: 'Сохранение свойств' }
      ]
    }
  ];

  return (
    <div className={styles.productionPage} ref={containerRef}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.leafPattern}></div>
      </div>
      
      {/* Генерация плавающих листков */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div 
          key={index}
          className={styles.leafParticle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${15 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y, opacity }}
      >
        <motion.div 
          className={styles.pageHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.pageBadge}>
            <FaLeaf className={styles.badgeIcon} />
            Наш производственный процесс
          </div>
          <h1 className={styles.pageTitle}>ПРОИЗВОДСТВО</h1>
          <p className={styles.pageSubtitle}>
            ИСКУССТВО СОЗДАНИЯ ПРЕМИАЛЬНЫХ ПРОДУКТОВ
          </p>
        </motion.div>
        
        <div className={styles.logoSection}>
          <motion.div 
            className={styles.logoContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img src={logoImage} alt="Loudpack Farms" className={styles.brandLogo} />
          </motion.div>
        </div>
        
        {/* Production Stats Summary */}
        <div className={styles.productionStatsContainer}>
          <div className={styles.productionStatCard}>
            <div className={styles.statIcon}>
              <FaLeaf />
            </div>
            <div className={styles.statInfo}>
              <h4>Органическое сырье</h4>
              <p>100% натуральные компоненты</p>
            </div>
          </div>
          <div className={styles.productionStatCard}>
            <div className={styles.statIcon}>
              <FaFlask />
            </div>
            <div className={styles.statInfo}>
              <h4>5-кратная перегонка</h4>
              <p>Максимальная чистота продукта</p>
            </div>
          </div>
          <div className={styles.productionStatCard}>
            <div className={styles.statIcon}>
              <FaCheck />
            </div>
            <div className={styles.statInfo}>
              <h4>Контроль качества</h4>
              <p>Лабораторные тесты каждой партии</p>
            </div>
          </div>
        </div>
        
        {/* Section Navigation Tabs */}
        <div className={styles.sectionNavigation}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.sectionTab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              {activeTab === tab.id && <div className={styles.activeTabIndicator}></div>}
            </button>
          ))}
        </div>
        
        {/* Tab Content Panel */}
        <div className={styles.tabContentPanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.tabContent}
            >
              {/* Process Section */}
              {activeTab === 'process' && (
                <div className={styles.processTabContent}>
                  <div className={styles.processSection}>
                    <div className={styles.processImageContainer}>
                      <motion.div
                        className={styles.imageOverlayEffect}
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                      />
                      <img src={labTechnicianImage} alt="Лабораторный процесс" className={styles.processImage} />
                    </div>
                    
                    <motion.div 
                      className={styles.processTextContainer}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className={styles.sectionTag}>НАШЕ ПРОИЗВОДСТВО</div>
                      <h2 className={styles.processTitle}>ПРОЦЕСС</h2>
                      <p className={styles.processText}>
                        Loudpack Farms готова и готова удовлетворить огромный спрос на каннабис в Калифорнии. Все это
                        происходит на нашем современном объекте выращивания с восемью теплицами. Оттуда процесс
                        продолжается, от выращивания и силикатирования в нашей производственной лаборатории
                        фармацевтического уровня до упаковки и распространения.
                      </p>
                      
                      <div className={styles.processFacts}>
                        <div className={styles.processFact}>
                          <div className={styles.factNumber}>8</div>
                          <div className={styles.factLabel}>СОВРЕМЕННЫХ ТЕПЛИЦ</div>
                        </div>
                        <div className={styles.processFact}>
                          <div className={styles.factNumber}>100%</div>
                          <div className={styles.factLabel}>КОНТРОЛЬ КАЧЕСТВА</div>
                        </div>
                        <div className={styles.processFact}>
                          <div className={styles.factNumber}>24/7</div>
                          <div className={styles.factLabel}>МОНИТОРИНГ</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className={styles.processInfoCards}>
                    <motion.div 
                      className={styles.infoCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <div className={styles.infoCardIcon}>🌿</div>
                      <h3>ВЫРАЩИВАНИЕ</h3>
                      <p>Природные условия Калифорнии идеальны для выращивания высококачественной конопли</p>
                    </motion.div>
                    
                    <motion.div 
                      className={styles.infoCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className={styles.infoCardIcon}>🧪</div>
                      <h3>ЛАБОРАТОРИЯ</h3>
                      <p>Современная лаборатория с оборудованием фармацевтического уровня</p>
                    </motion.div>
                    
                    <motion.div 
                      className={styles.infoCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <div className={styles.infoCardIcon}>📦</div>
                      <h3>ДИСТРИБУЦИЯ</h3>
                      <p>Надежная сеть дистрибуции обеспечивает доступность продукции по всей Калифорнии</p>
                    </motion.div>
                  </div>
                </div>
              )}
              
              {/* Production Stages Section */}
              {activeTab === 'stages' && (
                <div className={styles.stagesTabContent}>
                  <div className={styles.stagesHeader}>
                    <h2 className={styles.stagesTitle}>ЭТАПЫ ПРОИЗВОДСТВА</h2>
                    <p className={styles.stagesSubtitle}>
                      От отбора лучшего сырья до финальной упаковки: ознакомьтесь с каждым этапом нашего тщательно контролируемого производственного процесса
                    </p>
                  </div>
                  
                  <div className={styles.stagesTimeline}>
                    <div className={styles.timelineLine}></div>
                    
                    <div className={styles.stagesContainer}>
                      {productionStages.map((stage, index) => (
                        <motion.div 
                          key={stage.id}
                          className={styles.productionStage}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                          <div className={styles.stageContent}>
                            <div className={styles.timelinePoint}>
                              <div className={styles.stageBadge}>{index + 1}</div>
                            </div>
                            
                            <div className={styles.stageTextContent}>
                              <h2 className={styles.stageTitle}>{stage.title}</h2>
                              <p className={styles.stageDescription}>
                                {stage.description}
                              </p>
                              
                              <div className={styles.stageFacts}>
                                {stage.facts.map((fact, factIndex) => (
                                  <div key={factIndex} className={styles.factItem}>
                                    <div className={styles.factBullet}></div>
                                    <span>{fact}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className={styles.stageIconPoints}>
                                {stage.iconPoints.map((point, pointIndex) => (
                                  <div key={pointIndex} className={styles.iconPoint}>
                                    <div className={styles.pointIcon}>{point.icon}</div>
                                    <span className={styles.pointText}>{point.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <motion.div 
                              className={styles.stageImageContainer}
                              whileInView={{ scale: [0.9, 1] }}
                              transition={{ duration: 0.5 }}
                              viewport={{ once: true }}
                            >
                              <img src={stage.image} alt={stage.title} className={styles.stageImage} />
                              <div className={styles.imageGlow}></div>
                              <div className={styles.stageBadgeOverlay}>{`ЭТАП ${index + 1}`}</div>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Technology Section */}
              {activeTab === 'technology' && (
                <div className={styles.technologyTabContent}>
                  <div className={styles.techIntro}>
                    <motion.h2 
                      className={styles.techIntroTitle}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      ПЕРЕДОВЫЕ ТЕХНОЛОГИИ
                    </motion.h2>
                    <motion.p 
                      className={styles.techIntroText}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Мы используем самые современные технологии для создания продукции премиального качества.
                      Каждый этап производства контролируется опытными специалистами, обеспечивая соблюдение 
                      всех технологических процессов.
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    className={styles.techSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className={styles.techGrid}>
                      {[
                        {
                          title: "СО2-экстракция",
                          text: "Мы используем метод сверхкритической CO2-экстракции, который позволяет извлекать активные компоненты без применения растворителей, сохраняя все полезные свойства растения.",
                          badge: "Без растворителей",
                          icon: "🔬"
                        },
                        {
                          title: "Фракционная дистилляция",
                          text: "Процесс очистки масла проходит в несколько этапов с использованием различных температурных режимов для отделения нежелательных примесей и получения чистого продукта.",
                          badge: "5-кратная очистка",
                          icon: "⚗️"
                        },
                        {
                          title: "Тонкая фильтрация",
                          text: "Система многоступенчатой фильтрации через специальные мембраны удаляет мельчайшие частицы, обеспечивая кристальную чистоту конечного продукта.",
                          badge: "99.9% чистота",
                          icon: "🧫"
                        },
                        {
                          title: "Автоматизированный контроль",
                          text: "Современное оборудование с компьютерным управлением обеспечивает постоянный мониторинг всех параметров процесса для стабильного качества каждой партии.",
                          badge: "Прецизионная точность",
                          icon: "💻"
                        }
                      ].map((tech, index) => (
                        <motion.div 
                          key={index}
                          className={styles.techCard}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          whileHover={{ 
                            y: -10,
                            boxShadow: "0 15px 30px rgba(76, 175, 80, 0.15)",
                            transition: { duration: 0.3 }
                          }}
                        >
                          <div className={styles.techIconContainer}>
                            <div className={styles.techIcon}>
                              {tech.icon}
                            </div>
                          </div>
                          <h3 className={styles.techCardTitle}>{tech.title}</h3>
                          <p className={styles.techCardText}>{tech.text}</p>
                          <div className={styles.techCardBadge}>{tech.badge}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className={styles.qualitySection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <h2 className={styles.qualityTitle}>ГАРАНТИЯ КАЧЕСТВА</h2>
                    
                    <div className={styles.qualityPoints}>
                      <div className={styles.qualityPoint}>
                        <div className={styles.qualityIcon}>
                          <FaCheck className={styles.icon} />
                        </div>
                        <div className={styles.qualityTextContent}>
                          <h3>Лабораторные Тесты</h3>
                          <p>Каждая партия проходит полный спектр лабораторных тестов, подтверждающих чистоту и качество продукта</p>
                        </div>
                      </div>
                      
                      <div className={styles.qualityPoint}>
                        <div className={styles.qualityIcon}>
                          <FaCheck className={styles.icon} />
                        </div>
                        <div className={styles.qualityTextContent}>
                          <h3>Контроль Производства</h3>
                          <p>Каждый этап производства контролируется опытными специалистами, обеспечивая соблюдение всех технологических процессов</p>
                        </div>
                      </div>
                      
                      <div className={styles.qualityPoint}>
                        <div className={styles.qualityIcon}>
                          <FaCheck className={styles.icon} />
                        </div>
                        <div className={styles.qualityTextContent}>
                          <h3>Сертификация</h3>
                          <p>Наша продукция имеет все необходимые сертификаты качества и соответствует международным стандартам</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Equipment Section */}
              {activeTab === 'equipment' && (
                <div className={styles.equipmentTabContent}>
                  <motion.div 
                    className={styles.equipmentSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className={styles.equipmentHeader}>
                      <h2 className={styles.equipmentHeaderTitle}>ОБОРУДОВАНИЕ МИРОВОГО КЛАССА</h2>
                      <p className={styles.equipmentHeaderText}>
                        Наша лаборатория оснащена самым современным оборудованием, которое обеспечивает
                        высочайшее качество продукции на каждом этапе производства
                      </p>
                    </div>
                  
                    <div className={styles.equipmentContent}>
                      <div className={styles.equipmentTextContainer}>
                        <h2 className={styles.equipmentTitle}>СОВРЕМЕННОЕ ОБОРУДОВАНИЕ</h2>
                        <p className={styles.equipmentDescription}>
                          Наше производство оснащено самым передовым оборудованием от ведущих мировых производителей, что позволяет нам добиваться исключительного качества продукции.
                        </p>
                        
                        <ul className={styles.equipmentList}>
                          <motion.li 
                            className={styles.equipmentItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <div className={styles.equipmentBullet}></div>
                            <span>Экстракционные системы последнего поколения</span>
                          </motion.li>
                          <motion.li 
                            className={styles.equipmentItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <div className={styles.equipmentBullet}></div>
                            <span>Лабораторное оборудование для анализа и контроля качества</span>
                          </motion.li>
                          <motion.li 
                            className={styles.equipmentItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <div className={styles.equipmentBullet}></div>
                            <span>Дистилляционные установки с прецизионным контролем параметров</span>
                          </motion.li>
                          <motion.li 
                            className={styles.equipmentItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <div className={styles.equipmentBullet}></div>
                            <span>Автоматизированные линии наполнения и упаковки</span>
                          </motion.li>
                        </ul>
                        
                        <div className={styles.equipmentStats}>
                          <motion.div 
                            className={styles.statItem}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            <div className={styles.statNumber}>99.9%</div>
                            <div className={styles.statLabel}>ЧИСТОТА</div>
                          </motion.div>
                          <motion.div 
                            className={styles.statItem}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <div className={styles.statNumber}>5X</div>
                            <div className={styles.statLabel}>ДИСТИЛЛЯЦИЯ</div>
                          </motion.div>
                          <motion.div 
                            className={styles.statItem}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                          >
                            <div className={styles.statNumber}>0%</div>
                            <div className={styles.statLabel}>ПРИМЕСЕЙ</div>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className={styles.equipmentImageContainer}>
                        <motion.div 
                          className={styles.imageContainer}
                          initial={{ opacity: 0, rotateY: -25 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <div className={styles.imageBorder}>
                            <img src={labImage} alt="Лабораторное оборудование" className={styles.equipmentImage} />
                          </div>
                          <div className={styles.imageBadge}>ЛАБОРАТОРИЯ</div>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className={styles.equipmentGallery}>
                      <h3 className={styles.galleryTitle}>ЛАБОРАТОРНОЕ ОБОРУДОВАНИЕ</h3>
                      
                      <div className={styles.galleryGrid}>
                        {[1, 2, 3, 4].map((item, index) => (
                          <motion.div 
                            key={index}
                            className={styles.galleryItem}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 10px 25px rgba(76, 175, 80, 0.2)",
                              transition: { duration: 0.3 }
                            }}
                          >
                            <img src={labImage} alt={`Оборудование ${item}`} className={styles.galleryImage} />
                            <div className={styles.galleryOverlay}>
                              <div className={styles.galleryItemTitle}>Оборудование {item}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className={styles.labFacilities}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <h2 className={styles.facilitiesTitle}>НАШИ ПРОИЗВОДСТВЕННЫЕ МОЩНОСТИ</h2>
                    
                    <div className={styles.facilitiesGrid}>
                      {[
                        {
                          icon: "🏭",
                          title: "Производственная площадь",
                          value: "5,000 м²",
                          description: "Современное производственное помещение с контролируемым микроклиматом"
                        },
                        {
                          icon: "🌡️",
                          title: "Климат-контроль",
                          value: "24/7",
                          description: "Постоянный контроль температуры и влажности для оптимальных условий"
                        },
                        {
                          icon: "⚡",
                          title: "Мощность оборудования",
                          value: "500 кВт",
                          description: "Высокопроизводительное оборудование для эффективного производства"
                        },
                        {
                          icon: "👨‍🔬",
                          title: "Персонал",
                          value: "50+",
                          description: "Опытные специалисты с профильным образованием и многолетним опытом"
                        }
                      ].map((facility, index) => (
                        <motion.div 
                          key={index}
                          className={styles.facilityCard}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <div className={styles.facilityIcon}>{facility.icon}</div>
                          <div className={styles.facilityContent}>
                            <h3 className={styles.facilityTitle}>{facility.title}</h3>
                            <div className={styles.facilityValue}>{facility.value}</div>
                            <p className={styles.facilityDescription}>{facility.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.ctaGlow}></div>
          <h2 className={styles.ctaTitle}>ИСПЫТАЙТЕ КАЧЕСТВО ПРЯМО СЕЙЧАС</h2>
          <p className={styles.ctaText}>
            Присоединяйтесь к тысячам довольных клиентов, выбирающих премиальное качество BAD VAPE
          </p>
          <motion.a 
            href="/shop" 
            className={styles.ctaButton}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(76, 175, 80, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </motion.a>
        </motion.div>

        <div className={styles.certificateStrip}>
          <div className={styles.stripContainer}>
            <div className={styles.stripItem}>
              <FaLeaf className={styles.stripIcon} />
              <span className={styles.stripText}>100% Натуральный</span>
            </div>
            <div className={styles.stripItem}>
              <FaFlask className={styles.stripIcon} />
              <span className={styles.stripText}>Лабораторно проверено</span>
            </div>
            <div className={styles.stripItem}>
              <FaSeedling className={styles.stripIcon} />
              <span className={styles.stripText}>Экологически чисто</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductionPage;