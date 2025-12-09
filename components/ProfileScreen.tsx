import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';

export default function ProfileScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { navigate } = useNavigation();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'uz' as const, name: 'O\'zbek', flag: '🇺🇿' },
    { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}>
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}>
          <Text style={{
            color: "#111827",
            fontSize: 24,
            fontWeight: "600",
            marginBottom: 24,
            fontFamily: Platform.select({
              ios: "System",
              android: "Roboto",
            }),
          }}>
            {t('profile')}
          </Text>
          
          {/* Profile Card */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ overflow: "hidden", borderRadius: 16 }}
          >
            <LinearGradient
              colors={["#FF6B35", "#ff8c61"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                padding: 16,
              }}
            >
              <View style={{
                width: 64,
                height: 64,
                backgroundColor: "#FFFFFF",
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
              }}>
                <MaterialIcons name="person" size={32} color="#FF6B35" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 4,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}>
                  John Doe
                </Text>
                <Text style={{ 
                  color: "rgba(255, 255, 255, 0.9)", 
                  fontSize: 14,
                }}>
                  john.doe@example.com
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Language Switcher */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{
            color: "#111827",
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 12,
            fontFamily: Platform.select({
              ios: "System",
              android: "Roboto",
            }),
          }}>
            {t('language')}
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                activeOpacity={0.7}
                onPress={() => setLanguage(lang.code)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: language === lang.code ? "#FF6B35" : "#E5E7EB",
                  backgroundColor: language === lang.code ? "#FEF3C7" : "#FFFFFF",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>
                  {lang.flag}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: language === lang.code ? "#FF6B35" : "#6B7280",
                  fontWeight: language === lang.code ? "600" : "400",
                }}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{
            color: "#111827",
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 12,
            fontFamily: Platform.select({
              ios: "System",
              android: "Roboto",
            }),
          }}>
            {t('settings')}
          </Text>
          <View style={{ gap: 8 }}>
            <SettingItem
              icon="notifications"
              label={t('notifications')}
              onPress={() => {}}
            />
            <SettingItem
              icon="shield"
              label={t('privacyPolicy')}
              onPress={() => navigate('privacy')}
            />
            <SettingItem
              icon="description"
              label={t('termsConditions')}
              onPress={() => navigate('terms')}
            />
            <SettingItem
              icon="logout"
              label={t('logout')}
              onPress={() => {}}
              danger
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

interface SettingItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

function SettingItem({ icon, label, onPress, danger = false }: SettingItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 16,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
      }}
    >
      <MaterialIcons 
        name={icon as any} 
        size={20} 
        color={danger ? "#EF4444" : "#6B7280"} 
      />
      <Text style={{
        flex: 1,
        color: danger ? "#EF4444" : "#111827",
        fontSize: 16,
        fontFamily: Platform.select({
          ios: "System",
          android: "Roboto",
        }),
      }}>
        {label}
      </Text>
      <MaterialIcons 
        name="chevron-right" 
        size={20} 
        color={danger ? "#EF4444" : "#9CA3AF"} 
      />
    </TouchableOpacity>
  );
}