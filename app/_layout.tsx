// app/(main)/_layout.tsx (PROPERLY FIXED VERSION)
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LanguageProvider } from '@/context/LanguageContext';
import { NavigationProvider } from '@/context/NavigationContext';
import { CartProvider } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext'; // Import hooks here
import { useNavigation } from '@/context/NavigationContext'; // Import hooks here
import HomeScreen from '@/components/HomeScreen';
import SearchScreen from '@/components/SearchScreen';
import OrdersScreen from '@/components/OrdersScreen';
import FavoritesScreen from '@/components/FavoritesScreen';
import ProfileScreen from '@/components/ProfileScreen';
import RestaurantDetail from '@/components/RestaurantDetail'; 
import CartScreen from '@/components/CartScreen';
import CheckoutScreen from '@/components/CheckoutScreen';
import OrderConfirmation from '@/components/OrderConfirmation'; // Add this
import BackButton from '@/components/BackButton';
import BottomNavBar from '@/components/BottomNavBar';
import { Home, Search, Package, Heart, User } from 'lucide-react-native';

type MainScreen = 'home' | 'search' | 'orders' | 'favorites' | 'profile' | 'restaurant' | 'cart' | 'checkout' | 'confirmation';

// Inner component that uses the hooks - NOW WITH PROPER IMPORTS
function MainLayoutContent() {
  const { t } = useLanguage(); // Use the imported hook
  const { navigate, currentScreen } = useNavigation(); // Use the imported hook
  const [localScreen, setLocalScreen] = useState<MainScreen>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  // Sync with navigation context if available
  useEffect(() => {
    if (currentScreen && ['home', 'search', 'orders', 'favorites', 'profile', 'restaurant', 'cart', 'checkout', 'confirmation'].includes(currentScreen)) {
      setLocalScreen(currentScreen as MainScreen);
    }
  }, [currentScreen]);

  const navItems = [
    { id: 'home', icon: Home, label: t('home'), screen: 'home' as MainScreen },
    { id: 'search', icon: Search, label: t('search'), screen: 'search' as MainScreen },
    { id: 'orders', icon: Package, label: t('orders'), screen: 'orders' as MainScreen },
    { id: 'favorites', icon: Heart, label: t('favorites'), screen: 'favorites' as MainScreen },
    { id: 'profile', icon: User, label: t('profile'), screen: 'profile' as MainScreen },
  ];

  const handleNavigate = (screen: MainScreen) => {
    setLocalScreen(screen);
    navigate(screen);
  };

  const handleNavigateToRestaurant = (restaurant: any) => {
    console.log('MainLayout: Navigating to restaurant:', restaurant.name);
    setSelectedRestaurant(restaurant);
    setLocalScreen('restaurant');
    navigate('restaurant');
  };

  const handleGoBackFromRestaurant = () => {
    console.log('MainLayout: Going back from restaurant');
    setLocalScreen('home');
    setSelectedRestaurant(null);
    navigate('home');
  };

  // Show back button on non-main screens
  const showBackButton = ['restaurant', 'cart', 'checkout', 'confirmation'].includes(localScreen);

  // Show bottom nav only on main screens
  const showBottomNav = !['restaurant', 'cart', 'checkout', 'confirmation'].includes(localScreen);

  const renderScreen = () => {
    switch (localScreen) {
      case 'home':
        return <HomeScreen onNavigateToRestaurant={handleNavigateToRestaurant} />;
      case 'search':
        return <SearchScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'restaurant':
        return <RestaurantDetail 
          restaurant={selectedRestaurant} 
          onGoBack={handleGoBackFromRestaurant} 
        />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'confirmation': // Add confirmation
        return <OrderConfirmation />;
      default:
        return <HomeScreen onNavigateToRestaurant={handleNavigateToRestaurant} />;
    }
  };

  const handleBackPress = () => {
    if (localScreen === 'restaurant') {
      handleGoBackFromRestaurant();
    } else if (localScreen === 'cart') {
      setLocalScreen('home');
      navigate('home');
    } else if (localScreen === 'checkout') {
      setLocalScreen('cart');
      navigate('cart');
    } else if (localScreen === 'confirmation') {
      setLocalScreen('home');
      navigate('home');
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <BackButton onPress={handleBackPress} />
      )}

      <View style={styles.content}>
        {renderScreen()}
      </View>

      {showBottomNav && (
        <BottomNavBar
          items={navItems}
          currentScreen={localScreen}
          onNavigate={handleNavigate}
        />
      )}
    </View>
  );
}

// Wrap the inner component with all providers
export default function MainLayout() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <CartProvider>
          <MainLayoutContent />
        </CartProvider>
      </NavigationProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    position: 'relative',
  },
  content: {
    flex: 1,
  },
});