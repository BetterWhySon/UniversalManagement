import Sidebar from '@/components/sidebar';
import AdminSidebar from '@/components/sidebar/admin-sidebar';
import Header from '@/components/header';
import AdminHeader from '@/components/header/admin-header';
import { cn } from '@/helpers/class-name.helper';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const isAdminPath = location.pathname.startsWith('/admin');

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setOpenSidebar(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isAdminPath && localStorage.getItem("is_admin_admin") !== "true") {
      navigate('/admin/login');
    }
  }, [location.pathname]);

  const shouldShowSidebar = () => {
    return ![
      '/',
      PATH.DASHBOARD.BATTERY_STATUS,    
      PATH.DASHBOARD.MANAGEMENT_STATUS,
      PATH.DASHBOARD.POLICY_COMPLIANCE,
      PATH.DASHBOARD.UNUSED_BATTERY,
      PATH.DASHBOARD.CHARGING_STATUS,
      PATH.DASHBOARD.OPERATION_STATUS,
      PATH.DASHBOARD.BATTERY_ALARM,
      PATH.DASHBOARD.BATTERY_ALARM_DETAIL,
      PATH.DASHBOARD.CHARGING_DETAIL,
      '/realtime/operation-status',
    ].includes(location.pathname);
  };

  return (
    <div className="min-h-screen bg-hw-dark-1 overflow-hidden">
      {isAdminPath ? <AdminHeader /> : <Header />}
      {isAdminPath ? <AdminSidebar /> : <Sidebar />}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-4 h-8 flex items-center justify-center text-white opacity-70">
        <span className="text-xl">&gt;</span>
      </div>
      <main className="w-full h-[calc(100vh-64px)] mt-16 overflow-auto pl-4">
        <Outlet />
      </main>
    </div>
  );
}