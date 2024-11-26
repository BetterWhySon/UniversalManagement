export const PATH = {
  DASHBOARD: {
    _: '/',   
    BATTERY_ALARM: 'battery-alarm',
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
    get(key?: undefined ) {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  ADMIN_BW: {
    _: 'admin',
    LOGIN: 'login',   
    APARTMENT_REGISTRATION: 'apartment-registration',   
    get(key?: undefined | 'APARTMENT_REGISTRATION' ) {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  ADMIN_CUSTOMER: {
    _: 'admin',
    LOGIN: 'login',   
    E_VEHICLE_REGISTRATION: 'e-vehicle-registration',   
    EVCHECK_REGISTRATION: 'evcheck-registration',   
    get(key?: undefined | 'E_VEHICLE_REGISTRATION' | 'EVCHECK_REGISTRATION' ) {
      if (!key) return `/${this._}/${this.E_VEHICLE_REGISTRATION}`;
      return `/${this._}/${this[key]}`;
    },
  },
};
