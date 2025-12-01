import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function PersonalInformationScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Personal information"
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <ThemedText>Personal information content will be added here</ThemedText>
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

