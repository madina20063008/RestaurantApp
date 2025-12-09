// components/BottomNavBar.tsx
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { type LucideIcon } from 'lucide-react-native';

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  screen: string;
}

interface BottomNavBarProps {
  items: NavItem[];
  currentScreen: string;
  onNavigate: (screen: any) => void;
}

export default function BottomNavBar({ items, currentScreen, onNavigate }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {items.map((item) => {
          const isActive = currentScreen === item.screen;
          const Icon = item.icon;
          
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => onNavigate(item.screen)}
              activeOpacity={0.7}
            >
              <Icon
                size={24}
                color={isActive ? '#FF6B35' : '#9CA3AF'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text style={[
                styles.label,
                { color: isActive ? '#FF6B35' : '#9CA3AF' }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 20,
    paddingTop: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
});