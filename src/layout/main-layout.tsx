import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { cn } from '@/helpers/class-name.helper';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setOpenSidebar(false);
  }, [location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("is_admin") !== "true") {
      navigate('/');
    }
  }, []);

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
    <div className="min-h-screen bg-hw-dark-1">
      <Header />
      <Sidebar />
      <main className="w-full min-h-[calc(100vh-56px)] mt-14">
        <Outlet />
      </main>
    </div>
  );
}