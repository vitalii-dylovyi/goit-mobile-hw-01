import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type FloatingActionButtonProps = {
  onPress?: () => void;
  iconName?: IconSymbolName;
  size?: number;
};

export function FloatingActionButton({
  onPress,
  iconName = 'plus',
  size = 40,
}: FloatingActionButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        fab: {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 8,
        },
        container: {
          position: 'absolute',
          right: 24,
          zIndex: 10,
          bottom: 24,
        },
      }),
    [colors.primary, size]
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[dynamicStyles.container]}
    >
      <View style={dynamicStyles.fab}>
        <IconSymbol size={size * 0.4} name={iconName} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}
