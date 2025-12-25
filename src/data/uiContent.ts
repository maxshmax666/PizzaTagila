import type { CartItem } from '../core/cart';

export type MenuCategory = 'Все' | 'Классика' | 'Острые' | 'Веган' | 'Хит';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  category: MenuCategory;
  badge?: string;
  tag?: string;
  spicy?: boolean;
  image: string;
  gallery?: string[];
}

export interface PromotionCard {
  id: string;
  title: string;
  description: string;
  badge?: string;
  tone: 'orange' | 'green' | 'red';
  image?: string;
}

export const menuCategories: MenuCategory[] = ['Все', 'Классика', 'Острые', 'Веган', 'Хит'];

const buildGallery = (baseName: string, count: number) =>
  Array.from({ length: count }, (_, index) => `/assets/${baseName}${index + 1}.jpg`);

const margaritaGallery = buildGallery('margarita', 3);
const fourCheeseGallery = buildGallery('4cheese', 2);

export const menuItems: MenuItem[] = [
  {
    id: 'nectar',
    name: 'Нектар в сырном',
    description: 'Карамельное тесто, двойной сыр и сладкий соус.',
    price: 690,
    size: '25 см',
    category: 'Классика',
    badge: 'ХИТ',
    tag: 'Тонкое',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'pepperoni',
    name: 'Пепперони',
    description: 'Классические колбаски, моцарелла и фирменный соус.',
    price: 690,
    size: '25 см',
    category: 'Острые',
    spicy: true,
    tag: 'С перцем',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'margarita',
    name: 'Маргарита',
    description: 'Домашний соус, базилик, томаты и нежная моцарелла.',
    price: 540,
    size: '25 см',
    category: 'Веган',
    tag: 'Лёгкая',
    image: margaritaGallery[0],
    gallery: margaritaGallery,
  },
  {
    id: 'barbeque',
    name: 'Барбекю',
    description: 'Копчёный бекон, говядина, BBQ-соус и карамельный лук.',
    price: 720,
    size: '30 см',
    category: 'Хит',
    badge: 'СЫТНО',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'veggie',
    name: 'Веган гриль',
    description: 'Овощи гриль, соус песто и лёгкая сырная корочка.',
    price: 610,
    size: '25 см',
    category: 'Веган',
    badge: 'NEW',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'four-cheese',
    name: 'Четыре сыра',
    description: 'Моцарелла, дорблю, пармезан и сливочный соус.',
    price: 740,
    size: '30 см',
    category: 'Классика',
    badge: 'ТОП',
    image: fourCheeseGallery[0],
    gallery: fourCheeseGallery,
  },
  {
    id: 'hunting',
    name: 'Охотничья',
    description: 'Колбаски, бекон, огурчики и тягучий сыр.',
    price: 760,
    size: '30 см',
    category: 'Хит',
    badge: 'СЫТНО',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'diablo',
    name: 'Диабло',
    description: 'Острый соус, салями, перец чили и халапеньо.',
    price: 780,
    size: '30 см',
    category: 'Острые',
    spicy: true,
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'pesto',
    name: 'Песто',
    description: 'Соус песто, томаты черри и свежий базилик.',
    price: 640,
    size: '25 см',
    category: 'Веган',
    badge: 'NEW',
    image: '/assets/pizza-hero.svg',
  },
];

export const initialCart: CartItem[] = [
  { id: 'pepperoni', name: 'Пепперони', price: 690, size: '25 см', quantity: 1, image: '/assets/pizza-hero.svg' },
  { id: 'barbeque', name: 'Барбекю', price: 720, size: '30 см', quantity: 1, image: '/assets/pizza-hero.svg' },
];

export const promotions: PromotionCard[] = [
  {
    id: 'welcome',
    title: 'Скидка -10% на первый заказ',
    description: 'Первый заказ — скидка 10% при оплате онлайн.',
    badge: '10%',
    tone: 'orange',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'gift',
    title: 'Подарок при заказе от 2550 ₽',
    description: 'Тёплый десерт положим в подарок.',
    badge: 'Подарок',
    tone: 'green',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'hit',
    title: 'Хит недели',
    description: 'Пепперони, extra сыр и чесночный бортик.',
    tone: 'red',
    badge: 'ХИТ',
    image: '/assets/pizza-hero.svg',
  },
];

export const loyaltyHighlights = [
  'Бережная доставка на местные адреса',
  'Скидка за социальные контакты',
  'Баллы за каждый заказ',
];

export const deliverySlots = [
  { label: 'Сегодня', window: '17:00–25:00' },
  { label: 'Завтра', window: '12:00–22:00' },
];

export const deliverySummary = {
  featured: 'pepperoni',
  eta: '15:00 · сейчас',
  address: 'ул. Сенованная, д. 25',
  price: 690,
  weight: '55 г х',
};

export const accountShortcuts = [
  { id: 'phone', label: '+7 (902) 123-45-44', action: 'Изменить' },
  { id: 'address', label: 'ул. Сенная, д. 25', action: 'Сохранён' },
  { id: 'history', label: 'История заказов', action: 'Открыть' },
  { id: 'loyalty', label: 'Программа лояльности', action: 'Перейти' },
];

export const contactInfo = {
  phone: '+7 (902) 123-45-67',
  address: 'Нижний Тагил, ул. Сенованная, д. 25',
  schedule: 'Ежедневно 10:00–23:00',
  email: 'hello@pizza-tagil.ru',
};

export const offerPoints = [
  'Работаем по публичной оферте: аккуратная доставка и безопасная оплата.',
  'Минимальная сумма заказа — 550 ₽, доставка 99 ₽ по городу.',
  'Оплата онлайн или картой курьеру, персональные данные храним бережно.',
];

export const contactLinks = [
  { id: 'phone', label: '+7 (992) 123-45-44', action: 'Позвонить', href: 'tel:+79921234544' },
  { id: 'address', label: 'ул. Сенованная, д. 25', action: 'Открыть на карте', href: 'https://yandex.ru/maps' },
  { id: 'support', label: 'Поддержка', action: 'help@pizza-tagil.ru', href: 'mailto:help@pizza-tagil.ru' },
];
