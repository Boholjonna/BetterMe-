import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  useEffect(() => {
    // Simulate loading time (2 seconds)
    const timer = setTimeout(() => {
      router.replace('/screens/Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#33DB00" />
    </View>
  );
}

