import MainLayout from '@/layout/main-layout';
import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/page';
import LoginPage from '@/pages/login/page';
import MonitoringPage from '@/pages/monitoring/page';
import LoginLayout from '@/layout/login-layout';
import { PATH } from './path';
// import StatusPage from '@/pages/admin/status/page';
import SystemPage from '@/pages/system/page';

import BatteryStatusPage from '@/pages/dashboard/pages/BatteryStatusPage'; 

// import BatteryAlarmPage from '@/pages/dashboard/pages/status-overview/battery-alarm/page';
// import PolicyCompliancePage from '@/pages/dashboard/pages/status-overview/policy-compliance/page';
// import ServiceRequirementPage from '@/pages/dashboard/pages/status-overview/service-requirement/page';
// import ChargingSummaryPage from '@/pages/dashboard/pages/status-overview/charging-summary/page';

// import BatteryUsageChartPage from '@/pages/dashboard/pages/charts/battery-usage-chart/page'; // 새로운 import 추가
// import StatisticalDataPage from '@/pages/dashboard/pages/charts/statistical-data/page'; // 새로운 import 추가

// import ManagementStatusPage from '@/pages/dashboard/pages/management-status/page';

import EVehicleRegistrationPage from '@/pages/admin/admin_customer/e_vehicle_registration/page';
// import EVcheckRegistrationPage from '@/pages/admin/admin_customer/evcheck_registration/page';

import PolicyCompliancePage from '@/pages/dashboard/pages/PolicyCompliancePage';
import UnusedBatteryPage from '@/pages/dashboard/pages/UnusedBatteryPage';
import ChargingStatusPage from '@/pages/dashboard/pages/ChargingStatusPage';

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
            // { path: PATH.DASHBOARD.SERVICE_REQUIREMENT, Component: ServiceRequirementPage },
            // { path: PATH.DASHBOARD.CHARGING_SUMMARY, Component: ChargingSummaryPage },
            // { path: PATH.DASHBOARD.BATTERY_USAGE_CHART, Component: BatteryUsageChartPage },
            // { path: PATH.DASHBOARD.STATISTICAL_DATA, Component: StatisticalDataPage },
            // { path: PATH.DASHBOARD.MANAGEMENT_STATUS, Component: ManagementStatusPage },            
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
                path: '', Component: MonitoringPage,    // dashboard
            },
        ],
    },

    {
        path: PATH.ADMIN_BW.get(),
        Component: MainLayout,
        children: [
            //   {
            //     path: '',
            //     Component: StatusPage,
            //   },            
        ],
    },
    {
        path: PATH.ADMIN_CUSTOMER.get(),
        Component: MainLayout,
        children: [
            {
                path: '',
                Component: EVehicleRegistrationPage,
            },
            {
                path: PATH.ADMIN_CUSTOMER.E_VEHICLE_REGISTRATION,
                Component: EVehicleRegistrationPage,
            },
            //   {
            //     path: PATH.ADMIN_CUSTOMER.EVCHECK_REGISTRATION,
            //     Component: EVcheckRegistrationPage,
            //   }
        ],
    },
]);

export default router;
