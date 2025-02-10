type SettingCategory = {
  _: string;
  [key: string]: string;
};

type Settings = {
  _: string;
  STANDARD_INFO: SettingCategory;
  BATTERY: SettingCategory;
  MONITORING: SettingCategory;
  STATISTICS: SettingCategory;
  get(category: 'STANDARD_INFO' | 'BATTERY' | 'MONITORING' | 'STATISTICS', key?: string): string;
};

type BWPath = {
  _: string;
  DASHBOARD: { _: string; OVERVIEW: string; BATTERY_STATUS: string; OPERATION_STATUS: string };
  LOGIN: { _: string };
  MANAGEMENT: { _: string; COMPANY: string; GROUP: string; BATTERY: string };
  get(path?: string): string;
};

export const BW_PATH: BWPath = {
  _: 'admin',
  DASHBOARD: {
    _: 'dashboard',
    OVERVIEW: 'overview',
    BATTERY_STATUS: 'battery-status',
    OPERATION_STATUS: 'operation-status',
  },
  LOGIN: {
    _: 'login',
  },
  MANAGEMENT: {
    _: 'management',
    COMPANY: 'company',
    GROUP: 'group',
    BATTERY: 'battery',
  },
  get(path?: string) {
    if (!path) return `/${this._}`;
    return `/${this._}/${path}`;
  }
};

export const PATH = {
  DASHBOARD: {
    _: '/',   
    BATTERY_STATUS: '/battery-status',
    BATTERY_ALARM: 'battery-alarm',
    POLICY_COMPLIANCE: '/dashboard/policy-compliance',
    UNUSED_BATTERY: '/dashboard/unused-battery',
    CHARGING_STATUS: '/dashboard/charging-status',
    OPERATION_STATUS: '/dashboard/operation-status',
    BATTERY_ALARM_DETAIL: '/dashboard/battery-alarm-detail',
    MANAGEMENT_STATUS: 'management-status',    
    CHARGING_DETAIL: '/dashboard/charging-detail',    
  },
  // 설정
  SETTING: {
    _: 'setting',
    STANDARD_INFO: {
      _: 'standard-info',
      COMPANY_REGISTRATION: 'company-registration',        // 사업장 등록
      GROUP_REGISTRATION: 'group-registration',      // 그룹 등록
      COMPANY_GROUP_MAPPING: 'company-group-mapping', // 사업장 그룹 맵핑
      COMPANY_GROUP_ASSIGN: 'company-group-assign',  // 사업장 그룹 지정
      BATTERY_REGISTRATION: 'battery-registration',  // 배터리 등록 (변경)
      BATTERY_STATUS: 'battery-status',             // 배터리 등록 현황
    },
    BATTERY: {
      _: 'battery',
      INDIVIDUAL: 'individual',    // 개별기기 조회
      BY_MANAGEMENT_ITEM: 'management-item',     // 관리항목별 조회
      BY_MANAGEMENT_DEVICE: 'management-device',         // 관리기기별 조회
    },
    MONITORING: {
      _: 'monitoring',
      REALTIME: 'realtime-monitoring',  // 실시간 종합관제
      OPERATION: 'operation-status',      // 실시간 운영현황
    },
    STATISTICS: {
      _: 'statistics',
      DAILY_OPERATION: 'daily-operation',       // 일자별 배터리 운영현황
      USAGE_HISTORY: 'usage-history',           // 사용이력 조회
      ALARM_HISTORY: 'alarm-history',           // 알람이력 조회
    },

    get(this: Settings, category: 'STANDARD_INFO' | 'BATTERY' | 'MONITORING' | 'STATISTICS', key?: string) {
      if (!category) return `/${this._}`;
      if (!key) return `/${this._}/${this[category]._}`;
      return `/${this._}/${this[category]._}/${this[category][key]}`;
    },
  } as Settings,
  // 기준정보 등록
  STANDARD_INFO: {
    _: 'standard-info',
    COMPANY_REGISTRATION: 'company-registration',
    GROUP_REGISTRATION: 'group-registration',
    COMPANY_GROUP_MAPPING: 'company-group-mapping',
    COMPANY_GROUP_ASSIGN: 'company-group-assign',
    BATTERY_STATUS: 'battery-status',
    get(key?: 'COMPANY_REGISTRATION' | 'GROUP_REGISTRATION' | 'COMPANY_GROUP_MAPPING' | 'COMPANY_GROUP_ASSIGN' | 'BATTERY_STATUS') {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  // 관제 모니터링
  MONITORING: {
    _: 'monitoring',
    REALTIME: 'realtime',
    OPERATION: 'operation',
    get(key?: 'REALTIME' | 'OPERATION') {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  // 배터리 분석
  BATTERY: {
    _: 'battery',
    INDIVIDUAL: 'individual',
    BY_MANAGEMENT_ITEM: 'management-item',
    BY_MANAGEMENT_DEVICE: 'management-device',
    get(key?: 'INDIVIDUAL' | 'BY_MANAGEMENT_ITEM' | 'BY_MANAGEMENT_DEVICE') {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  // 통계 자료
  STATISTICS: {
    _: 'statistics',
    DAILY_OPERATION: 'daily-operation',
    USAGE_HISTORY: 'usage-history',
    ALARM_HISTORY: 'alarm-history',
    get(key?: 'DAILY_OPERATION' | 'USAGE_HISTORY' | 'ALARM_HISTORY') {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  LOGIN: {
    _: 'login',
    FIND_ID: 'find-id',
    FIND_PASSWORD: 'find-password',
    get(key?: 'FIND_ID' | 'FIND_PASSWORD') {
      if (!key) return `/${this._}`;
      return `/${this._}/${this[key]}`;
    },
  },
  ADMIN_BW: {
    _: 'admin-bw',
    get() {
      return `/${this._}`;
    },
  },
};
