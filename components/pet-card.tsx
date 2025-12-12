import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { USE_OPTIMIZATIONS } from '@/config/optimization';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { trackRender } from '@/utils/render-tracker';
import { Image, ImageSource } from 'expo-image';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type PetCardProps = {
  name: string;
  type: 'Dog' | 'Cat' | string;
  imageSource?: ImageSource | string;
  petId: string;
  onPress?: (petId: string) => void;
  isFavorite?: boolean;
  onFavoritePress?: (petId: string) => void;
};

function PetCardComponent({
  name,
  type,
  imageSource,
  petId,
  onPress,
  isFavorite = false,
  onFavoritePress,
}: PetCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const renderCount = useRef(0);
  renderCount.current += 1;

  if (__DEV__) {
    trackRender(`PetCard-${name}`);
    console.log(
      `[PetCard] Render #${renderCount.current}: ${name}, isFavorite: ${isFavorite}`
    );
  }

  const scale = useSharedValue(1);

  useEffect(() => {
    if (isFavorite) {
      scale.value = withSpring(1.15, { damping: 8, stiffness: 300 });
    } else {
      scale.value = withSpring(1, { damping: 8, stiffness: 300 });
    }
  }, [isFavorite, scale]);

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

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

  const typeLabelMemo = useMemo(() => `Your ${type}`, [type]);
  const typeLabel = USE_OPTIMIZATIONS ? typeLabelMemo : `Your ${type}`;

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

  const handlePress = () => {
    onPress?.(petId);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
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
                  scale.value = withSpring(1.25, { damping: 6, stiffness: 400 }, () => {
                    scale.value = withSpring(isFavorite ? 1.15 : 1, { damping: 8, stiffness: 300 });
                  });
                  onFavoritePress?.(petId);
                }}
                style={styles.favoriteButton}
                activeOpacity={0.7}
              >
                <Animated.View 
                  style={[
                    animatedHeartStyle, 
                    { 
                      backgroundColor: 'transparent',
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
                  ]}
                >
                  <IconSymbol
                    size={20}
                    name={isFavorite ? 'heart.fill' : 'heart'}
                    color={isFavorite ? colors.primary : colors.textGray}
                  />
                </Animated.View>
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

const PetCardMemoized = React.memo(PetCardComponent, (prevProps, nextProps) => {
  const isEqual =
    prevProps.name === nextProps.name &&
    prevProps.type === nextProps.type &&
    prevProps.imageSource === nextProps.imageSource &&
    prevProps.petId === nextProps.petId &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.onFavoritePress === nextProps.onFavoritePress;

  if (__DEV__ && !isEqual) {
    console.log('[PetCard] Props changed, will re-render:', {
      name: prevProps.name !== nextProps.name,
      type: prevProps.type !== nextProps.type,
      imageSource: prevProps.imageSource !== nextProps.imageSource,
      isFavorite: prevProps.isFavorite !== nextProps.isFavorite,
      onPress: prevProps.onPress !== nextProps.onPress,
      onFavoritePress: prevProps.onFavoritePress !== nextProps.onFavoritePress,
    });
  } else if (__DEV__ && isEqual) {
    console.log(`[PetCard] Props unchanged, skipping re-render for: ${prevProps.name}`);
  }

  return isEqual;
});

export const PetCard = USE_OPTIMIZATIONS ? PetCardMemoized : PetCardComponent;
