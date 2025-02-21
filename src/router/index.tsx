import { createBrowserRouter } from 'react-router-dom';
import { PATH, BW_PATH } from './path';
import { DOMAIN } from '@/constants/domain';
import MainLayout from '../layout/main-layout';
import LoginLayout from '../layout/login-layout';
import DashboardPage from '../pages/dashboard/page';
import LoginPage from '../pages/login/page';
import MonitoringPage from '../pages/monitoring/page';
import SystemPage from '@/pages/system/page';
import BatteryStatusPage from '@/pages/dashboard/pages/BatteryStatusPage';
import PolicyCompliancePage from '@/pages/dashboard/pages/PolicyCompliancePage';
import UnusedBatteryPage from '@/pages/dashboard/pages/UnusedBatteryPage';
import ChargingStatusPage from '@/pages/dashboard/pages/ChargingStatusPage';
import CompanyRegistrationPage from '@/pages/setting/standard-info/CompanyRegistrationPage';
import OperationStatusPage from '@/pages/realtime/OperationStatusPage';
import IndividualLookupPage from '@/pages/setting/battery/IndividualLookupPage';
import BatteryAlarmDetailPage from '@/pages/dashboard/pages/BatteryAlarmDetailPage';
import ChargingDetailPage from '@/pages/dashboard/pages/ChargingDetailPage';
import ByManagementItemPage from '@/pages/setting/battery/ByManagementItemPage';
import ByManagementDevicePage from '@/pages/setting/battery/ByManagementDevicePage';
import DailyOperationPage from '@/pages/setting/statistics/DailyOperationPage';
import UsageHistoryPage from '@/pages/setting/statistics/UsageHistoryPage';
import AlarmHistoryPage from '@/pages/setting/statistics/AlarmHistoryPage';
import FindIdPage from '@/pages/login/FindIdPage';
import FindPasswordPage from '@/pages/login/FindPasswordPage';
import GroupRegistrationPage from '@/pages/setting/standard-info/GroupRegistrationPage';
import CompanyGroupMappingPage from '@/pages/setting/standard-info/CompanyGroupMappingPage';
import BatteryRegistrationStatusPage from '@/pages/setting/standard-info/BatteryRegistrationStatusPage';
import BatteryRegistrationPage from '@/pages/setting/standard-info/BatteryRegistrationPage';
import CompanyRegistPage from '@/pages_bw/companyRegist/page';
import LoginPageBW from '@/pages_bw/login/page';
import CompanyPage from '@/pages_bw/company/page';
import AdminUserPage from '@/pages_bw/admin-user/page';
import BatteryModelPage from '@/pages_bw/battery-model/page';
import BatteryPackPage from '@/pages_bw/battery-pack/page';
import BatteryDataConfigPage from '@/pages_bw/battery-data-config/page';

const router = createBrowserRouter([
  // 고객용 라우터
  {
    path: '/',
    Component: MainLayout,
    children: [
      { path: '', Component: DashboardPage },
      { path: '/system/:systemId', Component: SystemPage },
      { path: '/system/:systemId/rack/:rackId', Component: SystemPage },
      { path: '/system/:systemId/rack/:rackId/cell', Component: SystemPage },
      { path: PATH.DASHBOARD.BATTERY_STATUS, Component: BatteryStatusPage },
      { path: PATH.DASHBOARD.BATTERY_ALARM_DETAIL, Component: BatteryAlarmDetailPage },
      { path: PATH.DASHBOARD.POLICY_COMPLIANCE, Component: PolicyCompliancePage },
      { path: PATH.DASHBOARD.UNUSED_BATTERY, Component: UnusedBatteryPage },
      { path: PATH.DASHBOARD.CHARGING_STATUS, Component: ChargingStatusPage },
      { path: PATH.DASHBOARD.CHARGING_DETAIL, Component: ChargingDetailPage },
      { path: PATH.SETTING.get('STANDARD_INFO', 'COMPANY_REGISTRATION'), Component: CompanyRegistrationPage },
      { path: PATH.SETTING.get('STANDARD_INFO', 'GROUP_REGISTRATION'), Component: GroupRegistrationPage },
      { path: PATH.SETTING.get('STANDARD_INFO', 'COMPANY_GROUP_MAPPING'), Component: CompanyGroupMappingPage },
      { path: PATH.SETTING.get('STANDARD_INFO', 'BATTERY_STATUS'), Component: BatteryRegistrationStatusPage },
      { path: PATH.SETTING.get('STANDARD_INFO', 'BATTERY_REGISTRATION'), Component: BatteryRegistrationPage },
      { path: PATH.SETTING.get('BATTERY', 'INDIVIDUAL'), Component: IndividualLookupPage },
      { path: PATH.SETTING.get('BATTERY', 'BY_MANAGEMENT_ITEM'), Component: ByManagementItemPage },
      { path: PATH.SETTING.get('BATTERY', 'BY_MANAGEMENT_DEVICE'), Component: ByManagementDevicePage },
      { path: PATH.SETTING.get('STATISTICS', 'DAILY_OPERATION'), Component: DailyOperationPage },
      { path: PATH.SETTING.get('STATISTICS', 'USAGE_HISTORY'), Component: UsageHistoryPage },
      { path: PATH.SETTING.get('STATISTICS', 'ALARM_HISTORY'), Component: AlarmHistoryPage },
    ],
  },
  {
    path: '/login',
    Component: LoginLayout,
    children: [
      { path: '', Component: LoginPage },
      { path: 'find-id', Component: FindIdPage },
      { path: 'find-password', Component: FindPasswordPage }
    ],
  },
  {
    path: '/monitoring',
    Component: LoginLayout,
    children: [
      { path: '', Component: MonitoringPage }
    ],
  },
  {
    path: '/realtime',
    Component: MainLayout,
    children: [
      { path: 'operation-status', Component: OperationStatusPage }
    ],
  },
//   // 자사용 라우터 (/admin/...)
  {
    path: '/admin',
    Component: MainLayout,
    children: [
      { path: '', Component: CompanyPage },
      { path: 'company', Component: CompanyPage },
      { path: 'admin-user', Component: AdminUserPage },
      { path: 'battery-model', Component: BatteryModelPage },
      { path: 'battery-data-config', Component: BatteryDataConfigPage },
      { path: 'battery-pack', Component: BatteryPackPage },
    ],
  },
  {
    path: '/admin/login',
    Component: LoginLayout,
    children: [
      { path: '', Component: LoginPageBW },
    ],
  },
]);

export default router;