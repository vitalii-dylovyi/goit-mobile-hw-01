import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';

type TabButtonProps = {
  iconName: IconSymbolName;
  color: string;
  size?: number;
};

export function TabButton({ iconName, color, size = 24 }: TabButtonProps) {
  return <IconSymbol size={size} name={iconName} color={color} />;
}

