import { Calendar } from '@/components/calendar';
import { FloatingActionButton } from '@/components/floating-action-button';
import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { PetDetailsList } from '@/components/pet-details-list';
import { PetProfileHeader } from '@/components/pet-profile-header';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Timeline } from '@/components/timeline';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

// Mock data - in a real app, this would come from an API or database
const PETS_DATA: Record<
  string,
  {
    name: string;
    imageSource: any;
    details: { label: string; value: string }[];
  }
> = {
  '1': {
    name: 'Marta',
    imageSource: require('@/assets/images/pet_1.png'),
    details: [
      { label: 'Weight', value: '6,3 kg' },
      { label: 'Age', value: '6 months' },
      { label: 'Date of birth', value: '12.04.2025' },
      { label: 'Gender', value: 'Female' },
      { label: 'Breed', value: '--' },
      { label: 'Microchip number', value: '1244-3456-2369' },
      { label: 'Allergies', value: 'None' },
      { label: 'Vet clinic contact', value: '+4 567 894 5458' },
    ],
  },
  '2': {
    name: 'Robert',
    imageSource: require('@/assets/images/pet_2.png'),
    details: [
      { label: 'Weight', value: '12,5 kg' },
      { label: 'Age', value: '2 years' },
      { label: 'Date of birth', value: '15.03.2023' },
      { label: 'Gender', value: 'Male' },
      { label: 'Breed', value: 'Golden Retriever' },
      { label: 'Microchip number', value: '9876-5432-1098' },
      { label: 'Allergies', value: 'None' },
      { label: 'Vet clinic contact', value: '+4 567 894 5458' },
    ],
  },
};

export default function PetDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const calendarDays = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = today.getDay();
    // Convert to Monday = 0, Tuesday = 1, ..., Sunday = 6
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Calculate Monday of the current week
    const monday = new Date(currentYear, currentMonth, currentDay - mondayOffset);

    const dayNames = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    const days: { day: string; date: number; isSelected?: boolean }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateNumber = date.getDate();
      const isToday =
        dateNumber === currentDay &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear;

      days.push({
        day: dayNames[i],
        date: dateNumber,
        isSelected: isToday,
      });
    }

    return days;
  }, []);

  const timelineEvents = useMemo(
    () => [
      {
        time: '7:00',
        title: 'Change water (All)',
      },
    ],
    []
  );

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        petName: {
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.text,
          marginBottom: 24,
          textAlign: 'center',
        },
      }),
    [colors.text]
  );

  const pet = PETS_DATA[id || '1'];

  if (!pet) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Pet not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Header
        title={`${pet.name}'s profile`}
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
        rightContent={
          <ProfileButton
            onPress={() => {
              router.push('/personal-information');
            }}
          />
        }
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <PetProfileHeader
          imageSource={pet.imageSource}
          onEditPress={() => {
            // TODO: Navigate to edit pet screen
            console.log('Edit pet');
          }}
        />
        <ThemedText style={dynamicStyles.petName}>{pet.name}</ThemedText>
        <PetDetailsList details={pet.details} />
        <Calendar days={calendarDays} />
        <Timeline events={timelineEvents} />
      </ScrollView>
      <FloatingActionButton
        size={56}
        onPress={() => {
          // TODO: Navigate to add event screen
          console.log('Add new event');
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
    paddingHorizontal: 24,
    paddingBottom: 90, // Space for bottom navigation and FAB
  },
});

