// components/SplashScreen.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Sequence animations
    Animated.sequence([
      // Fade in whole screen
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Scale and fade in icon container
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          delay: 200,
          stiffness: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          delay: 200,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Text animation
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: 0,
          delay: 500,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          delay: 500,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        opacity: fadeAnim,
      }}
    >
      <LinearGradient
        colors={["#FF6B35", "#ff8c61"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <View 
          style={{ 
            flex: 1, 
            width: "100%", 
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Animated.View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: scaleAnim,
              transform: [{ scale: scaleAnim }],
            }}
          >
            {/* Icon Container */}
            <View
              style={{
                width: 96,
                height: 96,
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 25,
                },
                shadowOpacity: 0.25,
                shadowRadius: 50,
                elevation: 25,
              }}
            >
              <MaterialCommunityIcons 
                name="silverware-fork-knife" 
                size={56} 
                color="#FF6B35" 
              />
            </View>

            {/* Text */}
            <Animated.Text
              style={{
                color: "#FFFFFF",
                fontSize: 36,
                letterSpacing: -0.025 * 16,
                fontWeight: "bold",
                fontFamily: Platform.select({
                  ios: "System",
                  android: "Roboto",
                }),
                transform: [{ translateY: translateYAnim }],
                opacity: translateYAnim.interpolate({
                  inputRange: [0, 20],
                  outputRange: [1, 0],
                }),
              }}
            >
              FoodHub
            </Animated.Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}