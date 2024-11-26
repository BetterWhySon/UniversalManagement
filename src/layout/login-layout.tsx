import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function LoginLayout() {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-fit text-hw-white-1'>
      <Outlet />
    </div>
  );
}
