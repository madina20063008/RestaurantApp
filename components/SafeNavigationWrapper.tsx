// components/SafeNavigationWrapper.tsx
import { ReactNode } from 'react';
import { useNavigation, type Screen } from '@/context/NavigationContext';

interface SafeNavigationWrapperProps {
  children: (navigation: {
    navigate: (screen: Screen) => void;
    goBack: () => void;
    selectedRestaurant: any;
    setSelectedRestaurant: (restaurant: any) => void;
  }) => ReactNode;
}

export default function SafeNavigationWrapper({ children }: SafeNavigationWrapperProps) {
  try {
    const { navigate, goBack, selectedRestaurant, setSelectedRestaurant } = useNavigation();
    return <>{children({ navigate, goBack, selectedRestaurant, setSelectedRestaurant })}</>;
  } catch (error) {
    // Fallback navigation with correct type
    const fallbackNavigate = (screen: Screen) => {};
    const fallbackGoBack = () => {};
    
    return <>{children({ 
      navigate: fallbackNavigate, 
      goBack: fallbackGoBack, 
      selectedRestaurant: null, 
      setSelectedRestaurant: () => {} 
    })}</>;
  }
}