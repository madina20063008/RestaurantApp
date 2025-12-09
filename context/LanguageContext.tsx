
// context/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'uz' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    search: 'Search',
    orders: 'Orders',
    favorites: 'Favorites',
    profile: 'Profile',
    // Common
    getStarted: 'Get Started',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    continueWith: 'Or continue with',
    // Onboarding
    onboarding1Title: 'Discover local restaurants',
    onboarding1Desc: 'Explore hundreds of restaurants and cuisines in your area',
    onboarding2Title: 'Order in minutes',
    onboarding2Desc: 'Quick and easy ordering with just a few taps',
    onboarding3Title: 'Track your order live',
    onboarding3Desc: 'Real-time tracking from kitchen to your doorstep',
    // Home
    searchFood: 'Search for food...',
    popularNearYou: 'Popular Near You',
    categories: 'Categories',
    featured: 'Featured Restaurants',
    // Restaurant
    menu: 'Menu',
    reviews: 'Reviews',
    info: 'Info',
    addToCart: 'Add to Cart',
    appetizers: 'Appetizers',
    mains: 'Main Courses',
    desserts: 'Desserts',
    drinks: 'Drinks',
    // Cart
    cart: 'Shopping Cart',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    tax: 'Tax',
    total: 'Total',
    checkout: 'Checkout',
    emptyCart: 'Your cart is empty',
    emptyCartDesc: 'Hungry? Browse menu and add items',
    promoCode: 'Promo Code',
    apply: 'Apply',
    // Checkout
    address: 'Address',
    payment: 'Payment',
    review: 'Review',
    placeOrder: 'Place Order',
    cardPayment: 'Card Payment',
    applePay: 'Apple Pay',
    cashOnDelivery: 'Cash on Delivery',
    // Order
    orderConfirmed: 'Order Confirmed!',
    estimatedDelivery: 'Estimated Delivery',
    trackOrder: 'Track Order',
    orderAgain: 'Order Again',
    // Profile
    editProfile: 'Edit Profile',
    settings: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    logout: 'Logout',
    // Legal
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    accept: 'Accept',
    lastUpdated: 'Last updated',
    // Errors
    noRestaurants: 'No restaurants nearby?',
    tryBroadening: 'Try broadening your search',
    retry: 'Retry',
    // Categories
    pizza: 'Pizza',
    burgers: 'Burgers',
    asian: 'Asian',
    italian: 'Italian',
    mexican: 'Mexican',
    healthy: 'Healthy',
    // Time
    min: 'min',
    mins: 'mins',
    // Rating
    rating: 'Rating',
    // Currency
    currency: '$',
  },
  uz: {
    // Navigation
    home: 'Uy',
    search: 'Qidirish',
    orders: 'Buyurtmalar',
    favorites: 'Sevimlilar',
    profile: 'Profil',
    // Common
    getStarted: 'Boshlash',
    login: 'Kirish',
    signup: 'Ro\'yxatdan o\'tish',
    email: 'Elektron pochta',
    password: 'Parol',
    forgotPassword: 'Parolni unutdingizmi?',
    continueWith: 'Yoki davom eting',
    // Onboarding
    onboarding1Title: 'Mahalliy restoranlarni kashf eting',
    onboarding1Desc: 'Hududingizdagi yuzlab restoran va taomlarni kashf qiling',
    onboarding2Title: 'Daqiqalarda buyurtma bering',
    onboarding2Desc: 'Bir necha bosish bilan tez va oson buyurtma',
    onboarding3Title: 'Buyurtmani jonli kuzatib boring',
    onboarding3Desc: 'Oshxonadan eshigigizgacha real vaqt kuzatuvi',
    // Home
    searchFood: 'Taom qidirish...',
    popularNearYou: 'Yaqin atrofda mashhur',
    categories: 'Kategoriyalar',
    featured: 'Tavsiya etilgan restoranlar',
    // Restaurant
    menu: 'Menyu',
    reviews: 'Sharhlar',
    info: 'Ma\'lumot',
    addToCart: 'Savatga qo\'shish',
    appetizers: 'Ishtaha ochuvchilar',
    mains: 'Asosiy taomlar',
    desserts: 'Shirinliklar',
    drinks: 'Ichimliklar',
    // Cart
    cart: 'Savat',
    subtotal: 'Oraliq summa',
    deliveryFee: 'Yetkazib berish',
    tax: 'Soliq',
    total: 'Jami',
    checkout: 'To\'lov',
    emptyCart: 'Savatingiz bo\'sh',
    emptyCartDesc: 'Ochmisiz? Menyuni ko\'ring va mahsulot qo\'shing',
    promoCode: 'Promo kod',
    apply: 'Qo\'llash',
    // Checkout
    address: 'Manzil',
    payment: 'To\'lov',
    review: 'Ko\'rib chiqish',
    placeOrder: 'Buyurtma berish',
    cardPayment: 'Karta to\'lovi',
    applePay: 'Apple Pay',
    cashOnDelivery: 'Naqd to\'lov',
    // Order
    orderConfirmed: 'Buyurtma tasdiqlandi!',
    estimatedDelivery: 'Taxminiy yetkazish',
    trackOrder: 'Buyurtmani kuzatish',
    orderAgain: 'Yana buyurtma berish',
    // Profile
    editProfile: 'Profilni tahrirlash',
    settings: 'Sozlamalar',
    language: 'Til',
    notifications: 'Bildirishnomalar',
    logout: 'Chiqish',
    // Legal
    privacyPolicy: 'Maxfiylik siyosati',
    termsConditions: 'Shartlar va qoidalar',
    accept: 'Qabul qilish',
    lastUpdated: 'Oxirgi yangilanish',
    // Errors
    noRestaurants: 'Yaqin atrofda restoran yo\'q?',
    tryBroadening: 'Qidiruvni kengaytiring',
    retry: 'Qayta urinish',
    // Categories
    pizza: 'Pitssa',
    burgers: 'Burgerlar',
    asian: 'Osiyo taomlari',
    italian: 'Italyan taomlari',
    mexican: 'Meksika taomlari',
    healthy: 'Sog\'lom ovqat',
    // Time
    min: 'daq',
    mins: 'daq',
    // Rating
    rating: 'Reyting',
    // Currency
    currency: 'som',
  },
  ru: {
    // Navigation
    home: 'Главная',
    search: 'Поиск',
    orders: 'Заказы',
    favorites: 'Избранное',
    profile: 'Профиль',
    // Common
    getStarted: 'Начать',
    login: 'Войти',
    signup: 'Регистрация',
    email: 'Эл. почта',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    continueWith: 'Или продолжите с',
    // Onboarding
    onboarding1Title: 'Откройте местные рестораны',
    onboarding1Desc: 'Исследуйте сотни ресторанов и кухонь в вашем районе',
    onboarding2Title: 'Закажите за минуты',
    onboarding2Desc: 'Быстрый и простой заказ всего за несколько нажатий',
    onboarding3Title: 'Отслеживайте заказ в реальном времени',
    onboarding3Desc: 'Отслеживание в реальном времени от кухни до вашей двери',
    // Home
    searchFood: 'Поиск еды...',
    popularNearYou: 'Популярное рядом',
    categories: 'Категории',
    featured: 'Рекомендуемые рестораны',
    // Restaurant
    menu: 'Меню',
    reviews: 'Отзывы',
    info: 'Инфо',
    addToCart: 'В корзину',
    appetizers: 'Закуски',
    mains: 'Основные блюда',
    desserts: 'Десерты',
    drinks: 'Напитки',
    // Cart
    cart: 'Корзина',
    subtotal: 'Промежуточный итог',
    deliveryFee: 'Доставка',
    tax: 'Налог',
    total: 'Итого',
    checkout: 'Оформить заказ',
    emptyCart: 'Ваша корзина пуста',
    emptyCartDesc: 'Голодны? Просмотрите меню и добавьте товары',
    promoCode: 'Промо код',
    apply: 'Применить',
    // Checkout
    address: 'Адрес',
    payment: 'Оплата',
    review: 'Проверка',
    placeOrder: 'Сделать заказ',
    cardPayment: 'Оплата картой',
    applePay: 'Apple Pay',
    cashOnDelivery: 'Наличными',
    // Order
    orderConfirmed: 'Заказ подтвержден!',
    estimatedDelivery: 'Ориентировочная доставка',
    trackOrder: 'Отследить заказ',
    orderAgain: 'Заказать снова',
    // Profile
    editProfile: 'Редактировать профиль',
    settings: 'Настройки',
    language: 'Язык',
    notifications: 'Уведомления',
    logout: 'Выйти',
    // Legal
    privacyPolicy: 'Политика конфиденциальности',
    termsConditions: 'Условия и положения',
    accept: 'Принять',
    lastUpdated: 'Последнее обновление',
    // Errors
    noRestaurants: 'Ресторанов поблизости нет?',
    tryBroadening: 'Расширьте поиск',
    retry: 'Повторить',
    // Categories
    pizza: 'Пицца',
    burgers: 'Бургеры',
    asian: 'Азиатская кухня',
    italian: 'Итальянская кухня',
    mexican: 'Мексиканская кухня',
    healthy: 'Здоровая еда',
    // Time
    min: 'мин',
    mins: 'мин',
    // Rating
    rating: 'Рейтинг',
    // Currency
    currency: '₽',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// SAFER version that doesn't throw error
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  // If context is not available (shouldn't happen with our setup), return a safe fallback
  if (context === undefined) {
    console.warn('useLanguage called outside LanguageProvider - using fallback');
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => translations['en'][key] || key,
    };
  }
  
  return context;
}

// Original version that throws error (optional)
export function useLanguageStrict() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageStrict must be used within a LanguageProvider');
  }
  return context;
}