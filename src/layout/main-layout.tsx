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
      `/${PATH.DASHBOARD.BATTERY_ALARM}`,
      `/${PATH.DASHBOARD.POLICY_COMPLIANCE}`,
      `/${PATH.DASHBOARD.SERVICE_REQUIREMENT}`,
      `/${PATH.DASHBOARD.CHARGING_SUMMARY}`,
      `/${PATH.DASHBOARD.BATTERY_USAGE_CHART}`,
      `/${PATH.DASHBOARD.STATISTICAL_DATA}`,
      `/${PATH.DASHBOARD.MANAGEMENT_STATUS}`,
      '/3d-modeling'
    ].includes(location.pathname);
  };

  return (
    <div className='min-h-screen overflow-x-auto bg-hw-dark-1 text-hw-white-1 relative'>
      {!location.pathname.includes('/3d-modeling') ? (
        <>
          <Header isOpenSidebar={openSidebar} toggleSidebar={() => setOpenSidebar((prev) => !prev)} />
          <div className='pt-14'>
            {shouldShowSidebar() && <Sidebar isOpenSidebar={openSidebar} />}
            <div
              className={cn(
                'w-[calc(100%-15.3125rem)] transition-all origin-right ml-auto',
                !shouldShowSidebar() && 'w-full',
                'max-lg:w-full',
              )}>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}