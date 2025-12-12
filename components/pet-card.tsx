import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, ImageSource } from 'expo-image';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type PetCardProps = {
  name: string;
  type: 'Dog' | 'Cat' | string;
  imageSource?: ImageSource | string; // Підтримка як локальних зображень, так і URL
  onPress?: () => void;
};

export function PetCard({ name, type, imageSource, onPress }: PetCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        imageContainer: {
          width: 80,
          height: 80,
          overflow: 'hidden',
          backgroundColor: colors.backgroundLight,
        },
        placeholderIcon: {
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.backgroundLight,
        },
      }),
    [colors.backgroundLight]
  );

  const typeLabel = `Your ${type}`;

  const cardStyles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          display: 'flex',
          borderRadius: 16,
          overflow: 'hidden',
          flexDirection: 'row',
          backgroundColor: colors.cardBackground,
        },
      }),
    [colors.cardBackground]
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={cardStyles.card}>
        {imageSource ? (
          <View style={dynamicStyles.imageContainer}>
            <Image
              source={imageSource}
              style={styles.petImage}
              contentFit='cover'
            />
          </View>
        ) : (
          <View style={dynamicStyles.placeholderIcon}>
            <IconSymbol size={40} name='pawprint.fill' color={colors.primary} />
          </View>
        )}

        <View style={styles.cardContent}>
          <View style={styles.petInfo}>
            <ThemedText style={styles.petName}>{name}</ThemedText>
            <ThemedText style={styles.petType}>{typeLabel}</ThemedText>
          </View>
          <IconSymbol size={12} name='chevron.right' color={colors.textGray} />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  petInfo: {
    flex: 1,
    display: 'flex',
  },
  petName: {
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 4,
    fontWeight: 'bold',
    color: Colors.light.black,
  },
  petType: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textGray,
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
});
