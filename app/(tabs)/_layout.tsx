import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { TabButton } from '@/components/tab-button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
          height: 75,
          paddingBottom: 12,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'My Pets',
          tabBarIcon: ({ color }) => (
            <TabButton iconName='pawprint.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='agenda'
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => (
            <TabButton iconName='calendar' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabButton iconName='gearshape.fill' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
