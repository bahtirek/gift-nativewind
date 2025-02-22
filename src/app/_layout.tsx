import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { setInitialLocation } from '@signals/location.signal'

import { useColorScheme } from '@/hooks/useColorScheme';
import "../../global.css";
import CartProvider from '@/providers/CartProvider';
import GiftCardProvider from '@/providers/GiftCardProvider';
import SearchSettingsProvider from '@/providers/SearchSettingsProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  setInitialLocation();

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SearchSettingsProvider>
        <GiftCardProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="purchase-modal" options={{ presentation: 'modal' }} />
              <Stack.Screen name="search-settings-modal" options={{ presentation: 'modal' }} />
            </Stack>
          </CartProvider>
        </GiftCardProvider>
      </SearchSettingsProvider>
    </ThemeProvider>
  );
}
