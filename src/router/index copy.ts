// import MainLayout from '@/layout/main-layout';
// import { createBrowserRouter } from 'react-router-dom';
// import DashboardPage from '@/pages/dashboard/page';
// import LoginPage from '@/pages/login/page';
// import MonitoringPage from '@/pages/monitoring/page';
// import LoginLayout from '@/layout/login-layout';
// import { PATH } from './path';
// import StatusPage from '@/pages/admin/status/page';
// import SystemPage from '@/pages/system/page';
// import ShipManagementPage from '@/pages/admin/ship-management/page';
// import ShipStatisticsManagementPage from '@/pages/admin/ship-statistics_management/page';
// import UserManagementPage from '@/pages/admin/user-management/page';
// import UserAddDeletePage from '@/pages/admin/user-add-delete/page';
// import BMSManagementPage from '@/pages/admin/BMS-management/page';
// import ConnectionInformationPage from '@/pages/admin/connection-information/page';
// import FileManagementPage from '@/pages/admin/file-management/page';
// import ServerManagementPage from '@/pages/admin/server-management/page';
// import Modeling3DPage from '@/pages/3d-modeling';

// import PolicyCompliancePage from '@/pages/dashboard/pages/status-overview/policy-compliance/page';
// import ServiceRequirementPage from '@/pages/dashboard/pages/status-overview/service-requirement/page';
// import ChargingSummaryPage from '@/pages/dashboard/pages/status-overview/charging-summary/page';

// import BatteryUsageChartPage from '@/pages/dashboard/pages/charts/battery-usage-chart/page'; // 새로운 import 추가
// import StatisticalDataPage from '@/pages/dashboard/pages/charts/statistical-data/page'; // 새로운 import 추가

// import ManagementStatusPage from '@/pages/dashboard/pages/management-status/page';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     Component: MainLayout,
//     children: [
//       { path: '', Component: DashboardPage },      
//       { path: '/3d-modeling', Component: Modeling3DPage },
//       { path: '/system/:systemId', Component: SystemPage },
//       { path: '/system/:systemId/rack/:rackId', Component: SystemPage },
//       { path: '/system/:systemId/rack/:rackId/cell', Component: SystemPage },
//       { path: PATH.DASHBOARD.POLICY_COMPLIANCE, Component: PolicyCompliancePage },
//       { path: PATH.DASHBOARD.SERVICE_REQUIREMENT, Component: ServiceRequirementPage },
//       { path: PATH.DASHBOARD.CHARGING_SUMMARY, Component: ChargingSummaryPage },
//       { path: PATH.DASHBOARD.BATTERY_USAGE_CHART, Component: BatteryUsageChartPage },
//       { path: PATH.DASHBOARD.STATISTICAL_DATA, Component: StatisticalDataPage },
//       { path: PATH.DASHBOARD.MANAGEMENT_STATUS, Component: ManagementStatusPage },
//     ],

//   },
//   {
//     path: '/login',
//     Component: LoginLayout,
//     children: [
//       {
//         path: '',
//         Component: LoginPage,
//       },
//     ],
//   },
//   {
//     path: '/monitoring',
//     Component: LoginLayout,
//     children: [
//       {
//         path: '', Component: MonitoringPage,
//       },
//     ],
//   },
//   {
//     path: PATH.ADMIN.get('LOGIN'),
//     Component: LoginLayout,
//     children: [
//       {
//         path: '',
//         Component: LoginPage,
//       },
//     ],
//   },
//   {
//     path: PATH.ADMIN.get(),
//     Component: MainLayout,
//     children: [
//       {
//         path: '',
//         Component: StatusPage,
//       },
//       {
//         path: PATH.ADMIN.SHIP_MANAGEMENT,
//         Component: ShipManagementPage,
//       },
//       {
//         path: PATH.ADMIN.SHIP_STATISTICS_MANAGEMENT,
//         Component: ShipStatisticsManagementPage,
//       },
//       {
//         path: PATH.ADMIN.BMS_MANAGEMENT,
//         Component: BMSManagementPage,
//       },
//       {
//         path: PATH.ADMIN.USER_MANAGEMENT,
//         Component: UserManagementPage,
//       },
//       {
//         path: PATH.ADMIN.USER_ADD_DELETE,
//         Component: UserAddDeletePage,
//       },
//       {
//         path: PATH.ADMIN.CONNECTION,
//         Component: ConnectionInformationPage,
//       },
//       {
//         path: PATH.ADMIN.FILE_MANAGEMENT,
//         Component: FileManagementPage,
//         // children: [          
//         //   { path: '/folder/:groupId', Component: FileManagementPage },          
//         // ],
//       },
//       {
//         path: PATH.ADMIN.FILE_MANAGEMENT+'/folder/:groupId',
//         Component: FileManagementPage,
        
//       },
//       {
//         path: PATH.ADMIN.SERVER_MANAGEMENT,
//         Component: ServerManagementPage,
//       },      
//     ],
//   },
// ]);

// export default router;
