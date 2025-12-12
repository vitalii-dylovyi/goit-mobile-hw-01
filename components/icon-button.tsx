import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { OpaqueColorValue, StyleSheet, TouchableOpacity } from 'react-native';

type IconButtonProps = {
  iconName: IconSymbolName;
  onPress?: () => void;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: object;
};

export function IconButton({ iconName, onPress, size = 24, color, style }: IconButtonProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const iconColor = color ?? colors.text;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <IconSymbol size={size} name={iconName} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

