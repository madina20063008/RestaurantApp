
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import MainApp from '@/components/MainApp';

type AppState = 'splash' | 'onboarding' | 'login' | 'main';

export default function RootLayout() {
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
        return <MainApp />;
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

