
// components/RestaurantDetail.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Platform
} from 'react-native';
import { ChevronLeft, Star, Clock, MapPin, ShoppingBag, Plus, Minus, Info, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@/context/NavigationContext';
import { useCart } from '@/context/CartContext';

interface RestaurantDetailProps {
  restaurant: any;
  onGoBack: () => void;
}

type TabType = 'menu' | 'reviews' | 'info';

export default function RestaurantDetail({ restaurant, onGoBack }: RestaurantDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const { navigate } = useNavigation();
  const { cartItems, addToCart, removeFromCart, getCartTotal } = useCart();

  console.log('RestaurantDetail: Received restaurant:', restaurant?.name);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No restaurant selected</Text>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Helper function to get item quantity
  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  // Get cart items for this specific restaurant
  const restaurantCartItems = cartItems.filter(item => 
    item.restaurantId === restaurant.id || item.restaurantId === undefined
  );

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.quantity === 1) {
      removeFromCart(itemId);
    } else {
      addToCart({
        id: itemId,
        quantity: -1
      });
    }
  };

  const totalItems = restaurantCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = restaurantCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <View style={styles.menuContent}>
            {restaurant.menuItems && restaurant.menuItems.map((section: any, index: number) => (
              <View key={section.id || index} style={styles.menuSection}>
                <Text style={styles.sectionTitle}>{section.category}</Text>
                <View style={styles.itemsContainer}>
                  {section.items.map((item: any) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <View 
                        key={item.id} 
                        style={[
                          styles.menuItem,
                          item.special && styles.specialItem
                        ]}
                      >
                        {item.special && (
                          <View style={styles.specialBadge}>
                            <Text style={styles.specialBadgeText}>Special</Text>
                          </View>
                        )}
                        
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        
                        <View style={styles.itemContent}>
                          <View style={styles.itemHeader}>
                            <View style={styles.itemInfo}>
                              <Text style={styles.itemName}>{item.name}</Text>
                              <Text style={styles.itemDescription}>{item.description}</Text>
                            </View>
                            
                            {item.rating && (
                              <View style={styles.itemRating}>
                                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                              </View>
                            )}
                          </View>
                          
                          <View style={styles.itemFooter}>
                            <View style={styles.priceAndTime}>
                              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                              {item.prepTime && (
                                <View style={styles.prepTime}>
                                  <Clock size={12} color="#6B7280" />
                                  <Text style={styles.prepTimeText}>{item.prepTime}</Text>
                                </View>
                              )}
                            </View>
                            
                            {quantity > 0 ? (
                              <View style={styles.quantitySelector}>
                                <TouchableOpacity
                                  onPress={() => handleRemoveFromCart(item.id)}
                                  style={styles.quantityButton}
                                >
                                  <Minus size={16} color="#F59E0B" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity
                                  onPress={() => handleAddToCart(item)}
                                  style={styles.quantityButton}
                                >
                                  <Plus size={16} color="#F59E0B" />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <TouchableOpacity
                                onPress={() => handleAddToCart(item)}
                                style={styles.addButton}
                              >
                                <Plus size={20} color="#FFFFFF" />
                              </TouchableOpacity>
                            )}
                          </View>
                          
                          {item.bestseller && (
                            <View style={styles.bestsellerBadge}>
                              <Text style={styles.bestsellerText}>🔥 Bestseller</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        );

      case 'reviews':
        return (
          <View style={styles.reviewsContent}>
            {[1, 2, 3].map((review) => (
              <View key={review} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerAvatar} />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>User Name</Text>
                    <View style={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>
                  Great food and excellent service! Highly recommended.
                </Text>
              </View>
            ))}
          </View>
        );

      case 'info':
        return (
          <View style={styles.infoContent}>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Address</Text>
              <Text style={styles.infoText}>123 Main Street, Tashkent, Uzbekistan</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Hours</Text>
              <Text style={styles.infoText}>Mon-Sun: 10:00 AM - 11:00 PM</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Contact</Text>
              <Text style={styles.infoText}>+998 90 123 4567</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Delivery Info</Text>
              <Text style={styles.infoText}>Minimum order: ${restaurant.minOrder || '10'}</Text>
              <Text style={styles.infoText}>Delivery fee: {restaurant.deliveryFee || 'Free'}</Text>
              <Text style={styles.infoText}>Estimated time: {restaurant.time || '25-30'} minutes</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={onGoBack}
        style={styles.backButtonTop}
      >
        <ChevronLeft size={24} color="#111827" />
      </TouchableOpacity>

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: restaurant.image }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoHeader}>
        <View style={styles.restaurantHeader}>
          <View>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
          </View>
          
          <View style={styles.restaurantRating}>
            <Star size={18} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingValue}>{restaurant.rating || '4.8'}</Text>
          </View>
        </View>
        
        <View style={styles.restaurantMeta}>
          <View style={styles.metaItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.metaText}>{restaurant.time || '25-30'} min</Text>
          </View>
          
          <View style={styles.metaItem}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.metaText}>1.2 km</Text>
          </View>
          
          {restaurant.deliveryFee && (
            <View style={styles.metaItem}>
              <ShoppingBag size={16} color="#6B7280" />
              <Text style={styles.metaText}>{restaurant.deliveryFee}</Text>
            </View>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {(['menu', 'reviews', 'info'] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab === 'menu' ? 'Menu' : tab === 'reviews' ? 'Reviews' : 'Info'}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderTabContent()}
      </ScrollView>

      {/* Cart Footer */}
      {totalItems > 0 && (
        <View style={styles.cartFooter}>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => navigate('cart')}
          >
            <View style={styles.cartInfo}>
              <ShoppingBag size={20} color="#FFFFFF" />
              <Text style={styles.cartItemsText}>
                {totalItems} items
              </Text>
            </View>
            <View style={styles.cartTotalContainer}>
              <Text style={styles.viewCartText}>View Cart</Text>
              <Text style={styles.cartTotal}>${cartTotal.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButtonTop: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#6B7280',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  heroContainer: {
    height: 200,
    backgroundColor: '#F3F4F6',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  infoHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#6B7280',
  },
  restaurantRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabButton: {
    paddingBottom: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FF6B35',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    width: '100%',
    height: 2,
    backgroundColor: '#FF6B35',
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  menuContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  itemsContainer: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  specialItem: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  specialBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  specialBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  itemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400E',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  prepTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  prepTimeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  addButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 20,
    textAlign: 'center',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: -6,
    left: 12,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bestsellerText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reviewsContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  infoContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 24,
  },
  infoSection: {
    gap: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  cartFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  cartButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartItemsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cartTotalContainer: {
    alignItems: 'flex-end',
  },
  viewCartText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 2,
  },
  cartTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});