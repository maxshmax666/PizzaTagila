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

export const menuItems: MenuItem[] = [
  {
    id: 'pepperoni',
    name: 'Пепперони',
    description: 'Колбаски пепперони, моцарелла и томатный соус на тонком тесте.',
    price: 690,
    size: '25 см',
    category: 'Классика',
    badge: 'ХИТ',
    spicy: true,
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'barbeque',
    name: 'Барбекю',
    description: 'Говядина, бекон, фирменный BBQ-соус и лук в карамели.',
    price: 690,
    size: '30 см',
    category: 'Хит',
    tag: 'Ран/Печь 30 см',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'margarita',
    name: 'Маргарита',
    description: 'Лёгкая томатная пицца с моцареллой и ароматным базиликом.',
    price: 540,
    size: '25 см',
    category: 'Веган',
    tag: 'Лёгкая',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'diablo',
    name: 'Острая Дьябло',
    description: 'Халапеньо, перец чили, пепперони и острый фирменный соус.',
    price: 720,
    size: '30 см',
    category: 'Острые',
    badge: 'НОВИНКА',
    spicy: true,
    image: '/assets/pizza-hero.svg',
  },
];

export const initialCart: CartItem[] = [
  { id: 'pepperoni', name: 'Пепперони', price: 690, size: '25 см', quantity: 1, image: '/assets/pizza-hero.svg' },
  { id: 'barbeque', name: 'Барбекю', price: 690, size: '30 см', quantity: 1, image: '/assets/pizza-hero.svg' },
];

export const promotions: PromotionCard[] = [
  {
    id: 'welcome',
    title: 'Скидка -10% на первый заказ',
    description: 'Нежнее, толще и с 10% при оплате онлайн.',
    badge: '10%',
    tone: 'orange',
    image: '/assets/pizza-hero.svg',
  },
  {
    id: 'gift',
    title: 'Подарок при заказе от 2550 ₽',
    description: 'Добавим десерт автоматически.',
    badge: 'Подарок',
    tone: 'green',
  },
  {
    id: 'hit',
    title: 'Хит недели',
    description: 'Пепперони, extra сыр и чесночный бортик.',
    tone: 'red',
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
