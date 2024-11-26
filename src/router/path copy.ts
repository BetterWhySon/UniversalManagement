export const PATH = {
  DASHBOARD: {
    _: '/',   
    POLICY_COMPLIANCE: 'policy-compliance',
    SERVICE_REQUIREMENT: 'service-requirement',
    CHARGING_SUMMARY: 'charging-summary',
    BATTERY_USAGE_CHART: 'battery-usage-chart',
    STATISTICAL_DATA: 'statistical-data',
    MANAGEMENT_STATUS: 'management-status',
  },
  LOGIN: {
    _: 'login',
    get() {
      return `/${this._}`;
    },
  },
  MONITORING: {
    _: 'monitoring',
    get() {
      return `/${this._}`;
    },
  },
  ADMIN: {
    _: 'admin',
    LOGIN: 'login',
    STATUS: 'status',
    SHIP_MANAGEMENT: 'ship-management',
    SHIP_STATISTICS_MANAGEMENT: 'ship-statistics_management',
    BMS_MANAGEMENT: 'bms-management',
    USER_MANAGEMENT: 'user-management',
    USER_ADD_DELETE: 'user-add-delete',    
    CONNECTION: 'connection',
    FILE_MANAGEMENT: 'file-management',    
    SERVER_MANAGEMENT: 'server-management',         
    get(key?: undefined | 'LOGIN' | 'STATUS' | 'SHIP_MANAGEMENT' | 'SHIP_STATISTICS_MANAGEMENT' | 'BMS_MANAGEMENT' | 'USER_MANAGEMENT' | 'USER_ADD_DELETE' | 'CONNECTION' | 'FILE_MANAGEMENT' | 'SERVER_MANAGEMENT' ) {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
};
