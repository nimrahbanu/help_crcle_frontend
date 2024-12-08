// useSidebarStore.ts
import {create} from 'zustand';

interface SidebarState {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>(set => ({
  isSidebarVisible: false,
  toggleSidebar: () => set(state => ({ isSidebarVisible: !state.isSidebarVisible })),
}));
