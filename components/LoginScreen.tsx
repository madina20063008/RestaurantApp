// components/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';

interface LoginScreenProps {
  onLogin: () => void;
}

// Create simple icon components without moti
const MailIcon = ({ size = 20, color = "#9CA3AF" }) => (
  <MaterialIcons name="mail" size={size} color={color} />
);

const LockIcon = ({ size = 20, color = "#9CA3AF" }) => (
  <MaterialIcons name="lock" size={size} color={color} />
);

const EyeIcon = ({ size = 20, color = "#9CA3AF" }) => (
  <MaterialIcons name="visibility" size={size} color={color} />
);

const EyeOffIcon = ({ size = 20, color = "#9CA3AF" }) => (
  <MaterialIcons name="visibility-off" size={size} color={color} />
);

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  const handleSubmit = () => {
    onLogin();
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ 
          flex: 1, 
          minHeight: "100%",
          paddingHorizontal: 32,
          paddingTop: 64,
          paddingBottom: 32,
        }}>
          <Text style={{
            color: "#111827",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 8,
            fontFamily: Platform.select({
              ios: "System",
              android: "Roboto",
            }),
          }}>
            {t('login')}
          </Text>
          
          <Text style={{
            color: "#6B7280",
            fontSize: 16,
            marginBottom: 48,
            fontFamily: Platform.select({
              ios: "System",
              android: "Roboto",
            }),
          }}>
            Welcome back to FoodHub
          </Text>

          {/* Email Input */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              color: "#374151",
              fontSize: 14,
              marginBottom: 8,
              fontFamily: Platform.select({
                ios: "System",
                android: "Roboto",
              }),
            }}>
              {t('email')}
            </Text>
            <View style={{ position: "relative" }}>
              <View style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: [{ translateY: -10 }],
                zIndex: 10,
              }}>
                <MailIcon size={20} color="#9CA3AF" />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                placeholderTextColor="#9CA3AF"
                style={{
                  width: "100%",
                  height: 56,
                  paddingLeft: 48,
                  paddingRight: 16,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 16,
                  fontSize: 16,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                  backgroundColor: "#FFFFFF",
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              color: "#374151",
              fontSize: 14,
              marginBottom: 8,
              fontFamily: Platform.select({
                ios: "System",
                android: "Roboto",
              }),
            }}>
              {t('password')}
            </Text>
            <View style={{ position: "relative" }}>
              <View style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: [{ translateY: -10 }],
                zIndex: 10,
              }}>
                <LockIcon size={20} color="#9CA3AF" />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                style={{
                  width: "100%",
                  height: 56,
                  paddingLeft: 48,
                  paddingRight: 48,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 16,
                  fontSize: 16,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                  backgroundColor: "#FFFFFF",
                }}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -10 }],
                  zIndex: 10,
                }}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} color="#9CA3AF" />
                ) : (
                  <EyeIcon size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View>
            <TouchableOpacity style={{ alignSelf: "flex-start" }}>
              <Text style={{
                color: "#FF6B35",
                fontSize: 14,
                fontFamily: Platform.select({
                  ios: "System",
                  android: "Roboto",
                }),
              }}>
                {t('forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.7}
              style={{
                width: "100%",
                height: 56,
                backgroundColor: "#FF6B35",
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#FF6B35",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
              }}
            >
              <Text style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: Platform.select({
                  ios: "System",
                  android: "Roboto",
                }),
              }}>
                {t('login')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Divider */}
          <View style={{ marginTop: 32 }}>
            <View style={{ position: "relative" }}>
              <View style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 1,
                backgroundColor: "#E5E7EB",
              }} />
              <View style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Text style={{
                  backgroundColor: "#FFFFFF",
                  paddingHorizontal: 16,
                  color: "#6B7280",
                  fontSize: 14,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}>
                  {t('continueWith')}
                </Text>
              </View>
            </View>

            {/* Social Login Buttons */}
            <View style={{ 
              marginTop: 24,
              flexDirection: "row",
              gap: 16,
            }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  height: 48,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Text style={{ fontSize: 20 }}>🍎</Text>
                <Text style={{
                  color: "#374151",
                  fontSize: 14,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}>
                  Apple
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  height: 48,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Text style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#374151",
                }}>
                  G
                </Text>
                <Text style={{
                  color: "#374151",
                  fontSize: 14,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}>
                  Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up */}
          <View style={{ 
            marginTop: 32,
            alignItems: "center",
          }}>
            <Text style={{
              color: "#6B7280",
              fontSize: 14,
              fontFamily: Platform.select({
                ios: "System",
                android: "Roboto",
              }),
            }}>
              Don't have an account?{' '}
              <Text style={{
                color: "#FF6B35",
                fontWeight: "600",
              }}>
                {t('signup')}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}