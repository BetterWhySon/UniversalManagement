import { BW_PATH } from '@/router/path';

export const ADMIN_SIDEBAR_MENU = [
  {
    name: '시스템 관리',
    subMenu: [
      {
        title: '회사',
        href: BW_PATH.get('company')
      },
      {
        title: '소속 직원',
        href: BW_PATH.get('admin-user')
      },
      {
        title: '배터리(모빌리티) 모델',
        href: BW_PATH.get('battery-map-model')
      },
      {
        title: '배터리(모빌리티) 제원',
        href: BW_PATH.get('battery-model')
      },
      {
        title: '표준 데이터',
        href: BW_PATH.get('battery-data-config')
      },
      {
        title: '제조자 지정 데이터',
        href: BW_PATH.get('manufacturer-data-config')
      },
      {
        title: '실시간 데이터',
        href: BW_PATH.get('manufacturer-realtime-data'),
        indent: true
      },
      {
        title: '기기 상태, 제어 데이터',
        href: BW_PATH.get('manufacturer-device-control'),
        indent: true
      },
      {
        title: '기기 그룹 설정',
        href: BW_PATH.get('manufacturer-device-group'),
        indent: true
      },
      {
        title: '알람 데이터',
        href: BW_PATH.get('manufacturer-alarm-data'),
        indent: true
      },
      {
        title: '제원 데이터',
        href: BW_PATH.get('manufacturer-spec-data'),
        indent: true
      },
    //   {
    //     title: '모델그룹 설정',
    //     href: BW_PATH.get('model-group')
    //   },
      {
        title: '배터리 팩 등록 현황',
        href: BW_PATH.get('battery-pack')
      }
    ]
  }
]; 