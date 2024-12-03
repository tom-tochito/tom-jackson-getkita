import React, { useState } from 'react';
import { MenuItemType } from './types';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  item: MenuItemType;
  depth?: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    item.onClick?.();
  };

  return (
    <div className={styles.container} style={{ paddingLeft: `${depth * 1.5}rem` }}>
      <div 
        className={`${styles.content} ${item.isActive ? styles.active : ''}`}
        onClick={handleClick}
      >
        <span className={styles.icon}>{item.icon}</span>
        {item.label}
        {hasChildren && (
          <span className={`${styles.expandIcon} ${isOpen ? styles.open : ''}`}>
            ▶
          </span>
        )}
      </div>
      
      {isOpen && hasChildren && (
        <div>
          {item.children?.map((child) => (
            <MenuItem 
              key={child.id} 
              item={child} 
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 