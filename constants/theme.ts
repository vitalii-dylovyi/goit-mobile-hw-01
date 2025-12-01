/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Base colors
export const BaseColors = {
  primary: '#007AFF', // iOS blue - matches screenshot
  white: '#fff',
  black: '#000',
  textDark: '#11181C',
  textGray: '#687076',
  textLight: '#ECEDEE',
  backgroundLight: '#E6F4FE',
  cardBackground: '#F8F9FE',
  borderLight: '#E5E5E5',
  backgroundDark: '#151718',
  iconGray: '#9BA1A6',
};

const tintColorLight = BaseColors.primary;
const tintColorDark = BaseColors.white;

export const Colors = {
  light: {
    text: BaseColors.textDark,
    background: BaseColors.white,
    tint: tintColorLight,
    icon: BaseColors.textGray,
    tabIconDefault: BaseColors.textGray,
    tabIconSelected: tintColorLight,
    // Additional colors
    primary: BaseColors.primary,
    white: BaseColors.white,
    black: BaseColors.black,
    textGray: BaseColors.textGray,
    backgroundLight: BaseColors.backgroundLight,
    cardBackground: BaseColors.cardBackground,
    borderLight: BaseColors.borderLight,
  },
  dark: {
    text: BaseColors.textLight,
    background: BaseColors.backgroundDark,
    tint: tintColorDark,
    icon: BaseColors.iconGray,
    tabIconDefault: BaseColors.iconGray,
    tabIconSelected: tintColorDark,
    // Additional colors
    primary: BaseColors.primary,
    white: BaseColors.white,
    black: BaseColors.black,
    textGray: BaseColors.iconGray,
    backgroundLight: BaseColors.backgroundDark,
    cardBackground: BaseColors.cardBackground,
    borderLight: BaseColors.borderLight,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
