import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './path';
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
import EVehicleRegistrationPage from '@/pages/admin/admin_customer/e_vehicle_registration/page';
import ServiceStatusPage from '@/pages/setting/service-status/page';
import BatteryRegistrationPage from '@/pages/setting/battery-registration/page';
import RealtimeMonitoringPage from '@/pages/setting/realtime-monitoring/page';
import OperationStatusPage from '@/pages/realtime/OperationStatusPage';
import IndividualLookupPage from '@/pages/setting/individual-lookup/page';
import CategoryLookupPage from '@/pages/setting/category-lookup/page';
import DeviceLookupPage from '@/pages/setting/device-lookup/page';
import DailyOperationPage from '@/pages/setting/daily-operation/page';
import UsageHistoryPage from '@/pages/setting/usage-history/page';
import AlarmHistoryPage from '@/pages/setting/alarm-history/page';

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            { path: '', Component: DashboardPage },
            { path: '/system/:systemId', Component: SystemPage },
            { path: '/system/:systemId/rack/:rackId', Component: SystemPage },
            { path: '/system/:systemId/rack/:rackId/cell', Component: SystemPage },
            { path: PATH.DASHBOARD.BATTERY_STATUS, Component: BatteryStatusPage },
            { path: PATH.DASHBOARD.POLICY_COMPLIANCE, Component: PolicyCompliancePage },
            { path: PATH.DASHBOARD.UNUSED_BATTERY, Component: UnusedBatteryPage },
            { path: PATH.DASHBOARD.CHARGING_STATUS, Component: ChargingStatusPage },
            { path: PATH.SETTING.get('STANDARD_INFO', 'SERVICE_STATUS'), Component: ServiceStatusPage },
            // { path: PATH.SETTING.get('STANDARD_INFO', 'BATTERY_REGISTRATION'), Component: BatteryRegistrationPage },
            // { path: PATH.SETTING.get('MONITORING', 'REALTIME'), Component: RealtimeMonitoringPage },
            // { path: PATH.SETTING.get('MONITORING', 'OPERATION'), Component: OperationStatusPage },
            // { path: PATH.SETTING.get('BATTERY', 'INDIVIDUAL'), Component: IndividualLookupPage },
            // { path: PATH.SETTING.get('BATTERY', 'BY_CATEGORY'), Component: CategoryLookupPage },
            // { path: PATH.SETTING.get('BATTERY', 'BY_DEVICE'), Component: DeviceLookupPage },
            // { path: PATH.SETTING.get('STATISTICS', 'DAILY_OPERATION'), Component: DailyOperationPage },
            // { path: PATH.SETTING.get('STATISTICS', 'USAGE_HISTORY'), Component: UsageHistoryPage },
            // { path: PATH.SETTING.get('STATISTICS', 'ALARM_HISTORY'), Component: AlarmHistoryPage },
        ],
    },
    {
        path: '/login',
        Component: LoginLayout,
        children: [
            {
                path: '',
                Component: LoginPage,
            },
        ],
    },
    {
        path: '/monitoring',
        Component: LoginLayout,
        children: [
            {
                path: '', 
                Component: MonitoringPage,
            },
        ],
    },
    {
        path: PATH.ADMIN_BW.get(),
        Component: MainLayout,
        children: [],
    },
    // {
    //     path: PATH.ADMIN_CUSTOMER.get(),
    //     Component: MainLayout,
    //     children: [
    //         {
    //             path: '',
    //             Component: EVehicleRegistrationPage,
    //         },
    //         {
    //             path: PATH.ADMIN_CUSTOMER.E_VEHICLE_REGISTRATION,
    //             Component: EVehicleRegistrationPage,
    //         },
    //     ],
    // },
    {
        path: '/realtime',
        Component: MainLayout,
        children: [
            {
                path: 'operation-status',
                Component: OperationStatusPage,
            },
        ],
    },
]);

export default router;