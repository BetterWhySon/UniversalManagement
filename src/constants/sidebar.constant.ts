import { PATH } from '@/router/path';

export const SIDEBAR_MENU = [
  {
    name: '기준정보 등록',
    subMenu: [
      {
        title: '관제서비스 신청현황',
        href: PATH.SETTING.get('STANDARD_INFO', 'SERVICE_STATUS')
      },
      {
        title: '배터리 등록현황',
        href: PATH.SETTING.get('STANDARD_INFO', 'BATTERY_REGISTRATION')
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
