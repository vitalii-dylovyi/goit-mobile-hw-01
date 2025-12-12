import { fetchPets, Pet } from '@/api/pets';
import { FloatingActionButton } from '@/components/floating-action-button';
import { Header } from '@/components/header';
import { HeaderNotificationsButton } from '@/components/header-notifications-button';
import { PetCard } from '@/components/pet-card';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { USE_OPTIMIZATIONS } from '@/config/optimization';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { toggleFavorite } from '@/store/favoritesSlice';
import {
  logRenderStatsSummary,
  resetRenderStats,
  setOptimizationPhase,
  trackRender,
} from '@/utils/render-tracker';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const renderCount = useRef(0);
  renderCount.current += 1;

  if (__DEV__) {
    trackRender('HomeScreen');
    console.log(`[HomeScreen] Render #${renderCount.current}`);
    
    if (renderCount.current === 1) {
      const phase = USE_OPTIMIZATIONS ? 'after' : 'before';
      setOptimizationPhase(phase);
      resetRenderStats();
      console.log(`\n[HomeScreen] ===== Testing ${phase.toUpperCase()} optimization =====`);
      console.log('[HomeScreen] Initial load completed');
      
      setTimeout(() => {
        logRenderStatsSummary();
        console.log('📌 IMPORTANT: Click on a favorite heart icon to see the difference!');
        console.log('   With optimization: only 1 PetCard should re-render');
        console.log('   Without optimization: ALL PetCards should re-render');
        console.log('   After clicking, check the console for render counts\n');
      }, 2000);
    }
  }

  const dispatch = useAppDispatch();

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPets();
      setPets(data);
    } catch (err) {
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

  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);

  const handlePetPressCallback = useCallback(
    (petId: string) => {
      router.push(`/pet/${petId}`);
    },
    [router]
  );
  const handlePetPressPlain = (petId: string) => {
    router.push(`/pet/${petId}`);
  };
  const handlePetPress = USE_OPTIMIZATIONS ? handlePetPressCallback : handlePetPressPlain;

  const handleFavoritePressCallback = useCallback(
    (petId: string) => {
      dispatch(toggleFavorite(petId));
    },
    [dispatch]
  );
  const handleFavoritePressPlain = (petId: string) => {
    dispatch(toggleFavorite(petId));
  };
  const handleFavoritePress = USE_OPTIMIZATIONS
    ? handleFavoritePressCallback
    : handleFavoritePressPlain;

  const renderPetItemFn = ({ item }: { item: Pet }) => {
    const isFavorite = favoriteIds.includes(item.id);

    if (__DEV__) {
      console.log(`[renderPetItem] Rendering ${item.name}, isFavorite: ${isFavorite}`);
    }

    return (
      <PetCard
        name={item.name}
        type={item.type}
        imageSource={item.img}
        petId={item.id}
        isFavorite={isFavorite}
        onPress={handlePetPress}
        onFavoritePress={handleFavoritePress}
      />
    );
  };

  const renderPetItemCallback = useCallback(renderPetItemFn, [
    favoriteIds,
    handlePetPress,
    handleFavoritePress,
  ]);
  const renderPetItem = USE_OPTIMIZATIONS ? renderPetItemCallback : renderPetItemFn;

  const keyExtractorCallback = useCallback((item: Pet) => item.id, []);
  const keyExtractor = USE_OPTIMIZATIONS ? keyExtractorCallback : (item: Pet) => item.id;

  const renderListHeaderFn = () => (
    <View>
      <ThemedText style={styles.greeting}>Hello, Mark!</ThemedText>
      <ThemedText style={dynamicStyles.description}>
        Choose a pet to see its reminders.
      </ThemedText>
    </View>
  );
  const renderListHeaderCallback = useCallback(renderListHeaderFn, [
    dynamicStyles.description,
  ]);
  const renderListHeader = USE_OPTIMIZATIONS ? renderListHeaderCallback : renderListHeaderFn;

  const renderLoadingFn = () => (
    <View style={dynamicStyles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemedText style={[dynamicStyles.description, { marginTop: 16 }]}>
        Loading pets...
      </ThemedText>
    </View>
  );
  const renderLoadingCallback = useCallback(renderLoadingFn, [
    colors.primary,
    dynamicStyles.loadingContainer,
    dynamicStyles.description,
  ]);
  const renderLoading = USE_OPTIMIZATIONS ? renderLoadingCallback : renderLoadingFn;

  const renderErrorFn = () => (
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
  const renderErrorCallback = useCallback(renderErrorFn, [
    error,
    dynamicStyles.emptyContainer,
    dynamicStyles.errorText,
    dynamicStyles.description,
  ]);
  const renderError = USE_OPTIMIZATIONS ? renderErrorCallback : renderErrorFn;

  const renderEmptyFn = () => (
    <View style={dynamicStyles.emptyContainer}>
      <ThemedText style={dynamicStyles.description}>
        No pets found. Add your first pet!
      </ThemedText>
    </View>
  );
  const renderEmptyCallback = useCallback(renderEmptyFn, [
    dynamicStyles.emptyContainer,
    dynamicStyles.description,
  ]);
  const renderEmpty = USE_OPTIMIZATIONS ? renderEmptyCallback : renderEmptyFn;

  const renderSeparatorFn = () => <View style={styles.separator} />;
  const renderSeparatorCallback = useCallback(renderSeparatorFn, []);
  const renderSeparator = USE_OPTIMIZATIONS ? renderSeparatorCallback : renderSeparatorFn;

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
          ItemSeparatorComponent={renderSeparator}
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
