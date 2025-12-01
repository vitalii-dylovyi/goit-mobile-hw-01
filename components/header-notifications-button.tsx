import { IconButton } from '@/components/icon-button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { StyleSheet } from 'react-native';

type HeaderNotificationsButtonProps = {
  onPress: () => void;
};

export function HeaderNotificationsButton({ onPress }: HeaderNotificationsButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <IconButton
      iconName='bell.fill'
      onPress={onPress}
      color={colors.primary}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
});
