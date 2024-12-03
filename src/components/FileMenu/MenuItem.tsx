import React, { useState, useRef, useEffect } from 'react';
import { MenuItemType } from './types';
import styles from './MenuItem.module.css';
import { ChevronRight, MoreHorizontal, Plus, FileText, FolderPlus, File, Pencil, Trash2, Link, Copy, Star, Eye, EyeOff, Settings, PenSquare } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  depth?: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [isPublic, setIsPublic] = useState(item.isPublic ?? false);
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

  const handleCourseAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    switch (action) {
      case 'toggleVisibility':
        setIsPublic(!isPublic);
        setShowMenu(false);
        break;
      case 'autoGrade':
        // Handle auto-grade action
        console.log('Auto-grade clicked');
        break;
      case 'viewProjects':
        // Handle view projects action
        console.log('View projects clicked');
        break;
      case 'editDetail':
        // Handle edit course detail
        console.log('Edit course detail clicked');
        break;
      case 'rename':
        // Handle rename course
        console.log('Rename course clicked');
        break;
      case 'copyLink':
        // Handle copy link
        console.log('Copy link clicked');
        break;
    }
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
              role="button"
              aria-label="expand"
            />
          )}
          {isLesson && (
            <div ref={menuRef}>
              <MoreHorizontal
                size={16}
                className={styles.menuIcon}
                onClick={handleMenuClick}
                role="button"
                aria-label="more"
              />
              {showMenu && (
                <div className={styles.popupMenu}>
                  <div className={styles.menuItem}>
                    <Pencil size={16} className={`${styles.menuItemIcon} ${styles.editIcon}`} />
                    Rename
                  </div>
                  <div className={styles.menuItem}>
                    <Copy size={16} className={`${styles.menuItemIcon} ${styles.copyIcon}`} />
                    Copy path
                  </div>
                  <div className={styles.menuItem}>
                    <Link size={16} className={`${styles.menuItemIcon} ${styles.linkIcon}`} />
                    Copy link
                  </div>
                  <div className={styles.menuItem}>
                    <Trash2 size={16} className={`${styles.menuItemIcon} ${styles.deleteIcon}`} />
                    Delete
                  </div>
                </div>
              )}
            </div>
          )}
          {isCourse && (
            <div ref={menuRef}>
              <MoreHorizontal
                size={16}
                className={styles.menuIcon}
                onClick={handleMenuClick}
                role="button"
                aria-label="more"
              />
              {showMenu && (
                <div className={styles.popupMenu}>
                  <div 
                    className={styles.menuItem}
                    onClick={(e) => handleCourseAction('autoGrade', e)}
                  >
                    <Star size={16} className={`${styles.menuItemIcon} ${styles.autoGradeIcon}`} />
                    Auto-grade
                  </div>
                  <div 
                    className={styles.menuItem}
                    onClick={(e) => handleCourseAction('viewProjects', e)}
                  >
                    <Settings size={16} className={`${styles.menuItemIcon} ${styles.viewProjectsIcon}`} />
                    View projects
                  </div>
                  <div 
                    className={`${styles.menuItem} ${styles.toggleItem} ${isPublic ? styles.active : ''}`}
                    onClick={(e) => handleCourseAction('toggleVisibility', e)}
                  >
                    {isPublic ? (
                      <>
                        <Eye size={16} className={`${styles.menuItemIcon} ${styles.publicIcon}`} />
                        Public
                      </>
                    ) : (
                      <>
                        <EyeOff size={16} className={`${styles.menuItemIcon} ${styles.privateIcon}`} />
                        Private
                      </>
                    )}
                  </div>
                  <div className={styles.divider} />
                  <div 
                    className={styles.menuItem}
                    onClick={(e) => handleCourseAction('editDetail', e)}
                  >
                    <PenSquare size={16} className={`${styles.menuItemIcon} ${styles.editIcon}`} />
                    Edit Course detail
                  </div>
                  <div 
                    className={styles.menuItem}
                    onClick={(e) => handleCourseAction('rename', e)}
                  >
                    <Pencil size={16} className={`${styles.menuItemIcon} ${styles.editIcon}`} />
                    Rename course
                  </div>
                  <div 
                    className={styles.menuItem}
                    onClick={(e) => handleCourseAction('copyLink', e)}
                  >
                    <Link size={16} className={`${styles.menuItemIcon} ${styles.linkIcon}`} />
                    Copy link
                  </div>
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
                <Plus size={16} className={styles.createIcon} />
                Create new lesson
              </div>
              {showCreateMenu && (
                <div className={styles.popupMenu}>
                  <div className={styles.menuItem}>
                    <FileText size={16} className={`${styles.menuItemIcon} ${styles.textFileIcon}`} />
                    Add text file
                  </div>
                  <div className={styles.menuItem}>
                    <File size={16} className={`${styles.menuItemIcon} ${styles.codeFileIcon}`} />
                    Add code file
                  </div>
                  <div className={styles.menuItem}>
                    <FolderPlus size={16} className={`${styles.menuItemIcon} ${styles.folderIcon}`} />
                    Add folder
                  </div>
                  <div className={styles.menuItem}>
                    <File size={16} className={`${styles.menuItemIcon} ${styles.fileIcon}`} />
                    Add file
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