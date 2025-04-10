import { atom } from 'recoil';

// Sidebar state atoms
export const activeSidebarItemState = atom({
  key: 'activeSidebarItemState',
  default: '/dashboard',
});

export const isMobileMenuOpenState = atom({
  key: 'isMobileMenuOpenState',
  default: false,
});

