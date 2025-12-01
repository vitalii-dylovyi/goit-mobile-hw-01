import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, ImageSource } from 'expo-image';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type PetProfileHeaderProps = {
  imageSource?: ImageSource;
  onEditPress?: () => void;
};

export function PetProfileHeader({ imageSource, onEditPress }: PetProfileHeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        imageContainer: {
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: colors.backgroundLight,
          overflow: 'hidden',
          marginBottom: 16,
        },
        editButton: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 3,
          borderColor: colors.white,
        },
        placeholderIcon: {
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: colors.backgroundLight,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        },
      }),
    [colors.backgroundLight, colors.primary, colors.white]
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {imageSource ? (
          <View style={dynamicStyles.imageContainer}>
            <Image source={imageSource} style={styles.petImage} contentFit='cover' />
            {onEditPress && (
              <TouchableOpacity
                onPress={onEditPress}
                activeOpacity={0.8}
                style={dynamicStyles.editButton}
              >
                <IconSymbol size={14} name='pencil.fill' color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={dynamicStyles.placeholderIcon}>
            <IconSymbol size={60} name='pawprint.fill' color={colors.primary} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageWrapper: {
    position: 'relative',
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
});

