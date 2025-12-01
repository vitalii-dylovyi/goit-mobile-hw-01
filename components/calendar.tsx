import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

type CalendarDay = {
  day: string;
  date: number;
  isSelected?: boolean;
};

type CalendarProps = {
  days: CalendarDay[];
  onDayPress?: (day: CalendarDay) => void;
};

export function Calendar({ days, onDayPress }: CalendarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedDate, setSelectedDate] = useState(
    days.find((d) => d.isSelected)?.date || days[0]?.date
  );

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        dayButton: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 20,
          marginRight: 8,
          minWidth: 50,
          alignItems: 'center',
        },
        selectedDay: {
          backgroundColor: colors.borderLight,
          borderRadius: 20,
        },
        dayLabel: {
          fontSize: 12,
          color: colors.textGray,
          marginBottom: 4,
        },
        selectedDayLabel: {
          color: colors.text,
        },
        dateText: {
          fontSize: 14,
          fontWeight: '600',
          color: colors.text,
        },
      }),
    [colors.borderLight, colors.textGray, colors.text]
  );

  const handleDayPress = (day: CalendarDay) => {
    setSelectedDate(day.date);
    onDayPress?.(day);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((day, index) => {
          const isSelected = day.date === selectedDate;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDayPress(day)}
              style={[
                dynamicStyles.dayButton,
                isSelected && dynamicStyles.selectedDay,
              ]}
            >
              <ThemedText
                style={[
                  dynamicStyles.dayLabel,
                  isSelected && dynamicStyles.selectedDayLabel,
                ]}
              >
                {day.day}
              </ThemedText>
              <ThemedText style={dynamicStyles.dateText}>{day.date}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
});

