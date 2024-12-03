import React, { useState } from 'react';
import { MenuItemType } from './types';
import styles from './MenuItem.module.css';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  depth?: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isLesson = depth > 0; // Only show menu for lessons (depth > 0)

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    item.onClick?.();
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.content} ${item.isActive ? styles.active : ''}`}
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
      >
        <span className={styles.icon}>{item.icon}</span>
        {item.label}
        <div className={styles.rightIcons}>
          {hasChildren && (
            <ChevronRight 
              size={16}
              className={`${styles.expandIcon} ${isOpen ? styles.open : ''}`}
            />
          )}
          {isLesson && (
            <MoreHorizontal
              size={16}
              className={styles.menuIcon}
              onClick={handleMenuClick}
            />
          )}
        </div>
      </div>
      
      {showMenu && (
        <div className={styles.popupMenu}>
          <div className={styles.menuItem}>Rename</div>
          <div className={styles.menuItem}>Delete</div>
          <div className={styles.menuItem}>Copy link</div>
        </div>
      )}
      
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