import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UserProfileHeader } from '@/components/user-profile-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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
      }),
    [colors.borderLight]
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
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={dynamicStyles.settingsItem}
              onPress={() => handleSettingsItemPress(item)}
            >
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
  settingsList: {
    marginTop: 8,
  },
  settingsItemText: {
    fontSize: 16,
    color: Colors.light.text,
  },
});

