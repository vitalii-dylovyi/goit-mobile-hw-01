import { ProfileButton } from '@/components/profile-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type HeaderProps = {
  title: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};

export function Header({ title, leftContent, rightContent }: HeaderProps) {
  const hasLeftContent = !!leftContent;
  const hasRightContent = !!rightContent;

  return (
    <ThemedView style={styles.header}>
      <View style={[styles.headerLeft, !hasLeftContent && styles.headerSpacer]}>
        {leftContent}
      </View>
      <View style={styles.headerCenter}>
        <ThemedText style={styles.headerTitle} numberOfLines={1}>
          {title}
        </ThemedText>
      </View>
      <View style={[styles.headerRight, !hasRightContent && styles.headerSpacer]}>
        {rightContent || <ProfileButton />}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    minWidth: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    minWidth: 0,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
    minWidth: 40,
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1,
  },
});
