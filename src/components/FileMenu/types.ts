export interface MenuItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  children?: MenuItemType[];
} 