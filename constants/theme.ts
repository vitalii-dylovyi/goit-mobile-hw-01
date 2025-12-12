import { Platform } from 'react-native';

export const BaseColors = {
  primary: '#007AFF',
  white: '#fff',
  black: '#000',
  textDark: '#11181C',
  textGray: '#687076',
  textLight: '#ECEDEE',
  backgroundLight: '#E6F4FE',
  cardBackground: '#F8F9FE',
  borderLight: '#E5E5E5',
  backgroundDark: '#151718',
  cardBackgroundDark: '#1F1F1F',
  borderLightDark: '#2F2F2F',
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
    primary: BaseColors.primary,
    white: BaseColors.white,
    black: BaseColors.black,
    textGray: BaseColors.iconGray,
    backgroundLight: BaseColors.backgroundDark,
    cardBackground: BaseColors.cardBackgroundDark,
    borderLight: BaseColors.borderLightDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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
