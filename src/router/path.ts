export const PATH = {
  DASHBOARD: {
    _: '/',   
    BATTERY_STATUS: '/battery-status',
    BATTERY_ALARM: 'battery-alarm',
    POLICY_COMPLIANCE: '/dashboard/policy-compliance',
    UNUSED_BATTERY: '/dashboard/unused-battery',
    CHARGING_STATUS: '/dashboard/charging-status',
    OPERATION_STATUS: '/dashboard/operation-status',
    MANAGEMENT_STATUS: 'management-status',    
  },
  // 설정
  SETTING: {
    _: 'setting',
    STANDARD_INFO: {
      _: 'standard-info',
      SERVICE_STATUS: 'service-status',          // 관제서비스 신청현황
      BATTERY_REGISTRATION: 'battery-registration', // 배터리 등록현황
    },
    MONITORING: {
      _: 'monitoring',
      REALTIME: 'realtime-monitoring',  // 실시간 종합관제
      OPERATION: 'operation-status',      // 실시간 운영현황
    },
    BATTERY: {
      _: 'battery',
      INDIVIDUAL: 'individual-lookup',    // 개별기기 조회
      BY_CATEGORY: 'category-lookup',     // 관리항목별 조회
      BY_DEVICE: 'device-lookup',         // 관리기기별 조회
    },
    STATISTICS: {
      _: 'statistics',
      DAILY_OPERATION: 'daily-operation',       // 일자별 배터리 운영현황
      USAGE_HISTORY: 'usage-history',           // 사용이력 조회
      ALARM_HISTORY: 'alarm-history',           // 알람이력 조회
    },

    get(category: 'STANDARD_INFO' | 'MONITORING' | 'BATTERY' | 'STATISTICS', key?: string) {
      if (!category) return `/${this._}`;
      if (!key) return `/${this._}/${this[category]._}`;
      return `/${this._}/${this[category]._}/${this[category][key]}`;
    },
  },
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
    BY_CATEGORY: 'by-category',
    BY_DEVICE: 'by-device',
    get(key?: 'INDIVIDUAL' | 'BY_CATEGORY' | 'BY_DEVICE') {
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
