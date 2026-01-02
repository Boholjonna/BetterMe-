import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any assets here if needed
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Loading" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Signup" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Goaldashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="screens/Goalist" options={{ title: 'My Goals' }} />
      <Stack.Screen name="screens/Goaledits" options={{ title: 'Edit Goal' }} />
      <Stack.Screen name="screens/History" options={{ title: 'History' }} />
      <Stack.Screen name="screens/Settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
