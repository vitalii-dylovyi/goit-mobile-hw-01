import { fetchPetById, Pet } from '@/api/pets';
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

/**
 * Конвертує дані тварини з API у формат деталей для відображення
 */
function convertPetToDetails(pet: Pet): { label: string; value: string }[] {
  // Обчислюємо вік на основі дати народження
  const birthDate = new Date(pet.birthdate);
  const today = new Date();
  const ageInMonths = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  const ageText =
    ageInMonths < 12
      ? `${ageInMonths} months`
      : `${Math.floor(ageInMonths / 12)} years`;

  // Форматуємо дату народження
  const formattedBirthdate = birthDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Форматуємо вагу
  const formattedWeight = `${pet.weight} kg`;

  // Форматуємо стать (capitalize first letter)
  const formattedGender =
    pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1);

  return [
    { label: 'Weight', value: formattedWeight },
    { label: 'Age', value: ageText },
    { label: 'Date of birth', value: formattedBirthdate },
    { label: 'Gender', value: formattedGender },
    { label: 'Breed', value: pet.breed || '--' },
    { label: 'Microchip number', value: '--' }, // Не надається API
    { label: 'Allergies', value: 'None' }, // Не надається API
    { label: 'Vet clinic contact', value: '--' }, // Не надається API
  ];
}

export default function PetDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Стан для зберігання даних тварини, завантаження та помилок
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Функція для завантаження даних тварини з API
   */
  const loadPet = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPetById(id);
      setPet(data);
    } catch (err) {
      // Обробка помилок (відсутність мережі, тварина не знайдена тощо)
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load pet';
      setError(errorMessage);
      console.error('Error loading pet:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Завантаження даних тварини при монтуванні компонента або зміні ID
  useEffect(() => {
    if (id) {
      loadPet();
    }
  }, [id, loadPet]);

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
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        },
        errorContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
          paddingHorizontal: 24,
        },
        errorText: {
          fontSize: 16,
          color: colors.primary,
          textAlign: 'center',
          marginBottom: 8,
        },
      }),
    [colors.text, colors.primary]
  );

  // Конвертуємо дані тварини у формат деталей
  const petDetails = useMemo(() => {
    if (!pet) return [];
    return convertPetToDetails(pet);
  }, [pet]);

  // Відображення стану завантаження
  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Header
          title="Pet Profile"
          leftContent={<HeaderBackButton onPress={() => router.back()} />}
          rightContent={
            <ProfileButton
              onPress={() => {
                router.push('/personal-information');
              }}
            />
          }
        />
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText style={[dynamicStyles.petName, { marginTop: 16 }]}>
            Loading pet...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Відображення помилки
  if (error || !pet) {
    return (
      <ThemedView style={styles.container}>
        <Header
          title="Pet Profile"
          leftContent={<HeaderBackButton onPress={() => router.back()} />}
          rightContent={
            <ProfileButton
              onPress={() => {
                router.push('/personal-information');
              }}
            />
          }
        />
        <View style={dynamicStyles.errorContainer}>
          <ThemedText style={dynamicStyles.errorText}>
            {error || 'Pet not found'}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              color: colors.textGray,
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Please check your internet connection and try again.
          </ThemedText>
        </View>
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
          imageSource={pet.img}
          onEditPress={() => {
            // TODO: Navigate to edit pet screen
            console.log('Edit pet');
          }}
        />
        <ThemedText style={dynamicStyles.petName}>{pet.name}</ThemedText>
        <PetDetailsList details={petDetails} />
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

