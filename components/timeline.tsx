import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

type TimelineEvent = {
  time: string;
  title: string;
  description?: string;
};

type TimelineProps = {
  events: TimelineEvent[];
};

export function Timeline({ events }: TimelineProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        timeText: {
          fontSize: 14,
          color: colors.textGray,
          width: 60,
          marginRight: 16,
        },
        eventBubble: {
          backgroundColor: colors.backgroundLight,
          padding: 12,
          borderRadius: 8,
          flex: 1,
        },
        eventTitle: {
          fontSize: 14,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 2,
        },
        eventDescription: {
          fontSize: 12,
          color: colors.textGray,
        },
        dividerLine: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          backgroundColor: colors.borderLight,
        },
      }),
    [colors.textGray, colors.backgroundLight, colors.text, colors.borderLight]
  );

  // Generate hours from 6:00 to 23:00
  const hours = Array.from({ length: 18 }, (_, i) => i + 6);

  return (
    <ThemedView style={styles.container}>
      {hours.map((hour, index) => {
        const event = events.find((e) => e.time.startsWith(`${hour}:`));
        return (
          <View key={hour} style={styles.timelineRow}>
            {index < hours.length - 1 && (
              <View style={dynamicStyles.dividerLine} />
            )}
            <View style={styles.timeWrapper}>
              <ThemedText style={dynamicStyles.timeText}>
                {hour.toString().padStart(2, '0')}:00
              </ThemedText>
            </View>
            <View style={styles.contentWrapper}>
              {event ? (
                <View style={dynamicStyles.eventBubble}>
                  <ThemedText style={dynamicStyles.eventTitle}>
                    {event.time}, {event.title}
                  </ThemedText>
                  {event.description && (
                    <ThemedText style={dynamicStyles.eventDescription}>
                      {event.description}
                    </ThemedText>
                  )}
                </View>
              ) : (
                <View style={styles.emptySlot} />
              )}
            </View>
          </View>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 0,
    paddingHorizontal: 0,
    alignItems: 'flex-start',
    position: 'relative',
    paddingBottom: 16,
  },
  timeWrapper: {
    width: 60,
    marginRight: 16,
    position: 'relative',
    minHeight: 20,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  emptySlot: {
    flex: 1,
    minHeight: 20,
  },
});

