import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

type PetDetail = {
  label: string;
  value: string;
};

type PetDetailsListProps = {
  details: PetDetail[];
};

export function PetDetailsList({ details }: PetDetailsListProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        detailRow: {
          flexDirection: 'row',
          marginBottom: 16,
          alignItems: 'flex-start',
        },
        label: {
          fontSize: 14,
          fontWeight: 'bold',
          color: colors.text,
          flex: 1,
          marginRight: 16,
        },
        value: {
          fontSize: 14,
          color: colors.textGray,
          flex: 1,
          textAlign: 'right',
        },
      }),
    [colors.text, colors.textGray]
  );

  return (
    <ThemedView style={styles.container}>
      {details.map((detail, index) => (
        <View key={index} style={dynamicStyles.detailRow}>
          <ThemedText style={dynamicStyles.label}>{detail.label}</ThemedText>
          <ThemedText style={dynamicStyles.value}>{detail.value}</ThemedText>
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
});

