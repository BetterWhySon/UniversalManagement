import { BW_PATH } from '@/router/path';

export const ADMIN_SIDEBAR_MENU = [
  {
    name: '시스템 관리',
    subMenu: [
      {
        title: '관리 업체 등록',
        href: BW_PATH.get('company')
      },
      {
        title: '관리자 등록',
        href: BW_PATH.get('admin-user')
      },
      {
        title: '배터리 모델 관리',
        href: BW_PATH.get('battery-model')
      },
      {
        title: '배터리 Data Config',
        href: BW_PATH.get('battery-data-config')
      },
      {
        title: '배터리 팩 관리',
        href: BW_PATH.get('battery-pack')
      }
    ]
  }
]; 