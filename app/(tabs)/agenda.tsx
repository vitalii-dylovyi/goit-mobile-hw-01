import { Header } from '@/components/header';
import { ProfileButton } from '@/components/profile-button';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function AgendaScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Agenda"
        rightContent={
          <ProfileButton
            onPress={() => {
              router.push('/personal-information');
            }}
          />
        }
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Agenda content will be added here */}
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

