import type { CartItem } from '../core/cart';

export type MenuCategory =
  | 'Все'
  | 'Классические'
  | 'Фирменные'
  | 'Римские'
  | 'Сезонные'
  | 'Холодные'
  | 'Жареные'
  | 'Сладости'
  | 'Напитки';

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
  rating: number;
  cookTime: number;
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

export const menuCategories: MenuCategory[] = [
  'Классические',
  'Фирменные',
  'Римские',
  'Сезонные',
  'Холодные',
  'Жареные',
  'Сладости',
  'Напитки',
  'Все',
];

const hero = '/assets/background1.png';

export const menuItems: MenuItem[] = [
  {
    id: 'margarita',
    name: 'Маргарита',
    description: 'Томатный соус, моцарелла, свежий базилик',
    price: 499,
    size: '30 см',
    category: 'Классические',
    badge: 'Хит',
    rating: 4.8,
    cookTime: 25,
    image: hero,
  },
  {
    id: 'pepperoni',
    name: 'Пеперони',
    description: 'Соус, моцарелла, пепперони',
    price: 549,
    size: '30 см',
    category: 'Фирменные',
    badge: 'Топ',
    rating: 4.9,
    cookTime: 25,
    image: hero,
  },
  {
    id: 'cheese',
    name: '4 Сыра',
    description: 'Моцарелла, чеддер, пармезан, дор-блю',
    price: 599,
    size: '30 см',
    category: 'Римские',
    rating: 4.7,
    cookTime: 25,
    image: hero,
  },
  {
    id: 'mushroom',
    name: 'Грибная',
    description: 'Соус, моцарелла, шампиньоны',
    price: 529,
    size: '30 см',
    category: 'Сезонные',
    badge: 'Новинка',
    rating: 4.6,
    cookTime: 25,
    image: hero,
  },
  {
    id: 'meat',
    name: 'Мясная',
    description: 'Соус, моцарелла, ветчина, бекон, пепперони',
    price: 629,
    size: '30 см',
    category: 'Жареные',
    rating: 4.8,
    cookTime: 25,
    image: hero,
  },
  {
    id: 'caesar',
    name: 'Цезарь',
    description: 'Соус цезарь, курица, моцарелла, томаты',
    price: 579,
    size: '30 см',
    category: 'Фирменные',
    rating: 4.7,
    cookTime: 25,
    image: hero,
  },
];

export const initialCart: CartItem[] = [
  {
    id: 'pepperoni',
    name: 'Пеперони',
    price: 549,
    size: '30 см',
    quantity: 2,
    image: hero,
  },
  {
    id: 'margarita',
    name: 'Маргарита',
    price: 499,
    size: '30 см',
    quantity: 1,
    image: hero,
  },
];

export const promotions: PromotionCard[] = [
  {
    id: 'welcome',
    title: 'Скидка -10% на первый заказ',
    description: 'Первый заказ — скидка 10% при оплате онлайн.',
    badge: '10%',
    tone: 'orange',
    image: hero,
  },
  {
    id: 'gift',
    title: 'Подарок при заказе от 2550 ₽',
    description: 'Тёплый десерт положим в подарок.',
    badge: 'Подарок',
    tone: 'green',
    image: hero,
  },
  {
    id: 'hit',
    title: 'Хит недели',
    description: 'Пепперони, extra сыр и чесночный бортик.',
    tone: 'red',
    badge: 'ХИТ',
    image: hero,
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
  {
    id: 'address',
    label: 'ул. Сенованная, д. 25',
    action: 'Открыть на карте',
    href: 'https://yandex.ru/maps',
  },
  {
    id: 'support',
    label: 'Поддержка',
    action: 'help@pizza-tagil.ru',
    href: 'mailto:help@pizza-tagil.ru',
  },
];
