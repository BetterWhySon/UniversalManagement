import { PATH } from '@/router/path';

export const SIDEBAR_MENU = [
  {
    name: '기준정보 관리',
    subMenu: [
      {
        title: '사업장 등록',
        href: PATH.SETTING.get('STANDARD_INFO', 'COMPANY_REGISTRATION')
      },
      {
        title: '그룹 등록',
        href: PATH.SETTING.get('STANDARD_INFO', 'GROUP_REGISTRATION')
      },
      {
        title: '사업장 그룹 맵핑',
        href: PATH.SETTING.get('STANDARD_INFO', 'COMPANY_GROUP_MAPPING')
      },
      {
        title: '배터리 등록',
        href: PATH.SETTING.get('STANDARD_INFO', 'BATTERY_REGISTRATION')
      },
      {
        title: '배터리 등록 현황',
        href: PATH.SETTING.get('STANDARD_INFO', 'BATTERY_STATUS')
      }
    ]
  },
  {
    name: '관제 모니터링',
    subMenu: [
      {
        title: '실시간 종합관제',
        href: PATH.DASHBOARD._
      },
      {
        title: '실시간 운영현황',
        href: '/realtime/operation-status'
      }
    ]
  },
  {
    name: '배터리 분석',
    subMenu: [
      {
        title: '개별기기 조회',
        href: PATH.SETTING.get('BATTERY', 'INDIVIDUAL')
      },
      {
        title: '관리항목별 조회',
        href: PATH.SETTING.get('BATTERY', 'BY_MANAGEMENT_ITEM')
      },
      {
        title: '관리기기별 조회',
        href: PATH.SETTING.get('BATTERY', 'BY_MANAGEMENT_DEVICE')
      }
    ]
  },
  {
    name: '통계 자료',
    subMenu: [
      {
        title: '일자별 배터리 운영현황',
        href: PATH.SETTING.get('STATISTICS', 'DAILY_OPERATION')
      },
      {
        title: '사용이력 조회',
        href: PATH.SETTING.get('STATISTICS', 'USAGE_HISTORY')
      },
      {
        title: '알람이력 조회',
        href: PATH.SETTING.get('STATISTICS', 'ALARM_HISTORY')
      }
    ]
  }
];
