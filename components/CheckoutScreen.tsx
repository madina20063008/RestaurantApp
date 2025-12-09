// components/CheckoutScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated
} from 'react-native';
import { MapPin, CreditCard, Check, Wallet, ChevronLeft } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';
import { useCart } from '@/context/CartContext';

type PaymentMethod = 'card' | 'apple' | 'cash';

export default function CheckoutScreen() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const { t } = useLanguage();
  const { navigate, goBack } = useNavigation();
  const { clearCart, getCartTotal } = useCart();

  const handlePlaceOrder = () => {
  clearCart();
  navigate('confirmation'); // Change this from navigate('home') to navigate('confirmation')
};

  const cartTotal = getCartTotal();
  const deliveryFee = 2.99;
  const tax = cartTotal * 0.1;
  const total = cartTotal + deliveryFee + tax;

  const renderStepContent = () => {
    switch (step) {
      case 1: // Address
        return (
          <Animated.View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Delivery Address</Text>
            
            {/* Saved Addresses */}
            <TouchableOpacity
              style={styles.selectedAddressCard}
            >
              <View style={styles.addressCardContent}>
                <MapPin size={20} color="#FF6B35" style={styles.addressIcon} />
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>Home</Text>
                  <Text style={styles.addressText}>123 Main Street, Tashkent, Uzbekistan</Text>
                </View>
                <View style={styles.selectedIndicator}>
                  <Check size={12} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addressCard}
            >
              <View style={styles.addressCardContent}>
                <MapPin size={20} color="#9CA3AF" style={styles.addressIcon} />
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>Office</Text>
                  <Text style={styles.addressText}>456 Business Ave, Tashkent, Uzbekistan</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addAddressButton}>
              <Text style={styles.addAddressText}>+ Add New Address</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 2: // Payment
        return (
          <Animated.View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Payment Method</Text>

            {/* Card Payment */}
            <TouchableOpacity
              onPress={() => setPaymentMethod('card')}
              style={[
                styles.paymentMethodCard,
                paymentMethod === 'card' && styles.selectedPaymentMethod
              ]}
            >
              <View style={styles.paymentMethodContent}>
                <CreditCard 
                  size={20} 
                  color={paymentMethod === 'card' ? '#FF6B35' : '#6B7280'} 
                />
                <Text style={styles.paymentMethodText}>Card Payment</Text>
                {paymentMethod === 'card' && (
                  <View style={styles.selectedPaymentIndicator}>
                    <Check size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Apple Pay */}
            <TouchableOpacity
              onPress={() => setPaymentMethod('apple')}
              style={[
                styles.paymentMethodCard,
                paymentMethod === 'apple' && styles.selectedPaymentMethod
              ]}
            >
              <View style={styles.paymentMethodContent}>
                <Text style={styles.appleIcon}>🍎</Text>
                <Text style={styles.paymentMethodText}>Apple Pay</Text>
                {paymentMethod === 'apple' && (
                  <View style={styles.selectedPaymentIndicator}>
                    <Check size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Cash on Delivery */}
            <TouchableOpacity
              onPress={() => setPaymentMethod('cash')}
              style={[
                styles.paymentMethodCard,
                paymentMethod === 'cash' && styles.selectedPaymentMethod
              ]}
            >
              <View style={styles.paymentMethodContent}>
                <Wallet 
                  size={20} 
                  color={paymentMethod === 'cash' ? '#FF6B35' : '#6B7280'} 
                />
                <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
                {paymentMethod === 'cash' && (
                  <View style={styles.selectedPaymentIndicator}>
                    <Check size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        );

      case 3: // Review
        return (
          <Animated.View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review Order</Text>

            <View style={styles.reviewCard}>
              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Delivery Address</Text>
                <Text style={styles.reviewValue}>123 Main Street, Tashkent</Text>
              </View>
              
              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Payment Method</Text>
                <Text style={styles.reviewValue}>
                  {paymentMethod === 'card' && 'Card Payment'}
                  {paymentMethod === 'apple' && 'Apple Pay'}
                  {paymentMethod === 'cash' && 'Cash on Delivery'}
                </Text>
              </View>
              
              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Order Summary</Text>
                <View style={styles.orderSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery Fee</Text>
                    <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax</Text>
                    <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('checkout') || 'Checkout'}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepsContainer}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                step >= s && styles.activeStepCircle
              ]}>
                {step > s ? (
                  <Check size={16} color="#FFFFFF" />
                ) : (
                  <Text style={[
                    styles.stepNumber,
                    step >= s && styles.activeStepNumber
                  ]}>
                    {s}
                  </Text>
                )}
              </View>
              {s < 3 && (
                <View style={[
                  styles.stepLine,
                  step > s && styles.activeStepLine
                ]} />
              )}
            </View>
          ))}
        </View>

        {/* Step Labels */}
        <View style={styles.stepLabels}>
          <Text style={[
            styles.stepLabel,
            step >= 1 && styles.activeStepLabel
          ]}>
            {t('address') || 'Address'}
          </Text>
          <Text style={[
            styles.stepLabel,
            step >= 2 && styles.activeStepLabel
          ]}>
            {t('payment') || 'Payment'}
          </Text>
          <Text style={[
            styles.stepLabel,
            step >= 3 && styles.activeStepLabel
          ]}>
            {t('review') || 'Review'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderStepContent()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {step < 3 ? (
          <TouchableOpacity
            onPress={() => setStep(step + 1)}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={styles.placeOrderButton}
          >
            <Text style={styles.placeOrderButtonText}>
              {t('placeOrder') || 'Place Order'}
            </Text>
          </TouchableOpacity>
        )}
        
        {step > 1 && (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            style={styles.backButtonSecondary}
          >
            <Text style={styles.backButtonSecondaryText}>Back</Text>
          </TouchableOpacity>
        )}
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
  stepperContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepCircle: {
    backgroundColor: '#FF6B35',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeStepNumber: {
    color: '#FFFFFF',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: '#FF6B35',
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  stepLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    flex: 1,
  },
  activeStepLabel: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  stepContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  selectedAddressCard: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  addressCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addAddressButton: {
    height: 48,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addAddressText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FF6B35',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  selectedPaymentIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  reviewSection: {
    gap: 8,
  },
  reviewLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  orderSummary: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  continueButton: {
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
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderButton: {
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
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonSecondary: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonSecondaryText: {
    fontSize: 16,
    color: '#6B7280',
  },
});