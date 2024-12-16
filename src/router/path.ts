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
      SERVICE_STATUS: 'service-status',          // 관제서비스 신청현황
      BATTERY_REGISTRATION: 'battery-registration', // 배터리 등록현황
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
    SERVICE_STATUS: 'service-status',
    BATTERY_STATUS: 'battery-status',
    get(key?: 'SERVICE_STATUS' | 'BATTERY_STATUS') {
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
    get() {
      return `/${this._}`;
    },
  },
  ADMIN_BW: {
    _: 'admin-bw',
    get() {
      return `/${this._}`;
    },
  },
};
