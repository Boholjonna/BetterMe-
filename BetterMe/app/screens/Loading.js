import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        
        // Minimal delay to ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 900));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync({ fadeDuration: 250 });
        // Navigate to login after hiding splash screen
        router.replace('/screens/Login');
      }
    }

    prepare();
  }, []);

  // We don't need to render anything here since we're using the native splash screen
  return null;
}
