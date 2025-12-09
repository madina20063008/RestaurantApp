// components/parallax-scroll-view.tsx
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// Try these different import approaches:
// Option 1: Direct relative import (if files are in same directory)
import { ThemedView } from './themed-view';

// Option 2: If hooks are in a parent directory
import { useColorScheme } from '../hooks/use-color-scheme';
import { useThemeColor } from '../hooks/use-theme-color';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  
  // Simple non-animated version for now
  return (
    <ScrollView
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}>
      <View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
        ]}>
        {headerImage}
      </View>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});