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
  FaFilter,
  FaTimes,
  FaExchangeAlt,
  FaHeart,
  FaArrowRight,
  FaShieldAlt,
  FaFlask,
  FaThumbsUp
} from 'react-icons/fa';

// Import your product images here
import stiiizyImage from '../../assets/products/stiizy3.png';
import bigChiefImage from '../../assets/products/bigchief.png';
import curepenImage from '../../assets/products/cure.png';
import muhaImage from '../../assets/products/muha.png';

import sourdiesel from  '../../assets/products/stiizy/sour-diesel.webp'
import lemonhaze from  '../../assets/products/stiizy/lemon-haze.webp'
import strawnana from  '../../assets/products/stiizy/strawnana.webp'
import gelato from  '../../assets/products/stiizy/gellato.png'
import skywalkerog from  '../../assets/products/stiizy/skywalker-og.png'
import purplepunch from  '../../assets/products/stiizy/purple-punch.png'
import ogkush from  '../../assets/products/stiizy/og-kush.png'

import ak47 from  '../../assets/products/bigchief/ak-47.png'
import applefritter from  '../../assets/products/bigchief/apple-fritter.png'
import chiefof from  '../../assets/products/bigchief/chiefof.png'
import greencrack from  '../../assets/products/bigchief/green-crack.png'
import jackherer from  '../../assets/products/bigchief/jack-herer.png'
import strawnanabc from  '../../assets/products/bigchief/strawnana-bc.png'

import banana from  '../../assets/products/curepen/banana.png'
import calio from  '../../assets/products/curepen/cali-o.png'
import gelatopen from  '../../assets/products/curepen/gelato.png'
import jillybeam from  '../../assets/products/curepen/jillybeam.png'
import kinglouis from  '../../assets/products/curepen/kinglouis.png'
import superlemon from  '../../assets/products/curepen/superlemon.png'
import threeekings from  '../../assets/products/curepen/threeekings.jpg'


// Strain images - these would be your actual strain images
const strainImages = {
  // STIIIZY strains
  'sour-diesel':sourdiesel,
  'lemon-haze': lemonhaze,
  'strawnana': strawnana,
  'gelato': gelato,
  'skywalker-og': skywalkerog,
  'purple-punch':purplepunch,
  'og-kush': ogkush,
  
  // BIG CHIEF strains
  'ak-47': ak47,
  'jack-herer': jackherer,
  'apple-fritter': applefritter,
  'green-crack':greencrack,
  'strawnana-bc':strawnanabc,
  'chief-og': chiefof,
  
  // CURE PEN strains
  'cali-o': calio,
  'super-lemon-haze': superlemon,
  'king-louis-og':kinglouis,
  'banana-sherbet': banana,
  'gelato-cure': gelatopen,
  'jillybean': jillybeam,
  'three-kings':threeekings,
  
  // MUHA MEDS strains
  'super-silver-haze': 'https://images.unsplash.com/photo-1586729168741-c6e84a423c3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'strawberry-cough': 'https://images.unsplash.com/photo-1603026207572-06bb7bc6435f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'super-sour-diesel': 'https://images.unsplash.com/photo-1517578701290-16fa3deb8bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'skywalker-og-muha': 'https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'watermelon-og': 'https://images.unsplash.com/photo-1563122289-5a59ccc62739?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'garlic-jelly': 'https://images.unsplash.com/photo-1599719500956-d499f869d2d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'berry-gelato': 'https://images.unsplash.com/photo-1600019542480-4d4fc530281e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'donny-burger': 'https://images.unsplash.com/photo-1538681081798-d00972448fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'mango-madness': 'https://images.unsplash.com/photo-1594232352231-11dbe41cd46b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
};

// Placeholder for brand images
const placeholderImages = {
  stiiizy: stiiizyImage,
  bigChief: bigChiefImage,
  curepen: curepenImage,
  muha: muhaImage
};

