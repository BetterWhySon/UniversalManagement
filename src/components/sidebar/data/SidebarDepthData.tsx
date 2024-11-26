import { create } from 'zustand';
import { SidebarDepthDataType } from '@/types/sidebar-menu.type';



interface SidebarDepthData {
  sidebarDepthData: SidebarDepthDataType | null;
  // storeSidebarDepthData: (EXTRA: string, SUPER: string, MENU: string, EXTRA_FOREIGN: string, SUPER_FOREIGN: string, MENU_FOREIGN: string, MENU_ID: number) => void;
  storeSidebarDepthData: (EXTRA: string, SUPER: string, MENU: string, MENU_ID: number) => void;
}

const useSidebarDepthData = create<SidebarDepthData>((set, get) => ({
  sidebarDepthData: null,
  // storeSidebarDepthData: async (EXTRA: string, SUPER: string, MENU: string, EXTRA_FOREIGN: string, SUPER_FOREIGN: string, MENU_FOREIGN: string, MENU_ID: number) => {
  storeSidebarDepthData: async (EXTRA: string, SUPER: string, MENU: string, MENU_ID: number) => {
    let tmp: SidebarDepthDataType = {
      EXTRA: EXTRA,
      SUPER: SUPER,
      MENU: MENU,
      // EXTRA_FOREIGN: EXTRA_FOREIGN,
      // SUPER_FOREIGN: SUPER_FOREIGN,
      // MENU_FOREIGN: MENU_FOREIGN,
      MENU_ID: MENU_ID
    };
    set({ sidebarDepthData: tmp });
  },
}));

export default useSidebarDepthData;

