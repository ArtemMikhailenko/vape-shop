import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './PurchasePage.module.css';

// Иконки
import { 
  FaShoppingCart, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaBoxOpen,
  FaUser,
  FaCheckCircle,
  FaAngleRight
} from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiCardboardBox } from 'react-icons/gi';

const PurchasePage = () => {
  const [activeStep, setActiveStep] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Эффект анимированных линий
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createLine = () => {
      if (!containerRef.current) return;
      
      const line = document.createElement('div');
      line.className = styles.animatedLine;
      
      // Рандомное позиционирование
      const startX = Math.random() * 100;
      
      line.style.left = `${startX}%`;
      line.style.animationDuration = `${Math.random() * 3 + 8}s`;
      line.style.opacity = Math.random() * 0.15 + 0.05;
      
      containerRef.current.appendChild(line);
      
      // Удаление линии
      setTimeout(() => {
        if (line && line.parentNode) {
          line.remove();
        }
      }, 11000);
    };
    
    // Добавление линий с интервалом
    const lineInterval = setInterval(createLine, 1000);
    // Начальное создание некоторого количества линий
    for (let i = 0; i < 10; i++) {
      createLine();
    }
    
    return () => clearInterval(lineInterval);
  }, []);
  
  // Шаги процесса покупки
  const purchaseSteps = [
    {
      id: 1,
      title: 'Выбор товара',
      icon: <FaShoppingCart />,
      content: (
        <>
          <p>Вы выбираете товар который вам понравился из нашего ассортимента. Если вам тяжело выбрать, я вас консультирую и помогаю выбрать то, что вам больше всего подходит, выберем лучший вариант для вас 🔝</p>
          <div className={styles.actionButtons}>
            <a href="/shop" className={styles.actionButton}>
              <span>Перейти в каталог</span>
              <FaAngleRight />
            </a>
          </div>
        </>
      )
    },
    {
      id: 2,
      title: 'Способ доставки',
      icon: <FaTruck />,
      content: (
        <>
          <p>После выбора товара мы определяемся как будет осуществляться доставка в ваш город 🚚</p>
          <div className={styles.deliveryOptions}>
            <div className={styles.deliveryOption}>
              <div className={styles.optionIcon}><BsBoxSeam /></div>
              <h4>СДЭК, PickPoint, Почта России</h4>
              <p>Доставка в отделение выбранной службы</p>
            </div>
            <div className={styles.deliveryOption}>
              <div className={styles.optionIcon}><BiPackage /></div>
              <h4>Почтомат</h4>
              <p>Любой удобный для вас постамат</p>
            </div>
            <div className={styles.deliveryOption}>
              <div className={styles.optionIcon}><FaMapMarkerAlt /></div>
              <h4>Курьер с кладом</h4>
              <p>В районе, который вы укажете (уточнять у менеджера!)</p>
            </div>
          </div>
          <div className={styles.deliveryNote}>
            <AiOutlineClockCircle className={styles.noteIcon} />
            <p>Обычно посылка едет от 1 до 6 дней, в зависимости от вашего города. Доставка входит в стоимость товара</p>
          </div>
        </>
      )
    },
    {
      id: 3,
      title: 'Укажите адрес',
      icon: <FaMapMarkerAlt />,
      content: (
        <>
          <p>При выборе получения доставки, вам нужно указать адрес почтового отделения или адрес постомата в вашем городе в котором вам будет удобно забрать вашу посылку</p>
          <div className={styles.addressExample}>
            <div className={styles.exampleTitle}>Пример указания адреса:</div>
            <div className={styles.exampleContent}>
              <p>г. Москва, ул. Примерная, д. 123, СДЭК/Почта России/PickPoint</p>
              <p>или</p>
              <p>Постамат PickPoint №1234, ТЦ "Название", г. Москва, ул. Примерная, д. 123</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 4,
      title: 'Оплата',
      icon: <FaCreditCard />,
      content: (
        <>
          <p>После того, как выбрали способ доставки мы отправляем заявку на склад, для вас её открывают, вы выбираете как удобнее произвести оплату:</p>
          <div className={styles.paymentOptions}>
            <div className={styles.paymentOption}>
              <div className={styles.paymentIcon}><FaCreditCard /></div>
              <div className={styles.paymentInfo}>
                <h4>Банковский перевод 💳</h4>
                <p>Переводите оплату на карту</p>
              </div>
            </div>
            <div className={styles.paymentOption}>
              <div className={styles.paymentIcon}><RiSecurePaymentLine /></div>
              <div className={styles.paymentInfo}>
                <h4>Электронные кошельки 👝</h4>
                <p>Оплата через популярные электронные сервисы</p>
              </div>
            </div>
            <div className={styles.paymentOption}>
              <div className={styles.paymentIcon}><GiCardboardBox /></div>
              <div className={styles.paymentInfo}>
                <h4>Криптовалюта 💲</h4>
                <p>Оплата в криптовалюте</p>
              </div>
            </div>
          </div>
          <div className={styles.timeNote}>
            <AiOutlineClockCircle className={styles.noteIcon} />
            <p>Если производите оплату до 15:00 по МСК, отправляем в этот же день. Если после 15:00, отправляем на следующий день. После отправки высылаем вам трек номер для отслеживания товара</p>
          </div>
        </>
      )
    },
    {
      id: 5,
      title: 'Оформление заказа',
      icon: <FaBoxOpen />,
      content: (
        <>
          <p>Если вы уже выбрали то, что Вы желаете заказать, Вы должны указать такие данные:</p>
          <div className={styles.orderRequirements}>
            <div className={styles.requirement}>
              <div className={styles.reqIcon}><FaCheckCircle /></div>
              <div className={styles.reqText}>Указать устройство и сорт который вы выбрали</div>
            </div>
            <div className={styles.requirement}>
              <div className={styles.reqIcon}><FaCheckCircle /></div>
              <div className={styles.reqText}>Комплект с каким объемом жидкости вы хотите (1, 1.3, 2.2)</div>
            </div>
            <div className={styles.requirement}>
              <div className={styles.reqIcon}><FaCheckCircle /></div>
              <div className={styles.reqText}>Указать город доставки</div>
            </div>
            <div className={styles.requirement}>
              <div className={styles.reqIcon}><FaCheckCircle /></div>
              <div className={styles.reqText}>Как вам удобнее её получить</div>
            </div>
          </div>
          <div className={styles.deliveryTypeList}>
            <div className={styles.deliveryTypeItem}>
              <span className={styles.listBullet}>*</span>
              <span>СДЭК, PickPoint, Почта России</span>
            </div>
            <div className={styles.deliveryTypeItem}>
              <span className={styles.listBullet}>*</span>
              <span>Любой удобный почтомат</span>
            </div>
            <div className={styles.deliveryTypeItem}>
              <span className={styles.listBullet}>*</span>
              <span>Делаем клад (город уточнять у менеджера)</span>
            </div>
          </div>
        </>
      )
    },
    {
      id: 6,
      title: 'Анонимность',
      icon: <FaUser />,
      content: (
        <>
          <div className={styles.anonymityContainer}>
            <div className={styles.anonymityInfo}>
              <h4>Для службы доставки</h4>
              <p>Указать ФИО получателя и индекс или адрес удобного для вас отделения</p>
            </div>
            <div className={styles.anonymitySeparator}>или</div>
            <div className={styles.anonymityInfo}>
              <h4>Для сохранения анонимности</h4>
              <p>Если же вы не хотите указывать ФИО, можете попросить сделать доставку почтоматом, в этом случае ваши данные не требуются, сохраняем анонимность клиента</p>
            </div>
          </div>
          
          <div className={styles.finalCta}>
            <a href="https://t.me/Vapehub_operator" target="_blank" rel="noopener noreferrer" className={styles.orderButton}>
              Оформить заказ
            </a>
          </div>
        </>
      )
    }
  ];
  
  // Обработчик клика по шагу
  const toggleStep = (id) => {
    setActiveStep(activeStep === id ? null : id);
  };
  
  return (
    <div className={styles.purchasePage} ref={containerRef}>
      <div className={styles.backgroundElements}></div>
      
      <motion.div 
        className={styles.contentContainer}
        style={{ y, opacity }}
      >
        <motion.div 
          className={styles.pageHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.pageTitle}>Осуществление покупки</h1>
          <p className={styles.pageSubtitle}>
            Простой и удобный процесс заказа с доставкой в любой город
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.processTimeline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {purchaseSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`${styles.timelineStep} ${activeStep === step.id ? styles.activeStep : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.timelineHeader} onClick={() => toggleStep(step.id)}>
                <div className={styles.stepNumber}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <div className={styles.number}>{step.id}</div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <div className={styles.stepToggle}>
                  <motion.div
                    animate={{ rotate: activeStep === step.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaAngleRight />
                  </motion.div>
                </div>
              </div>
              
              <AnimatePresence>
                {activeStep === step.id && (
                  <motion.div
                    className={styles.stepContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.contentInner}>
                      {step.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Линия соединяющая шаги (кроме последнего) */}
              {index < purchaseSteps.length - 1 && (
                <div className={styles.timelineConnector}>
                  <div className={styles.connectorLine}></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.contactSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2>Нужна помощь с заказом?</h2>
          <p>Наш менеджер готов ответить на все ваши вопросы и помочь с оформлением заказа</p>
          <a href="https://t.me/Vapehub_operator" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
            Связаться с менеджером
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PurchasePage;
