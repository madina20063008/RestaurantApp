// app/_layout.tsx (ROOT LAYOUT - FIXED VERSION)
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { NavigationProvider } from '@/context/NavigationContext';
import MainLayout from '../_layout';

type AppState = 'splash' | 'onboarding' | 'login' | 'main';

function AppContent() {
  const [appState, setAppState] = useState<AppState>('splash');

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const onboarded = await AsyncStorage.getItem('hasCompletedOnboarding');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      
      if (onboarded !== 'true') {
        setAppState('onboarding');
      } else if (isLoggedIn !== 'true') {
        setAppState('login');
      } else {
        setAppState('main');
      }
    } catch (error) {
      console.error('Error checking app state:', error);
      setAppState('onboarding');
    }
  };

  // Dynamically import components based on state
  const renderContent = () => {
    switch (appState) {
      case 'splash':
        const SplashScreen = require('@/components/SplashScreen').default;
        return <SplashScreen />;
      case 'onboarding':
        const Onboarding = require('@/components/Onboarding').default;
        return <Onboarding onComplete={() => {
          AsyncStorage.setItem('hasCompletedOnboarding', 'true');
          setAppState('login');
        }} />;
      case 'login':
        const LoginScreen = require('@/components/LoginScreen').default;
        return <LoginScreen onLogin={() => {
          AsyncStorage.setItem('isLoggedIn', 'true');
          setAppState('main');
        }} />;
      case 'main':
        return <MainLayout />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderContent()}
      <StatusBar style="auto" />
    </View>
  );
}

// THIS IS THE KEY: Wrap the entire AppContent with providers
export default function App() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </NavigationProvider>
    </LanguageProvider>
  );
}