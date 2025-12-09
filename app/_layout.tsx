
// app/(main)/_layout.tsx
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';
import HomeScreen from '@/components/HomeScreen';
import SearchScreen from '@/components/SearchScreen';
import OrdersScreen from '@/components/OrdersScreen';
import FavoritesScreen from '@/components/FavoritesScreen';
import ProfileScreen from '@/components/ProfileScreen';
import RestaurantDetail from '@/components/RestaurantDetail'; 
import BackButton from '@/components/BackButton';
import BottomNavBar from '@/components/BottomNavBar';
import { Home, Search, Package, Heart, User } from 'lucide-react-native';

// Update to include restaurant screen
type MainScreen = 'home' | 'search' | 'orders' | 'favorites' | 'profile' | 'restaurant';

export default function MainLayout() {
  const { t } = useLanguage();
  const { navigate, goBack, currentScreen } = useNavigation();
  const [localScreen, setLocalScreen] = useState<MainScreen>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  // Sync with navigation context if available
  useEffect(() => {
    if (currentScreen && ['home', 'search', 'orders', 'favorites', 'profile', 'restaurant'].includes(currentScreen)) {
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

  const showBackButton = localScreen === 'restaurant';

  const showBottomNav = !['restaurant'].includes(localScreen);

  const renderScreen = () => {
    switch (localScreen) {
      case 'home':
        return <HomeScreen onNavigateToRestaurant={handleNavigateToRestaurant} />;
      case 'search':
        return <SearchScreen onNavigateToRestaurant={handleNavigateToRestaurant} />;
      case 'orders':
        return <OrdersScreen />;
      case 'favorites':
        return <FavoritesScreen onNavigateToRestaurant={handleNavigateToRestaurant} />;
      case 'profile':
        return <ProfileScreen />;
      case 'restaurant':
        return <RestaurantDetail 
          restaurant={selectedRestaurant} 
          onGoBack={handleGoBackFromRestaurant} 
        />;
      default:
        return <HomeScreen onNavigateToRestaurant={handleNavigateToRestaurant} />;
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <BackButton onPress={handleGoBackFromRestaurant} />
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