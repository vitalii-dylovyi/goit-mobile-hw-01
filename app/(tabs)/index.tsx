import { FloatingActionButton } from '@/components/floating-action-button';
import { Header } from '@/components/header';
import { HeaderNotificationsButton } from '@/components/header-notifications-button';
import { PetCard } from '@/components/pet-card';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fetchPets, Pet } from '@/api/pets';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Стан для зберігання даних, завантаження та помилок
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Завантаження даних при монтуванні компонента
  useEffect(() => {
    loadPets();
  }, []);

  /**
   * Функція для завантаження списку тварин з API
   */
  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPets();
      setPets(data);
    } catch (err) {
      // Обробка помилок (відсутність мережі, помилка сервера тощо)
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load pets';
      setError(errorMessage);
      console.error('Error loading pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        description: {
          fontSize: 14,
          marginBottom: 20,
          color: colors.textGray,
        },
        errorText: {
          fontSize: 14,
          color: colors.primary,
          textAlign: 'center',
          marginTop: 20,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        },
      }),
    [colors.textGray, colors.primary]
  );

  /**
   * Функція для рендерингу елемента списку
   */
  const renderPetItem = ({ item }: { item: Pet }) => (
    <PetCard
      name={item.name}
      type={item.type}
      imageSource={item.img}
      onPress={() => {
        router.push(`/pet/${item.id}`);
      }}
    />
  );

  /**
   * Функція для отримання унікального ключа елемента
   */
  const keyExtractor = (item: Pet) => item.id;

  /**
   * Функція для рендерингу заголовка списку
   */
  const renderListHeader = () => (
    <View>
      <ThemedText style={styles.greeting}>Hello, Mark!</ThemedText>
      <ThemedText style={dynamicStyles.description}>
        Choose a pet to see its reminders.
      </ThemedText>
    </View>
  );

  /**
   * Функція для рендерингу стану завантаження
   */
  const renderLoading = () => (
    <View style={dynamicStyles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemedText style={[dynamicStyles.description, { marginTop: 16 }]}>
        Loading pets...
      </ThemedText>
    </View>
  );

  /**
   * Функція для рендерингу помилки
   */
  const renderError = () => (
    <View style={dynamicStyles.emptyContainer}>
      <ThemedText style={dynamicStyles.errorText}>
        {error || 'Failed to load pets'}
      </ThemedText>
      <ThemedText
        style={[dynamicStyles.description, { marginTop: 8, textAlign: 'center' }]}
      >
        Please check your internet connection and try again.
      </ThemedText>
    </View>
  );

  /**
   * Функція для рендерингу порожнього списку
   */
  const renderEmpty = () => (
    <View style={dynamicStyles.emptyContainer}>
      <ThemedText style={dynamicStyles.description}>
        No pets found. Add your first pet!
      </ThemedText>
    </View>
  );

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

      {loading ? (
        <View style={styles.contentContainer}>
          {renderListHeader()}
          {renderLoading()}
        </View>
      ) : error ? (
        <View style={styles.contentContainer}>
          {renderListHeader()}
          {renderError()}
        </View>
      ) : (
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          data={pets}
          renderItem={renderPetItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmpty}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

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
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 8,
  },
  separator: {
    height: 12,
  },
});
