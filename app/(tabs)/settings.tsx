import { useMemo } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        profileSection: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
          marginBottom: 20,
        },
        profileIcon: {
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        },
        profileEmail: {
          fontSize: 14,
          color: colors.textGray,
        },
        settingsItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        },
      }),
    [colors.borderLight, colors.primary, colors.textGray]
  );
  
  const settingsItems = [
    'Change your info',
    'Personalization',
    'Devices',
    'Notifications',
    'Language',
    'Plans & Billing information',
    'Privacy & Security',
  ];

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Settings"
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
        rightContent={<ProfileButton onPress={() => router.push('/settings')} />}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <ThemedView style={dynamicStyles.profileSection}>
          <ThemedView style={dynamicStyles.profileIcon}>
            <IconSymbol size={40} name="person.fill" color={colors.white} />
          </ThemedView>
          <ThemedView style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>Mark</ThemedText>
            <ThemedText style={dynamicStyles.profileEmail}>mark@gmail.com</ThemedText>
          </ThemedView>
          <IconSymbol size={24} name="chevron.right" color={colors.textGray} />
        </ThemedView>

        <ThemedView style={styles.settingsList}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity key={index} style={dynamicStyles.settingsItem}>
              <ThemedText style={styles.settingsItemText}>{item}</ThemedText>
              <IconSymbol size={20} name="chevron.right" color={colors.textGray} />
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingsList: {
    gap: 0,
  },
  settingsItemText: {
    fontSize: 16,
  },
});

