import React, { useState, useRef, useEffect } from 'react';
import { MenuItemType } from './types';
import styles from './MenuItem.module.css';
import { ChevronRight, MoreHorizontal, Plus, FileText, FolderPlus, File } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  depth?: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const hasChildren = item.children && item.children.length > 0;
  const isLesson = depth > 0;
  const isCourse = depth === 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target as Node)) {
        setShowCreateMenu(false);
      }
    };

    if (showMenu || showCreateMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, showCreateMenu]);

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

  const handleCreateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCreateMenu(!showCreateMenu);
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
            <div ref={menuRef}>
              <MoreHorizontal
                size={16}
                className={styles.menuIcon}
                onClick={handleMenuClick}
              />
              {showMenu && (
                <div className={styles.popupMenu}>
                  <div className={styles.menuItem}>Rename</div>
                  <div className={styles.menuItem}>Delete</div>
                  <div className={styles.menuItem}>Copy link</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isOpen && (
        <>
          {hasChildren && (
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
          {isCourse && (
            <div ref={createMenuRef} className={styles.createNewContainer}>
              <div
                className={styles.createNewButton}
                onClick={handleCreateClick}
                style={{ paddingLeft: `${(depth + 1) * 1.5}rem` }}
              >
                <Plus size={16} className={styles.icon} />
                Create new lesson
              </div>
              {showCreateMenu && (
                <div className={styles.popupMenu}>
                  <div className={styles.menuItem}>
                    <FileText size={16} className={styles.menuItemIcon} />
                    Add text file
                  </div>
                  <div className={styles.menuItem}>
                    <File size={16} className={styles.menuItemIcon} />
                    Add code file
                  </div>
                  <div className={styles.menuItem}>
                    <FolderPlus size={16} className={styles.menuItemIcon} />
                    Add folder
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}; 