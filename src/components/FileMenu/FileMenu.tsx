import React from 'react';
import { MenuItem } from './MenuItem';
import { MenuItemType } from './types';
import styles from './FileMenu.module.css';

interface FileMenuProps {
  items: MenuItemType[];
}

export const FileMenu: React.FC<FileMenuProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}; 