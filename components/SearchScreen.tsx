// components/SearchScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';

interface SearchScreenProps {
  onNavigateToRestaurant?: (restaurant: any) => void;
}

export default function SearchScreen({}: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { t } = useLanguage();
  const { navigate, setSelectedRestaurant } = useNavigation();

  // Base restaurant data without translations
  const baseRestaurants = [
    {
      id: '1',
      name: 'Pizza Paradise',
      cuisine: 'pizza',
      rating: 4.9,
      time: '20-25',
      distance: '1.2 km',
      minOrder: '15',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800',
    },
    {
      id: '2',
      name: 'Burger House',
      cuisine: 'burgers',
      rating: 4.7,
      time: '15-20',
      distance: '0.8 km',
      minOrder: '10',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    },
    {
      id: '3',
      name: 'Sushi Master',
      cuisine: 'asian',
      rating: 4.8,
      time: '35-40',
      distance: '2.5 km',
      minOrder: '20',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    },
    {
      id: '4',
      name: 'Pasta House',
      cuisine: 'italian',
      rating: 4.6,
      time: '30-35',
      distance: '1.8 km',
      minOrder: '18',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    },
    {
      id: '5',
      name: 'Taco Fiesta',
      cuisine: 'mexican',
      rating: 4.5,
      time: '25-30',
      distance: '2.0 km',
      minOrder: '12',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    },
    {
      id: '6',
      name: 'Green Leaf',
      cuisine: 'healthy',
      rating: 4.8,
      time: '20-25',
      distance: '1.5 km',
      minOrder: '15',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    },
  ];

  // Translate restaurant data
  const restaurants = useMemo(() => {
    return baseRestaurants.map(restaurant => ({
      ...restaurant,
      cuisine: t(restaurant.cuisine),
    }));
  }, [t]);

  // Filter restaurants based on search query and active filter
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      // Search by name or cuisine
      const matchesSearch = searchQuery === '' || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesFilter = activeFilter === null || 
        restaurant.cuisine.toLowerCase() === activeFilter.toLowerCase();
      
      return matchesSearch && matchesFilter;
    });
  }, [restaurants, searchQuery, activeFilter]);

  const handleRestaurantClick = (restaurant: any) => {
    // Convert back to base restaurant for context
    const baseRestaurant = baseRestaurants.find(r => r.id === restaurant.id);
    setSelectedRestaurant(baseRestaurant);
    navigate('restaurant');
  };

  // Filter options with translations
  const filterOptions = ['pizza', 'burgers', 'asian', 'italian', 'mexican', 'healthy'].map(key => ({
    key,
    label: t(key)
  }));

  const handleFilterPress = (filterKey: string) => {
    if (activeFilter === filterKey) {
      setActiveFilter(null); // Deactivate if already active
    } else {
      setActiveFilter(filterKey); // Activate new filter
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveFilter(null);
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}>
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View style={{ 
          paddingHorizontal: 24, 
          paddingTop: 24, 
          paddingBottom: 16, 
          backgroundColor: "#FFFFFF",
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ flex: 1, position: "relative" }}>
              <View style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: [{ translateY: -10 }],
                zIndex: 10,
              }}>
                <MaterialIcons name="search" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t('searchFood')}
                placeholderTextColor="#9CA3AF"
                style={{
                  width: "100%",
                  height: 48,
                  paddingLeft: 48,
                  paddingRight: searchQuery ? 48 : 16,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}
                autoFocus
              />
              {/* Clear button when there's text */}
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: [{ translateY: -12 }],
                    zIndex: 10,
                  }}
                >
                  <MaterialIcons name="close" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="tune" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Filter Chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 8, paddingRight: 24 }}
          >
            {filterOptions.map((filter, index) => {
              const isActive = activeFilter === filter.key;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => handleFilterPress(filter.key)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: isActive ? "#FF6B35" : "#F3F4F6",
                    borderRadius: 24,
                    borderWidth: isActive ? 0 : 1,
                    borderColor: isActive ? "transparent" : "#E5E7EB",
                  }}
                >
                  <Text style={{
                    color: isActive ? "#FFFFFF" : "#374151",
                    fontSize: 14,
                    fontFamily: Platform.select({
                      ios: "System",
                      android: "Roboto",
                    }),
                  }}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Search Stats */}
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: "#6B7280", fontSize: 14 }}>
              {searchQuery || activeFilter ? 
                `Found ${filteredRestaurants.length} result${filteredRestaurants.length !== 1 ? 's' : ''}` : 
                'All restaurants'
              }
            </Text>
          </View>
        </View>

        {/* Results */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16, gap: 16 }}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                activeOpacity={0.7}
                onPress={() => handleRestaurantClick(restaurant)}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
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
                    <Text style={{ color: "#6B7280", fontSize: 14 }}>
                      {restaurant.distance}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            // No results state
            <View style={{ 
              alignItems: "center", 
              justifyContent: "center", 
              paddingVertical: 60,
            }}>
              <MaterialIcons name="search-off" size={60} color="#D1D5DB" />
              <Text style={{ 
                color: "#6B7280", 
                fontSize: 18, 
                fontWeight: "600", 
                marginTop: 16,
                textAlign: "center",
              }}>
                No restaurants found
              </Text>
              <Text style={{ 
                color: "#9CA3AF", 
                fontSize: 14, 
                textAlign: "center",
                marginTop: 8,
                paddingHorizontal: 40,
              }}>
                {searchQuery ? 
                  `No restaurants matching "${searchQuery}"` : 
                  'Try changing your filters'
                }
              </Text>
              {(searchQuery || activeFilter) && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    backgroundColor: "#FF6B35",
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
                    Clear search
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}