// components/MainApp.tsx
import React, { useState, createContext, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import RestaurantDetail from './RestaurantDetail';

// Define Cart Context
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  restaurantId?: string;
  restaurantName?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  getCartTotal: () => number;
}

// Create context with default value
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getItemQuantity: () => 0,
  getCartTotal: () => 0,
});

// Export the hook
export const useCart = () => useContext(CartContext);

// Cart Provider component
function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    console.log('Adding to cart:', item);
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    console.log('Removing from cart:', itemId);
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === itemId);
      
      if (existingItem?.quantity === 1) {
        return prev.filter(i => i.id !== itemId);
      }
      
      return prev.map(i =>
        i.id === itemId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
  };

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log('Cart total:', total);
    return total;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getItemQuantity,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Main App Content
function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'restaurant'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  console.log('MainApp - Current screen:', currentScreen);

  const navigate = (screen: 'home' | 'restaurant') => {
    console.log('Navigating to:', screen);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen('home');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'home' && (
        <HomeScreen 
          onNavigateToRestaurant={(restaurant) => {
            console.log('Setting restaurant:', restaurant.name);
            setSelectedRestaurant(restaurant);
            navigate('restaurant');
          }}
        />
      )}
      
      {currentScreen === 'restaurant' && (
        <RestaurantDetail 
          restaurant={selectedRestaurant}
          onGoBack={goBack}
        />
      )}
    </View>
  );
}

// Export the main component
export default function MainApp() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});