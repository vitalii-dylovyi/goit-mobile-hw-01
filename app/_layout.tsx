import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { ThemeProvider, useTheme } from '@/contexts/theme-context';
import { store } from '@/store/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Внутрішній компонент для навігації, який використовує тему з контексту
 */
function NavigationWrapper() {
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='notifications' options={{ headerShown: false }} />
        <Stack.Screen name='pet/[id]' options={{ headerShown: false }} />
        <Stack.Screen name='personal-information' options={{ headerShown: false }} />
        <Stack.Screen name='modal' options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

/**
 * Кореневий компонент додатку
 * Обгортає додаток в Redux Provider та ThemeProvider
 */
export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationWrapper />
      </ThemeProvider>
    </Provider>
  );
}
