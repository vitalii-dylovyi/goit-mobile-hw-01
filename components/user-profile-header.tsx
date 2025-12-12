import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { Image, ImageSource } from 'expo-image';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type UserProfileHeaderProps = {
  imageSource?: ImageSource;
  name: string;
  username: string;
  onEditPress?: () => void;
};

export function UserProfileHeader({
  imageSource,
  name,
  username,
  onEditPress,
}: UserProfileHeaderProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

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
        name: {
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.text,
          marginBottom: 4,
          textAlign: 'center',
        },
        username: {
          fontSize: 14,
          color: colors.textGray,
          textAlign: 'center',
        },
      }),
    [colors.backgroundLight, colors.primary, colors.white, colors.text, colors.textGray]
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
            <IconSymbol size={60} name='person.fill' color={colors.primary} />
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
        )}
      </View>
      <ThemedText style={dynamicStyles.name}>{name}</ThemedText>
      <ThemedText style={dynamicStyles.username}>{username}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageWrapper: {
    position: 'relative',
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
});

