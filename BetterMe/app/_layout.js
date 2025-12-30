import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="screens/Goaldashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="screens/Goalist" options={{ title: 'My Goals' }} />
      <Stack.Screen name="screens/Goaledits" options={{ title: 'Edit Goal' }} />
      <Stack.Screen name="screens/History" options={{ title: 'History' }} />
      <Stack.Screen name="screens/Settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
