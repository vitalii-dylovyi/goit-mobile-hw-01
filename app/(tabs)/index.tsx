import { FloatingActionButton } from '@/components/floating-action-button';
import { Header } from '@/components/header';
import { HeaderNotificationsButton } from '@/components/header-notifications-button';
import { PetCard } from '@/components/pet-card';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        description: {
          fontSize: 14,
          marginBottom: 20,
          color: colors.textGray,
        },
      }),
    [colors.textGray]
  );

  const pets = [
    {
      id: '1',
      name: 'Marta',
      type: 'Cat',
      imageSource: require('@/assets/images/pet_1.png'),
    },
    {
      id: '2',
      name: 'Robert',
      type: 'Dog',
      imageSource: require('@/assets/images/pet_2.png'),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <Header
        title='MyPets'
        leftContent={
          <HeaderNotificationsButton onPress={() => router.push('/notifications')} />
        }
        rightContent={
          <ProfileButton
            onPress={() => {
              router.push('/personal-information');
            }}
          />
        }
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <ThemedText style={styles.greeting}>Hello, Mark!</ThemedText>
        <ThemedText style={dynamicStyles.description}>
          Choose a pet to see its reminders.
        </ThemedText>

        <ThemedView style={styles.petsContainer}>
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              type={pet.type}
              imageSource={pet.imageSource}
              onPress={() => {
                router.push(`/pet/${pet.id}`);
              }}
            />
          ))}
        </ThemedView>
      </ScrollView>
      <FloatingActionButton
        onPress={() => {
          // TODO: Navigate to add pet screen
          console.log('Add new pet');
        }}
      />
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
    paddingBottom: 180, // Space for bottom navigation and FAB
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 8,
  },
  petsContainer: {
    gap: 12,
    display: 'flex',
    flexDirection: 'column',
  },
});
