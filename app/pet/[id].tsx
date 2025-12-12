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
import { useTheme } from '@/contexts/theme-context';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

dayjs.extend(isoWeek);

function convertPetToDetails(pet: Pet): { label: string; value: string }[] {
  const birthDate = dayjs(pet.birthdate);
  const today = dayjs();
  const ageInMonths = today.diff(birthDate, 'month');
  const ageText =
    ageInMonths < 12
      ? `${ageInMonths} months`
      : `${Math.floor(ageInMonths / 12)} years`;

  const formattedBirthdate = birthDate.format('DD/MM/YYYY');

  const formattedWeight = `${pet.weight} kg`;
  const formattedGender =
    pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1);

  return [
    { label: 'Weight', value: formattedWeight },
    { label: 'Age', value: ageText },
    { label: 'Date of birth', value: formattedBirthdate },
    { label: 'Gender', value: formattedGender },
    { label: 'Breed', value: pet.breed || '--' },
    { label: 'Microchip number', value: '--' },
    { label: 'Allergies', value: 'None' },
    { label: 'Vet clinic contact', value: '--' },
  ];
}

export default function PetDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPet = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPetById(id);
      setPet(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load pet';
      setError(errorMessage);
      console.error('Error loading pet:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadPet();
    }
  }, [id, loadPet]);

  const calendarDays = useMemo(() => {
    const today = dayjs();
    const monday = today.startOf('isoWeek');

    const dayNames = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    const days: { day: string; date: number; isSelected?: boolean }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = monday.add(i, 'day');
      const dateNumber = date.date();
      const isToday = date.isSame(today, 'day');

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

  const petDetails = useMemo(() => {
    if (!pet) return [];
    return convertPetToDetails(pet);
  }, [pet]);

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
    paddingBottom: 90,
  },
});

