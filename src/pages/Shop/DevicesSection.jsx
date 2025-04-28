import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCheck, FaAngleRight, FaTelegramPlane, FaTimes, FaShoppingBag, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

// Замените на реальные пути к изображениям, когда они будут доступны
import stiiizyImage from '../../assets/products/stiiizyust.png';
import backwoodsImage from '../../assets/products/brassknuckles.png';
import heavyhittersImage from '../../assets/products/hevyhitter.png';

const DevicesSection = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  
  // Данные устройств
  const devices = [
    {
      id: 'stiiizy',
      name: 'STIIIZY',
      description: 'Стильный дизайн, удобный форм-фактор, передовая технология нагрева для стабильного вкуса и эффекта',
      image: stiiizyImage,
      badge: 'Популярный',
      color: '#4CAF50',
      features: [
        'Элегантный форм-фактор',
        'Усовершенствованная система нагрева',
        'Устойчивая батарея',
        'Премиальные материалы'
      ]
    },
    {
      id: 'backwoods',
      name: 'BACKWOODS',
      description: 'Популярный бренд с фирменным стилем, сочетающий традиции с современными технологиями',
      image: backwoodsImage,
      badge: 'Классика',
      color: '#6B46C1',
      features: [
        'Узнаваемый стиль',
        'Высокое качество исполнения',
        'Насыщенный вкус',
        'Длительное время работы'
      ]
    },
    {
      id: 'heavyhitters',
      name: 'HEAVYHITTERS',
      description: 'Классика среди вейпов, премиум качество и мощный эффект для настоящих ценителей',
      image: heavyhittersImage,
      badge: 'Премиум',
      color: '#E53E3E',
      features: [
        'Максимальная мощность',
        'Премиальная сборка',
        'Керамический нагревательный элемент',
        'Интенсивный эффект'
      ]
    }
  ];
  
  // Данные о ценах (общие для всех устройств)
  const pricePackages = [
    {
      id: '1ml',
      size: '1 мл',
      price: '13.000₽',
      puffs: '350-400 втяг',
      sessions: '50-60 раз плотного накура',
      color: '#4CAF50',
      most_popular: false
    },
    {
      id: '1.3ml',
      size: '1.3 мл',
      price: '14.000₽',
      puffs: '550-600 втяг',
      sessions: '80-90 раз плотного накура',
      color: '#2E7D32',
      most_popular: true
    },
    {
      id: '2.2ml',
      size: '2.2 мл',
      price: '17.000₽',
      puffs: '1000-1100 втяг',
      sessions: '160-200 раз плотного накура',
      color: '#1B5E20',
      most_popular: false
    }
  ];
  
  // Открыть модальное окно с деталями устройства
  const openDeviceModal = (device) => {
    setSelectedDevice(device);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
  };
  
  // Закрыть модальное окно
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
  };
  
  // Обработка клика вне модального окна для закрытия
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // На случай размонтирования компонента
    };
  }, [modalOpen]);
  
  // Анимационные варианты
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
  
  // Анимация для модального окна
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };
  
  return (
    <div className="devices-section">
      <div className="section-header">
        <div className="header-badge">Высокое качество</div>
        <h2 className="section-title">Наши устройства</h2>
        <p className="section-subtitle">Выберите подходящее устройство для вашего опыта</p>
      </div>
      
      <motion.div 
        className="devices-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {devices.map((device) => (
          <motion.div
            key={device.id}
            className="device-card"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            {device.badge && (
              <div className="device-badge" style={{ backgroundColor: device.color }}>
                {device.badge}
              </div>
            )}
            
            <div className="device-image-container">
              <div className="image-frame">
                <img 
                  src={device.image} 
                  alt={device.name}
                  className="device-image"
                />
                <div className="image-overlay" style={{ backgroundColor: `${device.color}22` }}></div>
              </div>
            </div>
            
            <div className="device-info">
              <h3 className="device-name">{device.name}</h3>
              <p className="device-description">{device.description}</p>
              
              <div className="device-features">
                {device.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="feature-tag" style={{ backgroundColor: `${device.color}15`, color: device.color }}>
                    <FaCheck className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className="device-details-button"
                onClick={() => openDeviceModal(device)}
                style={{ 
                  backgroundColor: device.color,
                }}
              >
                <span>Подробнее о ценах</span>
                <FaAngleRight className="button-icon" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Модальное окно для деталей устройства */}
      <AnimatePresence>
        {modalOpen && selectedDevice && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-container"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              ref={modalRef}
            >
              <button className="close-button" onClick={closeModal}>
                <FaTimes />
              </button>
              
              <div className="modal-header" style={{ backgroundColor: '#4CAF50' }}>
              <div className="modal-header-content">
                  <div className="modal-brand">{selectedDevice.badge}</div>
                  <h2 className="modal-title">{selectedDevice.name}</h2>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-device-info">
                  <div className="modal-image-container">
                    <img 
                      src={selectedDevice.image} 
                      alt={selectedDevice.name}
                      className="modal-image"
                    />
                  </div>
                  
                  <div className="modal-details">
                    <div className="modal-section">
                      <h3 className="modal-section-title">
                        <FaInfoCircle className="section-icon" style={{ color:  '#4CAF50' }} />
                        Особенности
                      </h3>
                      <div className="modal-features-list">
                        {selectedDevice.features.map((feature, index) => (
                          <div key={index} className="modal-feature-item">
                            <div className="feature-bullet" style={{ backgroundColor:  '#4CAF50' }}></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="modal-section">
                      <h3 className="modal-section-title">
                        <FaShoppingBag className="section-icon" style={{ color:  '#4CAF50' }} />
                        Цены на комплекты
                      </h3>
                      <div className="modal-prices">
                        {pricePackages.map((pack) => (
                          <div 
                            key={pack.id} 
                            className={`price-card ${pack.most_popular ? 'popular-price' : ''}`}
                            style={{ 
                              borderColor: pack.most_popular ?  '#4CAF50' : 'transparent',
                              backgroundColor: pack.most_popular ? `${ '#4CAF50'}10` : 'transparent' 
                            }}
                          >
                            {pack.most_popular && (
                              <div className="popular-tag" style={{ backgroundColor: '#4CAF50' }}>
                                Популярный
                              </div>
                            )}
                            <div className="price-size">
                              <div className="size-label">Объем</div>
                              <div className="size-value">{pack.size}</div>
                            </div>
                            <div className="price-value" style={{ color:  '#4CAF50' }}>
                              {pack.price}
                            </div>
                            <div className="price-details">
                              <div className="price-detail-item">
                                <FaCheckCircle className="detail-icon" style={{ color:  '#4CAF50' }} />
                                <span>{pack.puffs}</span>
                              </div>
                              <div className="price-detail-item">
                                <FaCheckCircle className="detail-icon" style={{ color:  '#4CAF50' }} />
                                <span>{pack.sessions}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pricing-info">
                      <div className="info-item">
                        <strong>Картридж отдельно</strong> — на <strong>1.000₽ дешевле</strong>
                      </div>
                      <div className="info-item">
                        <strong>Жидкость отдельно</strong> — <strong>4500₽ за 1 мл</strong>
                      </div>
                      <div className="info-item warning">
                        ⚠️ <strong>Минимальный заказ — 13.500₽</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <a 
                  href="https://t.me/Vapehub_operator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="order-button"
                  style={{ backgroundColor: '#4CAF50' }}
                >
                  <FaTelegramPlane className="button-icon" />
                  <span>Заказать через Telegram</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .devices-section {
          padding: 80px 0;
          background-color: #f8f9fa;
          position: relative;
          overflow: hidden;
        }
        
        .devices-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #4CAF50;
          z-index: 1;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
        }
        
        .header-badge {
          display: inline-block;
          padding: 5px 12px;
          background: rgba(76, 175, 80, 0.1);
          color: #4CAF50;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 20px;
          margin-bottom: 15px;
          border: 1px solid rgba(76, 175, 80, 0.2);
        }
        
        .section-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #4CAF50;
          border-radius: 3px;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .devices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .device-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .device-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 30px;
          z-index: 2;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .device-image-container {
          padding: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .image-frame {
          position: relative;
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 10px;
        }
        
        .device-image {
          max-height: 180px;
          max-width: 80%;
          object-fit: contain;
          z-index: 2;
          transition: transform 0.5s ease;
        }
        
        .device-card:hover .device-image {
          transform: scale(1.1) rotate(2deg);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .device-card:hover .image-overlay {
          opacity: 1;
        }
        
        .device-info {
          padding: 0 30px 30px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .device-name {
          font-size: 1.6rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
        }
        
        .device-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 20px;
          line-height: 1.6;
          flex-grow: 1;
        }
        
        .device-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }
        
        .feature-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .feature-icon {
          font-size: 0.7rem;
        }
        
        .device-details-button {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          border: none;
          color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .device-details-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 15px rgba(0, 0, 0, 0.15);
        }
        
        .button-icon {
          transition: transform 0.3s ease;
        }
        
        .device-details-button:hover .button-icon {
          transform: translateX(5px);
        }
        
        /* Модальное окно */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          backdrop-filter: blur(3px);
        }
        
        .modal-container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          max-width: 800px;
          width: 100%;
          max-height: 80vh;
          position: relative;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          margin: 80px auto auto;
        }
        
        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .close-button:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: rotate(90deg);
        }
        
        .modal-header {
          padding: 25px 25px;
          color: white;
          position: relative;
        }
        
        .modal-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(to top, white, transparent);
        }
        
        .modal-header-content {
          position: relative;
          z-index: 1;
        }
        
        .modal-brand {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 3px 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 10px;
        }
        
        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }
        
        .modal-body {
          padding: 0 30px 20px;
          overflow-y: auto;
        }
        
        .modal-device-info {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        
        .modal-image-container {
          flex: 0 0 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 20px;
          max-height: 350px;
        }
        
        .modal-image {
          max-width: 100%;
          max-height: 350px;
          object-fit: contain;
        }
        
        .modal-details {
          flex: 1;
          min-width: 300px;
        }
        
        .modal-section {
          margin-bottom: 30px;
        }
        
        .modal-section-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .section-icon {
          font-size: 1.1rem;
        }
        
        .modal-features-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .modal-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .feature-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .modal-prices {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
        }
        
        .price-card {
          padding: 20px;
          border-radius: 12px;
          position: relative;
          border: 2px solid;
          transition: all 0.3s ease;
        }
        
        .price-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }
        
        .popular-tag {
          position: absolute;
          top: -10px;
          right: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
        }
        
        .price-size {
          margin-bottom: 10px;
        }
        
        .size-label {
          font-size: 0.8rem;
          color: #777;
          margin-bottom: 3px;
        }
        
        .size-value {
          font-size: 1.6rem;
          font-weight: 700;
          color: #333;
        }
        
        .price-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 15px;
        }
        
        .price-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .price-detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #666;
        }
        
        .detail-icon {
          font-size: 0.8rem;
        }
        
        .pricing-info {
          margin-top: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        
        .info-item {
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: #555;
        }
        
        .info-item.warning {
          color: #E53E3E;
        }
        
        .modal-footer {
          padding: 20px 30px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: center;
        }
        
        .order-button {
          padding: 15px 30px;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          min-width: 300px;
          justify-content: center;
        }
        
        .order-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        /* Адаптивный дизайн */
        @media (max-width: 992px) {
          .devices-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
          
          .modal-device-info {
            flex-direction: column;
          }
          
          .modal-image-container {
            flex: 0 0 auto;
            max-width: 100%;
          }
          
          .modal-title {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .modal-features-list, .modal-prices {
            grid-template-columns: 1fr;
          }
          
          .modal-container {
            max-height: 85vh;
          }
          
          .modal-header {
            padding: 30px 20px;
          }
          
          .modal-body {
            padding: 0 20px 20px;
          }
          
          .order-button {
            width: 100%;
              padding: 15px 20px;
          }
        }
        
        @media (max-width: 480px) {
          .devices-grid {
            grid-template-columns: 1fr;
          }
          
          .device-image-container {
            padding: 20px;
          }
          
          .device-info {
            padding: 0 20px 20px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .modal-title {
            font-size: 1.6rem;
          }
          
          .close-button {
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default DevicesSection;