import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'reminder' | 'system';
  read: boolean;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Upcoming Event',
    message: 'Feeding time for Felix in 30 minutes',
    type: 'reminder',
    read: false,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    title: 'Event Completed',
    message: 'You completed "Change water" for Josh',
    type: 'event',
    read: false,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    title: 'Welcome!',
    message: 'Welcome to MyPets! Start by adding your first pet.',
    type: 'system',
    read: true,
    timestamp: '2 days ago',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        notificationCard: {
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary,
        },
        notificationCardRead: {
          opacity: 0.6,
        },
        notificationHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        },
        notificationTitle: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.text,
          flex: 1,
        },
        notificationTime: {
          fontSize: 12,
          color: colors.textGray,
        },
        notificationMessage: {
          fontSize: 14,
          color: colors.textGray,
          marginTop: 4,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        },
        emptyText: {
          fontSize: 16,
          color: colors.textGray,
          textAlign: 'center',
        },
      }),
    [colors]
  );

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Notifications"
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
        rightContent={
          <ProfileButton
            onPress={() => {
              router.push('/personal-information');
            }}
          />
        }
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {mockNotifications.length === 0 ? (
          <View style={dynamicStyles.emptyContainer}>
            <IconSymbol name="bell" size={48} color={colors.textGray} />
            <ThemedText style={[dynamicStyles.emptyText, { marginTop: 16 }]}>
              No notifications yet
            </ThemedText>
          </View>
        ) : (
          mockNotifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                dynamicStyles.notificationCard,
                notification.read && dynamicStyles.notificationCardRead,
              ]}
            >
              <View style={dynamicStyles.notificationHeader}>
                <ThemedText style={dynamicStyles.notificationTitle}>
                  {notification.title}
                </ThemedText>
                <ThemedText style={dynamicStyles.notificationTime}>
                  {notification.timestamp}
                </ThemedText>
              </View>
              <ThemedText style={dynamicStyles.notificationMessage}>
                {notification.message}
              </ThemedText>
            </View>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});

