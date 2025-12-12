import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
};

function SearchBarComponent({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
}: SearchBarProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const inputRef = useRef<TextInput>(null);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          paddingHorizontal: 12,
          height: 44,
          marginBottom: 16,
        },
        input: {
          flex: 1,
          fontSize: 16,
          color: colors.text,
          paddingVertical: 0,
        },
        clearButton: {
          padding: 4,
        },
      }),
    [colors]
  );

  const handleClear = () => {
    onChangeText('');
    onClear?.();
    // Restore focus after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <View style={dynamicStyles.container}>
      <IconSymbol name='magnifyingglass' size={18} color={colors.textGray} />
      <TextInput
        ref={inputRef}
        style={dynamicStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textGray}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={dynamicStyles.clearButton}>
          <IconSymbol name='xmark.circle.fill' size={18} color={colors.textGray} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export const SearchBar = React.memo(SearchBarComponent);

