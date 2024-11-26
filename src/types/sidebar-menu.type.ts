export type SidebarTab = {
  name: string;
  href: string;
  subMenu?: SubmenuItem[];  // subMenu 속성 추가
};

export type SubmenuItem = {
  id: number;
  title: string;
  href: string;
};

export type SidebarMenuType = {
  id: number;
  title: string;
  list: SubmenuItem[];
};

export type SidebarSuperMenuType = {
  id: string;
  title: string;
  menus: SidebarMenuType[];
};

////////////////////////////////////////////////////////////////
export type IBMS_userSystemInfo = {
  bms_id: number;
  bms_name: string;
  alias_foreign: string;
  rack_count: number;
};
export type IShip_userSystemInfo = {
  shipName: string;
  shipName_foreign: string;
  bmsList: Array<IBMS_userSystemInfo>;
};
export type ISite_userSystemInfo = {
  siteName: string;
  siteName_foreign: string;
  shipList: Array<IShip_userSystemInfo>;
};
export type SidebarDepthDataType = {
  EXTRA: string;   
  SUPER: string;   
  MENU: string; 
  MENU_ID: number; 
};


