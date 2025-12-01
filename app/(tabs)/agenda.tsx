import { StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/header';
import { ProfileButton } from '@/components/profile-button';
import { ThemedView } from '@/components/themed-view';

export default function AgendaScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header title="Agenda" rightContent={<ProfileButton />} />
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

