import { Image } from 'expo-image';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type ProfileButtonProps = {
  onPress?: () => void;
  size?: number;
};

export function ProfileButton({ onPress, size = 40 }: ProfileButtonProps) {
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        profileIcon: {
          width: size,
          height: size,
          overflow: 'hidden',
        },
        avatarImage: {
          width: '100%',
          height: '100%',
        },
      }),
    [size]
  );

  if (!onPress) {
    return <View style={[styles.button, { width: size, height: size }]} />;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { width: size, height: size }]}
    >
      <View style={dynamicStyles.profileIcon}>
        <Image
          source={require('@/assets/images/avatar.png')}
          style={dynamicStyles.avatarImage}
          contentFit='cover'
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
