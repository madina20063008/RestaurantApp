import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';

export default function OrdersScreen() {
  const { t } = useLanguage();

  const orders = [
    {
      id: '#FH-001',
      restaurant: 'Pizza Paradise',
      items: 3,
      total: 28.47,
      status: 'delivered',
      date: 'Dec 5, 2025',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400',
    },
    {
      id: '#FH-002',
      restaurant: 'Burger House',
      items: 2,
      total: 18.99,
      status: 'ongoing',
      date: 'Dec 6, 2025',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    },
    {
      id: '#FH-003',
      restaurant: 'Sushi Master',
      items: 4,
      total: 45.50,
      status: 'cancelled',
      date: 'Dec 4, 2025',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <MaterialIcons name="check-circle" size={20} color="#10B981" />;
      case 'ongoing':
        return <MaterialIcons name="access-time" size={20} color="#FF6B35" />;
      case 'cancelled':
        return <MaterialIcons name="cancel" size={20} color="#EF4444" />;
      default:
        return <MaterialIcons name="inventory" size={20} color="#9CA3AF" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return { backgroundColor: '#D1FAE5', color: '#10B981' };
      case 'ongoing':
        return { backgroundColor: '#FFEDD5', color: '#FF6B35' };
      case 'cancelled':
        return { backgroundColor: '#FEE2E2', color: '#EF4444' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'ongoing':
        return 'Ongoing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
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
            {t('orders')}
          </Text>
        </View>

        {/* Orders List */}
        <View style={{ paddingHorizontal: 24, gap: 16 }}>
          {orders.map((order, index) => {
            const statusStyle = getStatusColor(order.status);
            
            return (
              <View
                key={order.id}
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 16,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <View style={{ flexDirection: "row", gap: 16, marginBottom: 12 }}>
                  <Image 
                    source={{ uri: order.image }}
                    style={{ width: 64, height: 64, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 1 }}>
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
                      {order.restaurant}
                    </Text>
                    <Text style={{ 
                      color: "#6B7280", 
                      fontSize: 14,
                    }}>
                      {order.items} items • {t('currency')}{order.total.toFixed(2)}
                    </Text>
                  </View>
                  {getStatusIcon(order.status)}
                </View>
                
                <View style={{ 
                  flexDirection: "row", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTopWidth: 1,
                  borderTopColor: "#F3F4F6",
                }}>
                  <Text style={{ 
                    color: "#6B7280", 
                    fontSize: 14,
                  }}>
                    {order.date}
                  </Text>
                  <View style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: statusStyle.backgroundColor,
                    borderRadius: 8,
                  }}>
                    <Text style={{
                      color: statusStyle.color,
                      fontSize: 14,
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                {order.status === 'delivered' && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      width: "100%",
                      height: 40,
                      marginTop: 12,
                      borderWidth: 1,
                      borderColor: "#FF6B35",
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{
                      color: "#FF6B35",
                      fontSize: 14,
                      fontWeight: "600",
                    }}>
                      {t('orderAgain')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}