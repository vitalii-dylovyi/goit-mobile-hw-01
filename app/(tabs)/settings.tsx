import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { UserProfileHeader } from '@/components/user-profile-header';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, themeMode, setThemeMode, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        settingsItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        },
        settingsItemText: {
          fontSize: 16,
          color: colors.text,
        },
        themeText: {
          fontSize: 14,
          color: colors.textGray,
        },
      }),
    [colors.borderLight, colors.text, colors.textGray]
  );

  const handleSettingsItemPress = (item: string) => {
    if (item === 'Personal information') {
      router.push('/personal-information');
    } else {
      // TODO: Navigate to other settings screens when implemented
      console.log(`Navigate to: ${item}`);
    }
  };

  const settingsItems = [
    'Share your pets',
    'Personal information',
    'Devices',
    'Notifications',
    'Language',
    'Plans & Billing Information',
    'Privacy & Security',
  ];

  // Отримуємо текст для відображення поточної теми
  const getThemeText = () => {
    if (themeMode === 'system') {
      return 'System';
    }
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Settings"
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <UserProfileHeader
          name="Mark"
          username="@mark_jacobs"
          onEditPress={() => {
            // TODO: Navigate to edit profile screen
            console.log('Edit profile');
          }}
        />

        <ThemedView style={styles.settingsList}>
          {/* Перемикач теми */}
          <View style={dynamicStyles.settingsItem}>
            <ThemedText style={dynamicStyles.settingsItemText}>Theme</ThemedText>
            <View style={styles.themeControls}>
              <ThemedText style={dynamicStyles.themeText}>{getThemeText()}</ThemedText>
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>

          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={dynamicStyles.settingsItem}
              onPress={() => handleSettingsItemPress(item)}
            >
              <ThemedText style={dynamicStyles.settingsItemText}>{item}</ThemedText>
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
  settingsList: {
    marginTop: 8,
  },
  themeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

