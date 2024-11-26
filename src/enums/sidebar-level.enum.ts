export enum SidebarMenuLevel {
    EXTRA = 'EXTRA',    // site
    SUPER = 'SUPER',    // ship
    MENU = 'MENU',      // bms
  }
  
export type SidebarMenuDepth = {
  pathname: string;
  EXTRA: string;
  SUPER: string;
  MENU: string;  
};
