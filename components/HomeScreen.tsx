
// components/HomeScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Platform,
  StyleSheet,
  Dimensions 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';

interface HomeScreenProps {
  onNavigateToRestaurant: (restaurant: any) => void;
}

const { width } = Dimensions.get('window');

export default function HomeScreen({ onNavigateToRestaurant }: HomeScreenProps) {
  const { t } = useLanguage();

  const categories = [
    { id: '1', name: t('pizza'), emoji: '🍕', color: '#FEE2E2' },
    { id: '2', name: t('burgers'), emoji: '🍔', color: '#FEF3C7' },
    { id: '3', name: t('asian'), emoji: '🍜', color: '#DCFCE7' },
    { id: '4', name: t('italian'), emoji: '🍝', color: '#F3E8FF' },
    { id: '5', name: t('mexican'), emoji: '🌮', color: '#FFEDD5' },
    { id: '6', name: t('healthy'), emoji: '🥗', color: '#E0F2FE' },
  ];

  const featured = [
    {
      id: '1',
      name: 'The Gourmet Kitchen',
      cuisine: 'italian',
      rating: 4.8,
      time: '25-30',
      deliveryFee: 'Free',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      promoted: true,
    },
    {
      id: '2',
      name: 'Spice Garden',
      cuisine: 'asian',
      rating: 4.6,
      time: '30-35',
      deliveryFee: '$1.99',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      promoted: true,
    },
  ];

  const popularRestaurants = [
    {
      id: '3',
      name: 'Pizza Paradise',
      cuisine: 'pizza',
      rating: 4.9,
      time: '20-25',
      minOrder: '15',
      deliveryFee: 'Free',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800',
      discount: '20% OFF',
    },
    {
      id: '4',
      name: 'Burger House',
      cuisine: 'burgers',
      rating: 4.7,
      time: '15-20',
      minOrder: '10',
      deliveryFee: '$0.99',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
      discount: 'Buy 1 Get 1',
    },
    {
      id: '5',
      name: 'Sushi Master',
      cuisine: 'asian',
      rating: 4.8,
      time: '35-40',
      minOrder: '20',
      deliveryFee: 'Free',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      discount: '15% OFF',
    },
    {
      id: '6',
      name: 'Taco Fiesta',
      cuisine: 'mexican',
      rating: 4.5,
      time: '25-30',
      minOrder: '12',
      deliveryFee: '$1.49',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    },
    {
      id: '7',
      name: 'Green Bowl',
      cuisine: 'healthy',
      rating: 4.9,
      time: '20-25',
      minOrder: '8',
      deliveryFee: 'Free',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
      promoted: true,
    },
    {
      id: '8',
      name: 'Coffee Corner',
      cuisine: 'cafe',
      rating: 4.8,
      time: '10-15',
      minOrder: '5',
      deliveryFee: '$0.99',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    },
  ];

  const promotions = [
    {
      id: 'p1',
      title: 'First Order Bonus',
      subtitle: 'Get 30% off on your first order',
      color: '#FF6B35',
      icon: '🎁',
    },
    {
      id: 'p2',
      title: 'Free Delivery',
      subtitle: 'On orders above $25',
      color: '#10B981',
      icon: '🚚',
    },
    {
      id: 'p3',
      title: 'Weekend Special',
      subtitle: 'Buy 1 Get 1 Free',
      color: '#8B5CF6',
      icon: '⭐',
    },
  ];

  const getMenuItemsForRestaurant = (restaurant: any) => {
    const cuisine = restaurant.cuisine || restaurant.name.toLowerCase();
    
    if (cuisine.includes('pizza') || restaurant.name.includes('Pizza')) {
      return [
        {
          id: 'm1',
          category: t('appetizers'),
          items: [
            { 
              id: '1', 
              name: 'Caesar Salad', 
              description: 'Fresh romaine, parmesan, croutons', 
              price: 8.99, 
              image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
              rating: 4.5,
          
            },
            { 
              id: '2', 
              name: 'Garlic Bread', 
              description: 'Toasted with herbs and butter', 
              price: 5.99, 
              image: 'https://images.unsplash.com/photo-1619985488010-da8e5dbf1ca1?w=400',
              rating: 4.7,
              bestseller: true,
            },
          ],
        },
        {
          id: 'm2',
          category: t('mains'),
          items: [
            { 
              id: '3', 
              name: 'Margherita Pizza', 
              description: 'Tomato, mozzarella, basil', 
              price: 12.99, 
              image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', 
              special: true,
              rating: 4.9,
              bestseller: true,
            },
            { 
              id: '4', 
              name: 'Pepperoni Pizza', 
              description: 'Classic pepperoni, cheese', 
              price: 14.99, 
              image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
              rating: 4.8,
            },
            { 
              id: '5', 
              name: 'Pasta Carbonara', 
              description: 'Creamy sauce, bacon, parmesan', 
              price: 13.99, 
              image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
              rating: 4.6,
            },
          ],
        },
      ];
    } else if (cuisine.includes('burger') || restaurant.name.includes('Burger')) {
      return [
        {
          id: 'm1',
          category: t('appetizers'),
          items: [
            { 
              id: '6', 
              name: 'French Fries', 
              description: 'Golden crispy fries', 
              price: 4.99, 
              image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
              rating: 4.4,
            },
            { 
              id: '7', 
              name: 'Onion Rings', 
              description: 'Crispy fried onion rings', 
              price: 5.99, 
              image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
              rating: 4.6,
            },
          ],
        },
        {
          id: 'm2',
          category: t('mains'),
          items: [
            { 
              id: '8', 
              name: 'Classic Burger', 
              description: 'Beef patty, lettuce, tomato', 
              price: 10.99, 
              image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', 
              special: true,
              rating: 4.8,
              bestseller: true,
            },
            { 
              id: '9', 
              name: 'Cheeseburger', 
              description: 'With melted cheese', 
              price: 11.99, 
              image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400',
              rating: 4.7,
            },
            { 
              id: '10', 
              name: 'Bacon Burger', 
              description: 'With crispy bacon strips', 
              price: 12.99, 
              image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433d?w=400',
              rating: 4.9,
              bestseller: true,
            },
          ],
        },
      ];
    } else if (cuisine.includes('asian') || restaurant.name.includes('Sushi')) {
      return [
        {
          id: 'm1',
          category: t('appetizers'),
          items: [
            { 
              id: '11', 
              name: 'Edamame', 
              description: 'Steamed soybeans with sea salt', 
              price: 5.99, 
              image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400',
              rating: 4.5,
            },
            { 
              id: '12', 
              name: 'Spring Rolls', 
              description: 'Crispy vegetable rolls', 
              price: 6.99, 
              image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
              rating: 4.7,
              bestseller: true,
            },
          ],
        },
        {
          id: 'm2',
          category: t('mains'),
          items: [
            { 
              id: '13', 
              name: 'Sushi Platter', 
              description: 'Assorted sushi selection', 
              price: 18.99, 
              image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', 
              special: true,
              rating: 4.9,
              bestseller: true,
            },
            { 
              id: '14', 
              name: 'Ramen', 
              description: 'Japanese noodle soup', 
              price: 12.99, 
              image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
              rating: 4.8,
            },
          ],
        },
      ];
    }
    
    // Default menu for other restaurants
    return [
      {
        id: 'm1',
        category: t('appetizers'),
        items: [
          { 
            id: '15', 
            name: 'House Salad', 
            description: 'Mixed greens with vinaigrette', 
            price: 7.99, 
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
            rating: 4.5,
          },
        ],
      },
      {
        id: 'm2',
        category: t('mains'),
        items: [
          { 
            id: '16', 
            name: 'Chef Special', 
            description: 'Today chef recommendation', 
            price: 15.99, 
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 
            special: true,
            rating: 4.8,
            bestseller: true,
          },
        ],
      },
    ];
  };

  const handleRestaurantClick = (restaurant: any) => {
    console.log('HomeScreen: Restaurant clicked:', restaurant.name);
    
    const restaurantWithMenu = {
      ...restaurant,
      cuisine: t(restaurant.cuisine),
      menuItems: getMenuItemsForRestaurant(restaurant),
    };
    
    console.log('HomeScreen: Calling onNavigateToRestaurant...');
    onNavigateToRestaurant(restaurantWithMenu);
  };

  const handleTestButton = () => {
    const testRestaurant = {
      id: 'test',
      name: 'Test Restaurant',
      cuisine: 'Test',
      rating: 4.5,
      time: '15-20',
      deliveryFee: 'Free',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    };
    
    const restaurantWithMenu = {
      ...testRestaurant,
      menuItems: getMenuItemsForRestaurant(testRestaurant),
    };
    
    console.log('HomeScreen: Calling onNavigateToRestaurant from test button...');
    onNavigateToRestaurant(restaurantWithMenu);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        

        {/* Promotions Banner */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.promotionsContainer}
          contentContainerStyle={styles.promotionsContent}
        >
          {promotions.map((promo) => (
            <View
              key={promo.id}
              style={[styles.promoCard, { backgroundColor: promo.color }]}
            >
              <Text style={styles.promoIcon}>{promo.icon}</Text>
              <View>
                <Text style={styles.promoTitle}>{promo.title}</Text>
                <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('categories')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.7}
                style={styles.categoryCard}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('featured')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContent}
          >
            {featured.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                activeOpacity={0.7}
                onPress={() => handleRestaurantClick(restaurant)}
                style={styles.featuredCard}
              >
                <View style={styles.featuredImageContainer}>
                  <Image 
                    source={{ uri: restaurant.image }}
                    style={styles.featuredImage}
                  />
                  {restaurant.promoted && (
                    <View style={styles.promotedBadge}>
                      <Text style={styles.promotedText}>Promoted</Text>
                    </View>
                  )}
                  <View style={styles.ratingBadge}>
                    <MaterialIcons name="star" size={16} color="#FFFFFF" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.featuredContentContainer}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  <View style={styles.restaurantInfo}>
                    <View style={styles.infoRow}>
                      <Text style={styles.cuisineText}>{t(restaurant.cuisine)}</Text>
                      <View style={styles.deliveryInfo}>
                        <MaterialIcons name="delivery-dining" size={14} color="#6B7280" />
                        <Text style={styles.deliveryText}>{restaurant.deliveryFee}</Text>
                      </View>
                    </View>
                    <View style={styles.infoRow}>
                      <View style={styles.timeContainer}>
                        <MaterialIcons name="access-time" size={14} color="#6B7280" />
                        <Text style={styles.timeText}>{restaurant.time} {t('min')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Near You */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('popularNearYou')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.popularGrid}>
            {popularRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                activeOpacity={0.7}
                onPress={() => handleRestaurantClick(restaurant)}
                style={styles.popularCard}
              >
                <View style={styles.popularImageContainer}>
                  <Image 
                    source={{ uri: restaurant.image }}
                    style={styles.popularImage}
                  />
                  {restaurant.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{restaurant.discount}</Text>
                    </View>
                  )}
                  {restaurant.promoted && (
                    <View style={styles.promotedBadgeSmall}>
                      <Text style={styles.promotedTextSmall}>🔥</Text>
                    </View>
                  )}
                  <View style={styles.ratingBadgeSmall}>
                    <MaterialIcons name="star" size={12} color="#FFFFFF" />
                    <Text style={styles.ratingTextSmall}>{restaurant.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.popularContent}>
                  <Text style={styles.popularRestaurantName} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  <Text style={styles.popularCuisine}>{t(restaurant.cuisine)}</Text>
                  
                  <View style={styles.popularDetails}>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="access-time" size={12} color="#6B7280" />
                      <Text style={styles.detailText}>{restaurant.time} min</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <FontAwesome5 name="shopping-bag" size={10} color="#6B7280" />
                      <Text style={styles.detailText}>${restaurant.minOrder} min</Text>
                    </View>
                  </View>
                  
                  <View style={styles.deliveryFeeContainer}>
                    <MaterialIcons name="delivery-dining" size={12} color="#6B7280" />
                    <Text style={styles.deliveryFeeText}>
                      {restaurant.deliveryFee === 'Free' ? 'Free delivery' : restaurant.deliveryFee}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.navigationHint}>
          Click any restaurant card or the red test button above
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  testButton: {
    marginHorizontal: 24,
    marginVertical: 16,
    backgroundColor: '#FF0000',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  testButtonSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  promotionsContainer: {
    marginTop: 8,
  },
  promotionsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  promoCard: {
    width: width * 0.8,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  promoIcon: {
    fontSize: 32,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryCard: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  featuredContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featuredCard: {
    width: width * 0.8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  featuredImageContainer: {
    height: 180,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  promotedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promotedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -12,
    right: 12,
    backgroundColor: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featuredContentContainer: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  restaurantInfo: {
    paddingTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cuisineText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  lastSection: {
    marginBottom: 40,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 12,
  },
  popularCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  popularImageContainer: {
    height: 140,
    position: 'relative',
  },
  popularImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  promotedBadgeSmall: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B35',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promotedTextSmall: {
    fontSize: 12,
  },
  ratingBadgeSmall: {
    position: 'absolute',
    bottom: -10,
    right: 8,
    backgroundColor: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingTextSmall: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  popularContent: {
    padding: 12,
  },
  popularRestaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  popularCuisine: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  popularDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 11,
    color: '#6B7280',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  deliveryFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryFeeText: {
    fontSize: 11,
    color: '#6B7280',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  navigationHint: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 40,
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 14,
  },
});