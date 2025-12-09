import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform, Animated } from "react-native";
import { ChevronRight, MapPin, Clock, Package } from "lucide-react-native";
import { useLanguage } from "@/context/LanguageContext";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      icon: MapPin,
      titleKey: "onboarding1Title",
      descKey: "onboarding1Desc",
      color: "#FF6B35",
    },
    {
      icon: Clock,
      titleKey: "onboarding2Title",
      descKey: "onboarding2Desc",
      color: "#2D5016",
    },
    {
      icon: Package,
      titleKey: "onboarding3Title",
      descKey: "onboarding3Desc",
      color: "#FF6B35",
    },
  ];

  useEffect(() => {
    // Animate slide change
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset and animate in new slide
      fadeAnim.setValue(0);
      translateXAnim.setValue(300);
      
      Animated.parallel([
        Animated.spring(translateXAnim, {
          toValue: 0,
          stiffness: 300,
          damping: 30,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const Icon = slides[currentSlide].icon;

  return (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        opacity: fadeAnim,
      }}
    >
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        {/* Main Content */}
        <View 
          style={{ 
            flex: 1, 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
          }}
        >
          <Animated.View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              transform: [{ translateX: translateXAnim }],
            }}
          >
            {/* Icon Container */}
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${slides[currentSlide].color}15`,
              }}
            >
              <Icon size={64} color={slides[currentSlide].color} />
            </View>

            {/* Text Content */}
            <View style={{ alignItems: "center", gap: 12 }}>
              <Text
                style={{
                  color: "#111827",
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: 384,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}
              >
                {t(slides[currentSlide].titleKey)}
              </Text>
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 16,
                  textAlign: "center",
                  maxWidth: 320,
                  fontFamily: Platform.select({
                    ios: "System",
                    android: "Roboto",
                  }),
                }}
              >
                {t(slides[currentSlide].descKey)}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Pagination Dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: index === currentSlide ? "#FF6B35" : "#D1D5DB",
                width: index === currentSlide ? 32 : 8,
              }}
            />
          ))}
        </View>

        {/* Continue Button */}
        <View style={{ paddingHorizontal: 32, paddingBottom: 48 }}>
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.7}
            style={{
              width: "100%",
              height: 56,
              backgroundColor: "#FF6B35",
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
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
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: Platform.select({
                  ios: "System",
                  android: "Roboto",
                }),
              }}
            >
              {currentSlide === slides.length - 1
                ? t("getStarted")
                : t("continueWith")}
            </Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}