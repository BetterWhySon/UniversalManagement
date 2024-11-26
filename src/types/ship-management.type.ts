export type ShipManagementData = {
  id: number;
  userID: string;
  name: string;
  contact: string;
  email: string;
  shipCount: number;
  admin: boolean;
  correction: string;
  currentPassword: string;
};

export type DefaultValues_BMS = {
  bmsID: string;
  specNumber: string;
  numbersOfRack: string;
  rackCount: number;   
  siteName: string;
  siteId: string;
  shipName: string;
  shipId: string;
};

export type userShipData = {
  id: number;
  site_name: string;
  site_name_foreign: string;
  site_id: number;
  ship_name: string;
  ship_id: number;
  ship_name_foreign: string;
};

export type searchShipData = {
  id: number;
  site_name: string;
  site_id: number;
  ship_name: string;
  ship_id: number;
};


