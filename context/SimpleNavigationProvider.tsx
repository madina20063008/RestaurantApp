// context/SimpleNavigationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Screen = 'home' | 'search' | 'orders' | 'favorites' | 'profile' | 'restaurant';

interface SimpleNavigationContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  selectedRestaurant: any;
  setSelectedRestaurant: (restaurant: any) => void;
}

const SimpleNavigationContext = createContext<SimpleNavigationContextType | undefined>(undefined);

export function SimpleNavigationProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const navigate = (screen: Screen) => {
    console.log('NAVIGATE CALLED - Going to:', screen);
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  return (
    <SimpleNavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {children}
    </SimpleNavigationContext.Provider>
  );
}

export function useSimpleNavigation() {
  const context = useContext(SimpleNavigationContext);
  if (context === undefined) {
    throw new Error('useSimpleNavigation must be used within SimpleNavigationProvider');
  }
  return context;
}