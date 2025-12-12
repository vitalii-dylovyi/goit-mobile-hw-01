import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterChip({ label, active, onPress }: FilterChipProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        chip: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: active ? colors.primary : colors.cardBackground,
          marginRight: 8,
          borderWidth: 1,
          borderColor: active ? colors.primary : colors.borderLight,
        },
        chipText: {
          fontSize: 14,
          fontWeight: active ? '600' : '400',
          color: active ? '#FFFFFF' : colors.text,
        },
      }),
    [colors, active]
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={dynamicStyles.chip}>
        <ThemedText style={dynamicStyles.chipText}>{label}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

type FilterChipsProps = {
  filters: { label: string; value: string; active: boolean }[];
  onFilterPress: (value: string) => void;
};

export function FilterChips({ filters, onFilterPress }: FilterChipsProps) {
  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <FilterChip
          key={filter.value}
          label={filter.label}
          active={filter.active}
          onPress={() => onFilterPress(filter.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
});

