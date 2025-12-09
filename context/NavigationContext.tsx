// // context/NavigationContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Export the Screen type
// export type Screen = 
//   | 'splash'
//   | 'onboarding'
//   | 'login'
//   | 'home'
//   | 'search'
//   | 'restaurant'
//   | 'cart'
//   | 'checkout'
//   | 'confirmation'
//   | 'orders'
//   | 'favorites'
//   | 'profile'
//   | 'privacy'
//   | 'terms';

// interface NavigationContextType {
//   currentScreen: Screen;
//   navigate: (screen: Screen) => void;
//   goBack: () => void;
//   selectedRestaurant: any;
//   setSelectedRestaurant: (restaurant: any) => void;
//   cartItems: any[];
//   addToCart: (item: any) => void;
//   updateCartItem: (itemId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// export function NavigationProvider({ children }: { children: ReactNode }) {
//   const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
//   const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
//   const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   const navigate = (screen: Screen) => {
//     setScreenHistory([...screenHistory, currentScreen]);
//     setCurrentScreen(screen);
//   };

//   const goBack = () => {
//     if (screenHistory.length > 0) {
//       const previousScreen = screenHistory[screenHistory.length - 1];
//       setScreenHistory(screenHistory.slice(0, -1));
//       setCurrentScreen(previousScreen);
//     }
//   };

//   const addToCart = (item: any) => {
//     const existingItem = cartItems.find(i => i.id === item.id);
//     if (existingItem) {
//       setCartItems(cartItems.map(i => 
//         i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//       ));
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const updateCartItem = (itemId: string, quantity: number) => {
//     if (quantity <= 0) {
//       setCartItems(cartItems.filter(i => i.id !== itemId));
//     } else {
//       setCartItems(cartItems.map(i => 
//         i.id === itemId ? { ...i, quantity } : i
//       ));
//     }
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <NavigationContext.Provider
//       value={{
//         currentScreen,
//         navigate,
//         goBack,
//         selectedRestaurant,
//         setSelectedRestaurant,
//         cartItems,
//         addToCart,
//         updateCartItem,
//         clearCart,
//       }}
//     >
//       {children}
//     </NavigationContext.Provider>
//   );
// }

// // SAFER version - doesn't throw error
// export function useNavigation() {
//   const context = useContext(NavigationContext);
  
//   // Return safe defaults if context is not available
//   if (context === undefined) {
//     console.warn('useNavigation called outside NavigationProvider - using fallback');
//     return {
//       currentScreen: 'splash' as Screen,
//       navigate: (screen: Screen) => {},
//       goBack: () => {},
//       selectedRestaurant: null,
//       setSelectedRestaurant: () => {},
//       cartItems: [],
//       addToCart: () => {},
//       updateCartItem: () => {},
//       clearCart: () => {},
//     };
//   }
  
//   return context;
// }


// context/NavigationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'search'
  | 'restaurant'  // Add restaurant screen
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'orders'
  | 'favorites'
  | 'profile'
  | 'privacy'
  | 'terms';

interface NavigationContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  selectedRestaurant: any;
  setSelectedRestaurant: (restaurant: any) => void;
  cartItems: any[];
  addToCart: (item: any) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const navigate = (screen: Screen) => {
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(screenHistory.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const addToCart = (item: any) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(i => i.id !== itemId));
    } else {
      setCartItems(cartItems.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        selectedRestaurant,
        setSelectedRestaurant,
        cartItems,
        addToCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    console.warn('useNavigation called outside NavigationProvider - using fallback');
    return {
      currentScreen: 'splash' as Screen,
      navigate: (screen: Screen) => {},
      goBack: () => {},
      selectedRestaurant: null,
      setSelectedRestaurant: () => {},
      cartItems: [],
      addToCart: () => {},
      updateCartItem: () => {},
      clearCart: () => {},
    };
  }
  
  return context;
}