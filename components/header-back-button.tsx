import { IconButton } from '@/components/icon-button';
import { StyleSheet } from 'react-native';

type HeaderBackButtonProps = {
  onPress: () => void;
};

export function HeaderBackButton({ onPress }: HeaderBackButtonProps) {
  return (
    <IconButton
      iconName='chevron.left'
      onPress={onPress}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
});

