import { StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Notifications"
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
        rightContent={<ProfileButton />}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <ThemedText>No notifications yet</ThemedText>
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
});

