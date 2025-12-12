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
import { Platform } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Внутрішній компонент для навігації, який використовує тему з контексту
 */
function NavigationWrapper() {
  const { theme } = useTheme();

  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
          animationDuration: 300,
        }}
      >
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='notifications'
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name='pet/[id]'
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name='personal-information'
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name='add-pet'
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name='modal'
          options={{ presentation: 'modal', title: 'Modal' }}
        />
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
