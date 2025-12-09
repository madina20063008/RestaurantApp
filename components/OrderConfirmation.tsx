// components/OrderConfirmation.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import { CheckCircle, MapPin, Clock, Phone, ChevronLeft } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';

const { width } = Dimensions.get('window');

export default function OrderConfirmation() {
  const { t } = useLanguage();
  const { navigate, goBack } = useNavigation();

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const carAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Success animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 200,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Fade in text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Car bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(carAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(carAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('orderConfirmed') || 'Order Confirmed'}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Animation */}
        <View style={styles.successContainer}>
          <Animated.View
            style={[
              styles.successIconContainer,
              {
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <CheckCircle size={56} color="#10B981" />
          </Animated.View>
          
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })}]
            }}
          >
            <Text style={styles.successTitle}>
              {t('orderConfirmed') || 'Order Confirmed!'}
            </Text>
            <Text style={styles.successSubtitle}>
              Your order has been placed successfully
            </Text>
          </Animated.View>
        </View>

        {/* Order Details */}
        <View style={styles.orderDetailsCard}>
          <View style={styles.orderDetailRow}>
            <Text style={styles.orderDetailLabel}>Order ID</Text>
            <Text style={styles.orderDetailValue}>#FH-2024-001</Text>
          </View>
          <View style={styles.orderDetailRow}>
            <Text style={styles.orderDetailLabel}>{t('estimatedDelivery') || 'Estimated Delivery'}</Text>
            <Text style={styles.deliveryTime}>25-30 {t('min') || 'min'}</Text>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryInfoCard}>
          <View style={styles.deliveryInfoItem}>
            <MapPin size={20} color="#FF6B35" style={styles.deliveryIcon} />
            <View style={styles.deliveryInfoContent}>
              <Text style={styles.deliveryInfoTitle}>Delivery Address</Text>
              <Text style={styles.deliveryInfoText}>123 Main Street, Tashkent, Uzbekistan</Text>
            </View>
          </View>
          
          <View style={styles.deliveryInfoItem}>
            <Clock size={20} color="#FF6B35" style={styles.deliveryIcon} />
            <View style={styles.deliveryInfoContent}>
              <Text style={styles.deliveryInfoTitle}>Delivery Time</Text>
              <Text style={styles.deliveryInfoText}>Today, 2:30 PM - 3:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Tracking Map Placeholder */}
        <View style={styles.trackingContainer}>
          <View style={styles.trackingBackground} />
          <View style={styles.trackingContent}>
            <Animated.View
              style={[
                styles.carAnimation,
                {
                  transform: [{ translateY: carAnim }]
                }
              ]}
            >
              <View style={styles.carIconContainer}>
                <Text style={styles.carEmoji}>🚗</Text>
              </View>
            </Animated.View>
            <Text style={styles.trackingText}>Driver is on the way</Text>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar} />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>John Doe</Text>
              <View style={styles.driverMeta}>
                <Text style={styles.driverRole}>Delivery Partner</Text>
                <View style={styles.driverRating}>
                  {[...Array(5)].map((_, i) => (
                    <View key={i} style={styles.ratingDot} />
                  ))}
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.callButton}>
            <Phone size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => navigate('orders')}
          style={styles.trackOrderButton}
        >
          <Text style={styles.trackOrderButtonText}>
            {t('trackOrder') || 'Track Order'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigate('home')}
          style={styles.backHomeButton}
        >
          <Text style={styles.backHomeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 32,
  },
  successIconContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#D1FAE5',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  orderDetailsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  deliveryInfoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    gap: 20,
  },
  deliveryInfoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliveryIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  deliveryInfoContent: {
    flex: 1,
  },
  deliveryInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  deliveryInfoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  trackingContainer: {
    height: 192,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  trackingBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#10B981',
    opacity: 0.1,
  },
  trackingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carAnimation: {
    alignItems: 'center',
  },
  carIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  carEmoji: {
    fontSize: 32,
  },
  trackingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    backgroundColor: '#E5E7EB',
    borderRadius: 28,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  driverMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRole: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingDot: {
    width: 4,
    height: 4,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  callButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FF6B35',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  trackOrderButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  trackOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backHomeButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backHomeButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});