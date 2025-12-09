import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';

interface FavoritesScreenProps {
  onNavigateToRestaurant?: (restaurant: any) => void;
}

export default function FavoritesScreen({}: FavoritesScreenProps) {
  const { t } = useLanguage();
  const { navigate, setSelectedRestaurant } = useNavigation();

  const favorites = [
    {
      id: '1',
      name: 'Pizza Paradise',
      cuisine: t('pizza'),
      rating: 4.9,
      time: '20-25',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800',
    },
    {
      id: '2',
      name: 'Sushi Master',
      cuisine: t('asian'),
      rating: 4.8,
      time: '35-40',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    },
    {
      id: '3',
      name: 'The Gourmet Kitchen',
      cuisine: t('italian'),
      rating: 4.8,
      time: '25-30',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    },
  ];

  const handleRestaurantClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    navigate('restaurant');
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}>
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 }}>
          <Text style={{
            color: "#111827",
            fontSize: 24,
            fontWeight: "600",
            fontFamily: Platform.select({
              ios: "System",
              android: "Roboto",
            }),
          }}>
            {t('favorites')}
          </Text>
        </View>

        {/* Favorites List */}
        <View style={{ paddingHorizontal: 24, gap: 16 }}>
          {favorites.map((restaurant, index) => (
            <View
              key={restaurant.id}
              style={{ position: "relative" }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleRestaurantClick(restaurant)}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                  borderWidth: 1,
                  borderColor: "#F3F4F6",
                }}
              >
                <View style={{ width: 112, height: 112 }}>
                  <Image 
                    source={{ uri: restaurant.image }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ 
                  flex: 1, 
                  paddingVertical: 12, 
                  paddingRight: 16,
                  justifyContent: "space-between",
                }}>
                  <View>
                    <Text style={{
                      color: "#111827",
                      fontSize: 16,
                      fontWeight: "600",
                      marginBottom: 4,
                      fontFamily: Platform.select({
                        ios: "System",
                        android: "Roboto",
                      }),
                    }}>
                      {restaurant.name}
                    </Text>
                    <Text style={{ 
                      color: "#6B7280", 
                      fontSize: 14,
                    }}>
                      {restaurant.cuisine}
                    </Text>
                  </View>
                  <View style={{ 
                    flexDirection: "row", 
                    alignItems: "center", 
                    gap: 16,
                  }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <MaterialIcons name="star" size={16} color="#F59E0B" />
                      <Text style={{ color: "#6B7280", fontSize: 14 }}>
                        {restaurant.rating}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <MaterialIcons name="access-time" size={16} color="#6B7280" />
                      <Text style={{ color: "#6B7280", fontSize: 14 }}>
                        {restaurant.time} {t('min')}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 40,
                  height: 40,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="favorite" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}