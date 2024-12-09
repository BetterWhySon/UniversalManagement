import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';

const Layout: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(true);

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar isOpenSidebar={isOpenSidebar} />

      {/* Main Content */}
      <div className="flex-1 ml-[15.3125rem] p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 