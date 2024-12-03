import { ReactNode } from 'react';

export interface MenuItemType {
  id: string;
  label: string;
  icon?: ReactNode;
  isActive?: boolean;
  isPublic?: boolean;
  onClick?: () => void;
  children?: MenuItemType[];
} 