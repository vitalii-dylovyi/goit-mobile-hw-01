import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { Image, ImageSource } from 'expo-image';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type PetCardProps = {
  name: string;
  type: 'Dog' | 'Cat' | string;
  imageSource?: ImageSource | string;
  onPress?: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
};

export function PetCard({
  name,
  type,
  imageSource,
  onPress,
  isFavorite = false,
  onFavoritePress,
}: PetCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

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
        petName: {
          fontSize: 14,
          lineHeight: 17,
          marginBottom: 4,
          fontWeight: 'bold',
          color: colors.text,
        },
        petType: {
          fontSize: 12,
          lineHeight: 16,
          color: colors.textGray,
        },
      }),
    [colors.backgroundLight, colors.text, colors.textGray]
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
            <ThemedText style={dynamicStyles.petName}>{name}</ThemedText>
            <ThemedText style={dynamicStyles.petType}>{typeLabel}</ThemedText>
          </View>
          <View style={styles.actionsContainer}>
            {onFavoritePress && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  onFavoritePress();
                }}
                style={styles.favoriteButton}
                activeOpacity={0.7}
              >
                <IconSymbol
                  size={20}
                  name={isFavorite ? 'heart.fill' : 'heart'}
                  color={isFavorite ? colors.primary : colors.textGray}
                />
              </TouchableOpacity>
            )}
            <IconSymbol size={12} name='chevron.right' color={colors.textGray} />
          </View>
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
  petImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  favoriteButton: {
    padding: 4,
  },
});
