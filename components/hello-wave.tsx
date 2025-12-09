// components/hello-wave.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function HelloWave() {
  return <Text style={{ fontSize: 28 }}>👋</Text>;
}


const styles = StyleSheet.create({
  wave: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});