const ShopPage = () => {
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailStrain, setDetailStrain] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedStrains, setComparedStrains] = useState([]);
  const [favoriteStrains, setFavoriteStrains] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    search: '',
    sortBy: 'name'
  });
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const [featuredStrains, setFeaturedStrains] = useState([]);

  // Determine featured strains on initialization
  useEffect(() => {
    // Select random strains from each brand for the featured section
    const featured = [];
    
    brands.forEach(brand => {
      if (brand.strains && brand.strains.length > 0) {
        const randomIndex = Math.floor(Math.random() * brand.strains.length);
        const strain = {
          ...brand.strains[randomIndex],
          brandId: brand.id,
          brandName: brand.name
        };
        featured.push(strain);
      }
    });
    
    // Only keep 4 random featured strains
    setFeaturedStrains(featured.sort(() => 0.5 - Math.random()).slice(0, 4));
  }, []);

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDetailModalOpen(false);
      }
    };

    if (detailModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detailModalOpen]);

  // Scroll to expanded section when a brand is clicked
  useEffect(() => {
    if (expandedBrand && containerRef.current) {
      const element = document.getElementById(`brand-${expandedBrand}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [expandedBrand]);

  // Brand data with an added isFeatured property for some strains
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
          cbd: '2%',
          description: 'Легендарная сатива с резким дизельным ароматом и лёгкими цитрусовыми нотками.',
          effects: ['Быстрый бодряк', 'Энергия, фокус, подъём', 'Идеально на день'],
          flavor: 'Цитрусовый с дизельными нотками',
          potency: 9,
          mood: ['Креативный', 'Общительный', 'Энергичный'],
          isFeatured: true,
          awards: ['High Times Cup 2019']
        },
        {
          id: 'lemon-haze',
          name: 'Lemon Haze',
          type: 'sativa',
          thc: '88%',
          cbd: '1%',
          description: 'Цитрусовый аромат и освежающий вкус лимона. Классика бодрой сативы.',
          effects: ['Вдохновляет', 'Очищает голову', 'Подходит для дел и общения'],
          flavor: 'Яркий лимонный с нотками сладости',
          potency: 8,
          mood: ['Фокусированный', 'Приподнятый', 'Творческий'],
          awards: []
        },
        {
          id: 'strawnana',
          name: 'Strawnana',
          type: 'hybrid',
          thc: '91%',
          cbd: '0.5%',
          description: 'Сладкий вкус клубники с бананом, приятный аромат и сбалансированный эффект.',
          effects: ['Лёгкая эйфория', 'Мягкое расслабление без «пришибленности»', 'Универсальный вариант'],
          flavor: 'Сладкий фруктовый микс клубники и банана',
          potency: 8.5,
          mood: ['Расслабленный', 'Счастливый', 'Общительный'],
          awards: []
        },
        {
          id: 'gelato',
          name: 'Gelato',
          type: 'hybrid',
          thc: '92%',
          cbd: '0.8%',
          description: 'Кремово-десертный гибрид с лёгкой цитрусовой горчинкой. Очень ароматный и насыщенный.',
          effects: ['Уравновешивает', 'Настраивает на позитив', 'Отлично на вечер'],
          flavor: 'Сладкий десертный с нотками ягод и мяты',
          potency: 9,
          mood: ['Эйфорический', 'Счастливый', 'Расслабленный'],
          isFeatured: true,
          awards: ['Emerald Cup 2018']
        },
        {
          id: 'skywalker-og',
          name: 'Skywalker OG',
          type: 'indica',
          thc: '93%',
          cbd: '1.2%',
          description: 'Плотный аромат хвои и специй, глубокое индика-расслабление.',
          effects: ['Успокаивает тело и ум', 'Уносит стресс', 'Засыпаешь как младенец'],
          flavor: 'Землистый с нотками специй и сосны',
          potency: 9.5,
          mood: ['Расслабленный', 'Сонный', 'Спокойный'],
          awards: []
        },
        {
          id: 'purple-punch',
          name: 'Purple Punch',
          type: 'indica',
          thc: '94%',
          cbd: '0.5%',
          description: 'Яркий ягодный вкус, сочный аромат и мягкий, но мощный седативный эффект.',
          effects: ['Убирает тревожность', 'Идеален для сна', 'Глубокий вечерний релакс'],
          flavor: 'Сладкий ягодный с нотками винограда',
          potency: 9.2,
          mood: ['Расслабленный', 'Счастливый', 'Сонный'],
          awards: ['Cannabis Cup 2020']
        },
        {
          id: 'og-kush',
          name: 'OG Kush',
          type: 'indica',
          thc: '92%',
          cbd: '1.5%',
          description: 'Знаменитая классика с землистым, цитрусово-пряным вкусом и мощным фоном.',
          effects: ['Быстрое снятие стресса', 'Ментальный релакс + телесное расслабление', 'Отличный выбор для конца дня'],
          flavor: 'Землистый с нотками цитрусовых и сосны',
          potency: 9,
          mood: ['Расслабленный', 'Счастливый', 'Умиротворенный'],
          isFeatured: true,
          awards: ['High Times Cup 2017', 'Cannabis Cup 2018']
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
          cbd: '0.8%',
          description: 'Сорт AK-47 обладает приятным сладким фруктовым вкусом с нотками хвои, сканка и сандала.',
          effects: ['Сильный сативный базз', 'Подходит для общения и творчества', 'Поднимает настроение'],
          flavor: 'Сладкий фруктовый с нотками хвои и сандала',
          potency: 9.2,
          mood: ['Энергичный', 'Креативный', 'Фокусированный'],
          awards: []
        },
        {
          id: 'jack-herer',
          name: 'Jack Herer',
          type: 'sativa',
          thc: '91%',
          cbd: '1.0%',
          description: 'Гибридный сорт с преобладанием сативы, классические землистые ноты, а во вкусе преобладают оттенки сладости и топлива.',
          effects: ['Ощущение счастья и полета', 'Радикальная борьба со стрессами', 'Ярко выраженная эйфория'],
          flavor: 'Землистый с нотками сладости и специй',
          potency: 9,
          mood: ['Эйфоричный', 'Креативный', 'Общительный'],
          isFeatured: true,
          awards: ['High Times Cup 2020']
        },
        {
          id: 'apple-fritter',
          name: 'Apple Fritter',
          type: 'indica',
          thc: '95%',
          cbd: '0.3%',
          description: 'Apple fritter имитирует вкус кондитерских изделий с добавлением едва уловимого сырного привкуса.',
          effects: ['Мощный и успокаивающий кайф', 'Сильнейшее расслабление по всему телу', 'Глубокий релакс'],
          flavor: 'Сырный яблочный пирог со сладостью и землистостью',
          potency: 9.5,
          mood: ['Расслабленный', 'Мечтательный', 'Сонный'],
          awards: ['Emerald Cup 2019']
        },
        {
          id: 'green-crack',
          name: 'Green Crack',
          type: 'indica',
          thc: '90%',
          cbd: '0.5%',
          description: 'Один из наиболее позитивных сортов марихуаны с преобладанием индики, заслуживший своё название благодаря необычному эйфорическому действию.',
          effects: ['Эйфория', 'Расслабление мускулатуры', 'Ощущение красоты окружающего мира'],
          flavor: 'Богатый фруктовый вкус (манго)',
          potency: 9,
          mood: ['Эйфоричный', 'Расслабленный', 'Счастливый'],
          awards: []
        },
        {
          id: 'strawnana-bc',
          name: 'Strawnana',
          type: 'hybrid',
          thc: '92%',
          cbd: '0.6%',
          description: 'Из-за высокого уровня ТГК сорт Strawberry Bannana обладает сильным гибридным эффектом.',
          effects: ['Энергия', 'Высокое внимание', 'Ясность мышления'],
          flavor: 'Клубнично-банановый микс с кремовыми нотками',
          potency: 9.2,
          mood: ['Сфокусированный', 'Энергичный', 'Счастливый'],
          awards: []
        },
        {
          id: 'chief-og',
          name: 'Chief OG',
          type: 'hybrid',
          thc: '88%',
          cbd: '1.2%',
          description: 'Эйфория от Chief OG так же восхитительна, как и звучит, она создает ощущение спокойствия и концентрации.',
          effects: ['Хорошее настроение', 'Ясный мозг', 'Блестящая умственная сила'],
          flavor: 'Кислый цитрусовый с нотками сосны',
          potency: 8.8,
          mood: ['Умиротворенный', 'Фокусированный', 'Счастливый'],
          awards: []
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
          cbd: '0.8%',
          description: 'Cali-O, или Калифорнийский апельсин, - это штамм старой школы, датируемый началом 1980-х годов.',
          effects: ['Оптимистичный', 'Ясный кайф', 'Прилив энергии'],
          flavor: 'Цитрусовые ароматы с нотками свежего апельсина',
          potency: 8.9,
          mood: ['Общительный', 'Энергичный', 'Счастливый'],
          awards: []
        },
        {
          id: 'super-lemon-haze',
          name: 'Super Lemon Haze',
          type: 'sativa',
          thc: '92%',
          cbd: '0.4%',
          description: 'Доминирующий сатива. Lemon Skunk и Super Silver Haze и двукратный обладатель Кубка каннабиса от Green House Seeds.',
          effects: ['Энергичный', 'Живой', 'Приподнятое настроение'],
          flavor: 'Пикантный, цитрусовый и сладкий',
          potency: 9.2,
          mood: ['Энергичный', 'Креативный', 'Эйфоричный'],
          isFeatured: true,
          awards: ['High Times Cup 2018', 'Cannabis Cup 2019']
        },
        {
          id: 'king-louis-og',
          name: 'King Louis OG',
          type: 'indica',
          thc: '93%',
          cbd: '1.0%',
          description: 'Штамм индики, выведенный из генетического позвоночника каннабиса Западного побережья, OG Kush.',
          effects: ['Глубокое расслабление', 'Снятие напряжения', 'Идеально на ночь'],
          flavor: 'Сосна, земляная и древесная',
          potency: 9.3,
          mood: ['Расслабленный', 'Сонный', 'Счастливый'],
          awards: ['Emerald Cup 2020']
        },
        {
          id: 'banana-sherbet',
          name: 'Banana Sherbet',
          type: 'hybrid',
          thc: '90%',
          cbd: '0.7%',
          description: 'Гибридный штамм со сладким и фруктовым ароматом.',
          effects: ['Расслабляющая эйфория', 'Целенаправленное творчество', 'Сбалансированное состояние'],
          flavor: 'Сладкий банановый с нотками шербета',
          potency: 9,
          mood: ['Расслабленный', 'Креативный', 'Счастливый'],
          awards: []
        },
        {
          id: 'gelato-cure',
          name: 'Gelato',
          type: 'hybrid',
          thc: '91%',
          cbd: '0.6%',
          description: 'Этот гибрид с несколькими наградами Cannabis Cup готов раскрыть творческий потенциал и обеспечить серьезное расслабление.',
          effects: ['Креативность', 'Расслабление', 'Эйфория'],
          flavor: 'Сладкий шербет с фруктовым черничным и апельсиновым вкусом',
          potency: 9.1,
          mood: ['Креативный', 'Расслабленный', 'Эйфоричный'],
          awards: ['Cannabis Cup 2019']
        },
        {
          id: 'jillybean',
          name: 'Jillybean',
          type: 'hybrid',
          thc: '88%',
          cbd: '0.5%',
          description: 'Гибридный штамм, который является лучшим выбором для творческих умов, ищущих идеальный эйфорический кайф в дневное время.',
          effects: ['Эйфорический кайф', 'Креативное мышление', 'Оптимистичное настроение'],
          flavor: 'Сладкий, цитрусовый и тропический',
          potency: 8.8,
          mood: ['Креативный', 'Энергичный', 'Счастливый'],
          awards: []
        },
        {
          id: 'three-kings',
          name: 'Three Kings',
          type: 'hybrid',
          thc: '90%',
          cbd: '0.8%',
          description: 'Гибрид, выведенный из всемогущих штаммов марихуаны - Headband, Sour Diesel и OG Kush.',
          effects: ['Серьезное расслабление', 'Эйфория', 'Баланс тела и ума'],
          flavor: 'Кислый с нотками дизеля и специй',
          potency: 9,
          mood: ['Расслабленный', 'Эйфоричный', 'Умиротворенный'],
          awards: []
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
          cbd: '0.6%',
          description: 'Классическая сатива с мощным бодрящим эффектом.',
          effects: ['Повышает концентрацию', 'Ускоряет мышление', 'Дневной заряд'],
          flavor: 'Цитрусовый с нотками специй и дыма',
          potency: 8.9,
          mood: ['Фокусированный', 'Энергичный', 'Креативный'],
          awards: []
        },
        {
          id: 'strawberry-cough',
          name: 'Strawberry Cough',
          type: 'sativa',
          thc: '87%',
          cbd: '0.5%',
          description: 'Поднимает настроение, даёт лёгкое, ясное и при этом уверенное состояние.',
          effects: ['Выход из замкнутого мышления', 'Лёгкость и энергия', 'Творческие задачи'],
          flavor: 'Сладкий клубничный с нотками земли',
          potency: 8.7,
          mood: ['Энергичный', 'Креативный', 'Фокусированный'],
          awards: [],
        },
        {
          id: 'super-sour-diesel',
          name: 'Super Sour Diesel',
          type: 'sativa',
          thc: '91%',
          cbd: '0.3%',
          description: 'Мощный прилив энергии, активное, немного хаотичное воодушевление.',
          effects: ['Энергия действия', 'Стимуляция идей', 'Активная коммуникация'],
          flavor: 'Дизельный с кислыми цитрусовыми нотками',
          potency: 9.1,
          mood: ['Энергичный', 'Эйфоричный', 'Общительный'],
          isFeatured: true,
          awards: ['High Times Cup 2021']
        },
        {
          id: 'skywalker-og-muha',
          name: 'Skywalker OG',
          type: 'indica',
          thc: '93%',
          cbd: '1.2%',
          description: 'Сорт полной перезагрузки — тяжёлый, глубокий, расслабляющий до костей.',
          effects: ['Перезагрузка', 'Снимает напряжение', 'Гасит тревогу'],
          flavor: 'Землистый с нотками сосны и специй',
          potency: 9.3,
          mood: ['Расслабленный', 'Сонный', 'Умиротворенный'],
          awards: ['Cannabis Cup 2019']
        },
        {
          id: 'watermelon-og',
          name: 'Watermelon OG',
          type: 'indica',
          thc: '88%',
          cbd: '0.7%',
          description: 'Мягкое и медитативное состояние. Не валит, а как бы растворяет в спокойствии.',
          effects: ['Медитативное состояние', 'Спокойствие', 'Релакс'],
          flavor: 'Сладкий арбузный с земляными нотками',
          potency: 8.8,
          mood: ['Расслабленный', 'Умиротворенный', 'Медитативный'],
          awards: []
        },
        {
          id: 'garlic-jelly',
          name: 'Garlic Jelly',
          type: 'indica',
          thc: '90%',
          cbd: '0.9%',
          description: 'Тяжёлый, уравновешивающий эффект, хороший антистресс.',
          effects: ['Заземление', 'Снятие стресса', 'Восстановление'],
          flavor: 'Сладкий с пряными и чесночными нотками',
          potency: 9,
          mood: ['Расслабленный', 'Спокойный', 'Восстановленный'],
          awards: []
        },
        {
          id: 'berry-gelato',
          name: 'Berry Gelato',
          type: 'hybrid',
          thc: '89%',
          cbd: '0.6%',
          description: 'Сбалансированное состояние "ясной головы и расслабленного тела".',
          effects: ['Комфорт', 'Хорошее настроение', 'Баланс'],
          flavor: 'Сладкий ягодный с кремовыми нотками',
          potency: 8.9,
          mood: ['Расслабленный', 'Счастливый', 'Сбалансированный'],
          awards: []
        },
        {
          id: 'donny-burger',
          name: 'Donny Burger',
          type: 'hybrid',
          thc: '92%',
          cbd: '0.7%',
          description: 'Медленно накрывает, приводит к состоянию внутреннего равновесия.',
          effects: ['Внутреннее равновесие', 'Тепло и мягкость', 'Умиротворение'],
          flavor: 'Пряный с нотками специй и сладости',
          potency: 9.2,
          mood: ['Умиротворенный', 'Расслабленный', 'Счастливый'],
          awards: ['Emerald Cup 2020']
        },
        {
          id: 'mango-madness',
          name: 'Mango Madness',
          type: 'hybrid',
          thc: '88%',
          cbd: '0.5%',
          description: 'Чёткий гибрид: лёгкое приподнятое настроение, спокойствие без сонливости.',
          effects: ['Приподнятое настроение', 'Спокойствие', 'Универсальность'],
          flavor: 'Сладкий манговый с тропическими нотками',
          potency: 8.8,
          mood: ['Счастливый', 'Спокойный', 'Сосредоточенный'],
          awards: []
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
      sessions: '50-60',
      color: '#4CAF50',
      most_popular: false
    },
    {
      id: '1.3ml',
      size: '1.3 мл',
      price: '14.000₽',
      puffs: '550-600',
      sessions: '80-90',
      color: '#2E7D32',
      most_popular: true
    },
    {
      id: '2.2ml',
      size: '2.2 мл',
      price: '17.000₽',
      puffs: '1000-1100',
      sessions: '160-200',
      color: '#1B5E20',
      most_popular: false
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
        strain.description.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
        strain.flavor.toLowerCase().includes(activeFilters.search.toLowerCase());
      
      return typeMatch && searchMatch;
    }).sort((a, b) => {
      // Sort based on activeFilters.sortBy
      switch(activeFilters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'potency':
          return b.potency - a.potency;
        case 'thc':
          return parseFloat(b.thc) - parseFloat(a.thc);
        default:
          return 0;
      }
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
    setCompareMode(false);
    setComparedStrains([]);
  };

  // Toggle strain selection
  const toggleStrain = (strainId) => {
    if (compareMode) {
      // In compare mode, add/remove strain from comparison
      if (comparedStrains.includes(strainId)) {
        setComparedStrains(comparedStrains.filter(id => id !== strainId));
      } else if (comparedStrains.length < 3) {
        setComparedStrains([...comparedStrains, strainId]);
      }
    } else {
      // Normal mode - just toggle strain details
      setSelectedStrain(selectedStrain === strainId ? null : strainId);
    }
  };

  // Open strain detail modal
  const openStrainDetail = (strain, brandName) => {
    setDetailStrain({...strain, brandName});
    setDetailModalOpen(true);
  };

  // Toggle favorite strain
  const toggleFavorite = (strainId) => {
    if (favoriteStrains.includes(strainId)) {
      setFavoriteStrains(favoriteStrains.filter(id => id !== strainId));
    } else {
      setFavoriteStrains([...favoriteStrains, strainId]);
    }
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

  // Find strain by id across all brands
  const findStrainById = (strainId) => {
    for (const brand of brands) {
      const strain = brand.strains.find(s => s.id === strainId);
      if (strain) {
        return {
          ...strain,
          brandId: brand.id,
          brandName: brand.name
        };
      }
    }
    return null;
  };

  // Toggle compare mode
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setComparedStrains([]);
    setSelectedStrain(null);
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={styles.shopPage} ref={containerRef}>
      {/* Header Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>Breaking Bad</h1>
          <p className={styles.heroSubtitle}>
            Выберите из нашего премиального ассортимента продуктов высшего качества
          </p>
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className={styles.contentContainer}>
        {/* Featured Strains Section */}
        {featuredStrains.length > 0 && (
          <div className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Популярные сорта</h2>
              <p className={styles.sectionSubtitle}>Познакомьтесь с нашими самыми продаваемыми сортами</p>
            </div>
            
            <motion.div 
              className={styles.featuredGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredStrains.map((strain) => (
                <motion.div
                  key={strain.id}
                  className={styles.featuredCard}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => openStrainDetail(strain, strain.brandName)}
                >
                  <div className={styles.featuredImageContainer}>
                    <img 
                      src={strainImages[strain.id]} 
                      alt={strain.name}
                      className={styles.featuredImage}
                    />
                    <div 
                      className={styles.strainTypeBadge}
                      style={{ backgroundColor: getStrainTypeColor(strain.type) }}
                    >
                      {getStrainTypeName(strain.type)}
                    </div>
                  </div>
                  <div className={styles.featuredContent}>
                    <div className={styles.featuredHeader}>
                      <h3 className={styles.featuredName}>{strain.name}</h3>
                      <div className={styles.featuredBrand}>{strain.brandName}</div>
                    </div>
                    <div className={styles.featuredStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>THC:</span>
                        <span className={styles.statValue}>{strain.thc}</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>CBD:</span>
                        <span className={styles.statValue}>{strain.cbd}</span>
                      </div>
                    </div>
                    <p className={styles.featuredDescription}>{strain.description.length > 100 ? strain.description.substring(0, 100) + '...' : strain.description}</p>
                    <div className={styles.featuredTags}>
                      {strain.effects.slice(0, 2).map((effect, idx) => (
                        <div key={idx} className={styles.featuredTag}>{effect}</div>
                      ))}
                    </div>
                    <div className={styles.featuredFooter}>
                      <button className={styles.detailButton}>
                        Подробнее
                        <FaArrowRight className={styles.buttonIcon} />
                      </button>
                      <div className={styles.potencyIndicator} style={{ width: `${strain.potency * 10}%` }}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Brands Overview Section */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Наши бренды</h2>
          <p className={styles.sectionSubtitle}>Откройте для себя разнообразие наших премиальных картриджей</p>
        </div>

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
                <div className={styles.brandStats}>
                  <div className={styles.brandStat}>
                    <span>{brand.strains.length}</span>
                    <span>сортов</span>
                  </div>
                  <div className={styles.brandStat}>
                    <span>{brand.strains.filter(s => s.awards.length > 0).length}</span>
                    <span>награды</span>
                  </div>
                </div>
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
                    
                    <div className={styles.sortFilters}>
                      <div className={styles.filterLabel}>Сортировка:</div>
                      <select 
                        className={styles.sortSelect}
                        value={activeFilters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      >
                        <option value="name">По названию</option>
                        <option value="potency">По силе эффекта</option>
                        <option value="thc">По содержанию THC</option>
                      </select>
                    </div>
                    
                    <button 
                      className={`${styles.compareButton} ${compareMode ? styles.compareActive : ''}`}
                      onClick={toggleCompareMode}
                    >
                      <FaExchangeAlt />
                      {compareMode ? 'Отменить сравнение' : 'Сравнить сорта'}
                    </button>
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
                          className={`${styles.strainCard} 
                                     ${selectedStrain === strain.id ? styles.activeStrainCard : ''} 
                                     ${comparedStrains.includes(strain.id) ? styles.comparedStrainCard : ''}`}
                          onClick={() => toggleStrain(strain.id)}
                          variants={itemVariants}
                          whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                        >
                          <div 
                            className={styles.strainColorBar}
                            style={{ backgroundColor: getStrainTypeColor(strain.type) }}
                          ></div>
                          
                          <div className={styles.strainImageContainer}>
                            <img 
                              src={strainImages[strain.id]} 
                              alt={strain.name}
                              className={styles.strainImage}
                            />
                          </div>
                          
                          <div className={styles.strainContent}>
                            <div className={styles.strainHeader}>
                              <div className={styles.strainTitleArea}>
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
                              <button 
                                className={`${styles.favoriteButton} ${favoriteStrains.includes(strain.id) ? styles.favoriteActive : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(strain.id);
                                }}
                              >
                                <FaHeart />
                              </button>
                            </div>
                            
                            <div className={styles.strainDetails}>
                              <div className={styles.strainStatsRow}>
                                <div className={styles.thcContent}>
                                  <span className={styles.thcLabel}>THC:</span>
                                  <span className={styles.thcValue}>{strain.thc}</span>
                                </div>
                                <div className={styles.cbdContent}>
                                  <span className={styles.cbdLabel}>CBD:</span>
                                  <span className={styles.cbdValue}>{strain.cbd}</span>
                                </div>
                              </div>
                              
                              <p className={styles.strainDescription}>{strain.description}</p>
                              
                              <div className={styles.strainFlavor}>
                                <span className={styles.flavorLabel}>Вкус:</span>
                                <span className={styles.flavorText}>{strain.flavor}</span>
                              </div>
                              
                              {strain.awards.length > 0 && (
                                <div className={styles.strainAwards}>
                                  {strain.awards.map((award, idx) => (
                                    <div key={idx} className={styles.awardBadge}>
                                      <FaStar className={styles.awardIcon} />
                                      <span>{award}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {selectedStrain === strain.id && !compareMode && (
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
                                
                                <h4 className={styles.moodTitle}>Настроение:</h4>
                                <div className={styles.moodTags}>
                                  {strain.mood.map((mood, index) => (
                                    <div key={index} className={styles.moodTag}>{mood}</div>
                                  ))}
                                </div>
                                
                                <div className={styles.potencyMeter}>
                                  <h4 className={styles.potencyTitle}>Сила эффекта:</h4>
                                  <div className={styles.potencyBar}>
                                    <div 
                                      className={styles.potencyFill}
                                      style={{ width: `${strain.potency * 10}%` }}
                                    ></div>
                                  </div>
                                  <div className={styles.potencyValue}>{strain.potency} / 10</div>
                                </div>
                              </motion.div>
                            )}
                            
                            <div className={styles.strainActions}>
                              {compareMode ? (
                                <button 
                                  className={`${styles.compareSelectButton} ${comparedStrains.includes(strain.id) ? styles.compareSelectedButton : ''}`}
                                >
                                  {comparedStrains.includes(strain.id) ? (
                                    <>Выбрано для сравнения <FaCheck /></>
                                  ) : (
                                    <>Добавить к сравнению</>
                                  )}
                                </button>
                              ) : (
                                <button 
                                  className={styles.detailsButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openStrainDetail({...strain, brandName: brands.find(b => b.id === expandedBrand)?.name});
                                  }}
                                >
                                  {selectedStrain === strain.id ? 'Скрыть детали' : 'Подробнее'}
                                </button>
                              )}
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
                
                {/* Compare Section */}
                <AnimatePresence>
                  {compareMode && comparedStrains.length > 0 && (
                    <motion.div 
                      className={styles.compareSection}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className={styles.compareTitle}>Сравнение сортов</h3>
                      
                      <div className={styles.compareTable}>
                        <div className={styles.compareHeaderRow}>
                          <div className={styles.compareProperty}>Свойство</div>
                          {comparedStrains.map(strainId => {
                            const strain = findStrainById(strainId);
                            return (
                              <div key={strainId} className={styles.compareColumn}>
                                <div className={styles.compareStrainHeader}>
                                  <h4>{strain.name}</h4>
                                  <div 
                                    className={styles.compareStrainType}
                                    style={{ backgroundColor: getStrainTypeColor(strain.type) }}
                                  >
                                    {getStrainTypeName(strain.type)}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className={styles.compareRow}>
                          <div className={styles.compareProperty}>THC</div>
                          {comparedStrains.map(strainId => {
                            const strain = findStrainById(strainId);
                            return (
                              <div key={strainId} className={styles.compareValue}>
                                {strain.thc}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className={styles.compareRow}>
                          <div className={styles.compareProperty}>CBD</div>
                          {comparedStrains.map(strainId => {
                            const strain = findStrainById(strainId);
                            return (
                              <div key={strainId} className={styles.compareValue}>
                                {strain.cbd}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className={styles.compareRow}>
                          <div className={styles.compareProperty}>Вкус</div>
                          {comparedStrains.map(strainId => {
                            const strain = findStrainById(strainId);
                            return (
                              <div key={strainId} className={styles.compareValue}>
                                {strain.flavor}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className={styles.compareRow}>
                          <div className={styles.compareProperty}>Сила эффекта</div>
                          {comparedStrains.map(strainId => {
                            const strain = findStrainById(strainId);
                            return (
                              <div key={strainId} className={styles.compareValue}>
                                <div className={styles.comparePotency}>
                                  <div 
                                    className={styles.comparePotencyFill}
                                    style={{ width: `${strain.potency * 10}%` }}
                                  ></div>
                                </div>
                                <div>{strain.potency} / 10</div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className={styles.compareRow}>
                          <div className={styles.compareProperty}>Эффекты</div>
                          {comparedStrains.map(strainId => {
                            const strain = findStrainById(strainId);
                            return (
                              <div key={strainId} className={styles.compareValue}>
                                <div className={styles.compareEffects}>
                                  {strain.effects.map((effect, idx) => (
                                    <div key={idx} className={styles.compareEffect}>
                                      <FaCheck className={styles.compareCheckIcon} /> {effect}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className={styles.compareActions}>
                        <button 
                          className={styles.clearCompareButton}
                          onClick={() => setComparedStrains([])}
                        >
                          Очистить сравнение
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Pricing Section */}
                <div className={styles.pricingSection}>
                  <h3 className={styles.pricingTitle}>Варианты комплектации</h3>
                  
                  <div className={styles.packagesGrid}>
                    {pricePackages.map(pack => (
                      <div key={pack.id} className={`${styles.packageCard} ${pack.most_popular ? styles.popularPackage : ''}`}>
                        {pack.most_popular && (
                          <div className={styles.popularBadge}>Популярный выбор</div>
                        )}
                        <div 
                          className={styles.packageHeader}
                          style={{ 
                            background: pack.most_popular ? 
                              `linear-gradient(135deg, ${pack.color}, darken(${pack.color}, 10%))` : 
                              `linear-gradient(135deg, ${pack.color}, darken(${pack.color}, 15%))`
                          }}
                        >
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
            <FaShieldAlt className={styles.qualityIcon} />
            <span>Лабораторно протестировано</span>
          </div>
          <div className={styles.qualityItem}>
            <FaFlask className={styles.qualityIcon} />
            <span>Натуральные терпены</span>
          </div>
          <div className={styles.qualityItem}>
            <FaThumbsUp className={styles.qualityIcon} />
            <span>Доставка по всей России</span>
          </div>
        </div>
      </div>
      
      {/* Strain Detail Modal */}
      <AnimatePresence>
        {detailModalOpen && detailStrain && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetailModalOpen(false)}
          >
            <motion.div 
              className={styles.modalContent}
              ref={modalRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className={styles.closeModal}
                onClick={() => setDetailModalOpen(false)}
              >
                <FaTimes />
              </button>
              
              <div className={styles.modalHeader}>
                <div 
                  className={styles.modalStrainType}
                  style={{ backgroundColor: getStrainTypeColor(detailStrain.type) }}
                >
                  {getStrainTypeName(detailStrain.type)}
                </div>
                <h2 className={styles.modalTitle}>{detailStrain.name}</h2>
                <div className={styles.modalBrand}>{detailStrain.brandName}</div>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.modalImageSection}>
                  <div className={styles.modalImageContainer}>
                    <img 
                      src={strainImages[detailStrain.id]} 
                      alt={detailStrain.name}
                      className={styles.modalImage}
                    />
                  </div>
                  
                  <div className={styles.modalStats}>
                    <div className={styles.modalStat}>
                      <div className={styles.modalStatLabel}>THC</div>
                      <div className={styles.modalStatValue}>{detailStrain.thc}</div>
                    </div>
                    <div className={styles.modalStat}>
                      <div className={styles.modalStatLabel}>CBD</div>
                      <div className={styles.modalStatValue}>{detailStrain.cbd}</div>
                    </div>
                    <div className={styles.modalStat}>
                      <div className={styles.modalStatLabel}>Сила</div>
                      <div className={styles.modalStatValue}>{detailStrain.potency}/10</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.modalInfoSection}>
                  <div className={styles.modalInfoBlock}>
                    <h3 className={styles.modalInfoTitle}>Описание</h3>
                    <p className={styles.modalDescription}>{detailStrain.description}</p>
                  </div>
                  
                  <div className={styles.modalInfoBlock}>
                    <h3 className={styles.modalInfoTitle}>Вкус</h3>
                    <p className={styles.modalFlavor}>{detailStrain.flavor}</p>
                  </div>
                  
                  <div className={styles.modalInfoBlock}>
                    <h3 className={styles.modalInfoTitle}>Эффекты</h3>
                    <div className={styles.modalEffects}>
                      {detailStrain.effects.map((effect, index) => (
                        <div key={index} className={styles.modalEffectTag}>
                          <FaCheck className={styles.modalCheckIcon} />
                          <span>{effect}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.modalInfoBlock}>
                    <h3 className={styles.modalInfoTitle}>Настроение</h3>
                    <div className={styles.modalMoods}>
                      {detailStrain.mood.map((mood, index) => (
                        <div key={index} className={styles.modalMoodTag}>{mood}</div>
                      ))}
                    </div>
                  </div>
                  
                  {detailStrain.awards && detailStrain.awards.length > 0 && (
                    <div className={styles.modalInfoBlock}>
                      <h3 className={styles.modalInfoTitle}>Награды</h3>
                      <div className={styles.modalAwards}>
                        {detailStrain.awards.map((award, index) => (
                          <div key={index} className={styles.modalAwardBadge}>
                            <FaStar className={styles.awardIcon} />
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  className={`${styles.favoriteButtonLarge} ${favoriteStrains.includes(detailStrain.id) ? styles.favoriteActive : ''}`}
                  onClick={() => toggleFavorite(detailStrain.id)}
                >
                  <FaHeart />
                  {favoriteStrains.includes(detailStrain.id) ? 'В избранном' : 'Добавить в избранное'}
                </button>
                
                <a 
                  href="https://t.me/Vapehub_operator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.orderButtonLarge}
                >
                  <FaTelegramPlane />
                  Заказать сейчас
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;