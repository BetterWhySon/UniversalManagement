import { cn } from '@/helpers/class-name.helper';
import SidebarExtraMenu from './SidebarExtraMenu';
import { isAdmin } from '@/helpers/admin.helper';
import { SIDEBAR_MENU_ADMIN } from '@/constants/sidebar.constant';
import { Link, useLocation } from 'react-router-dom';
import { SidebarTab, SubmenuItem } from '@/types/sidebar-menu.type';
import { Divider, LanguageSetting, UserProfile, Arrow } from '../icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type Props = {
  isOpenSidebar: boolean;
};

export default function Sidebar({ isOpenSidebar }: Props) {
  const location = useLocation();
  const { t: trans } = useTranslation('translation');
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  const handleUserManagementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  return (
    <div
      className={cn(
        'w-full h-full no-scrollbar bg-hw-dark-1 lg:w-[15.3125rem] transition-all fixed left-0 lg:!left-0 top-14 z-50',
        !isOpenSidebar && 'left-[-100%]',
      )}>
      <div className='no-scrollbar w-full max-h-[calc(100vh-56px)] lg:h-[56.4375rem] overflow-y-auto bg-hw-dark-2 pt-0 lg:pt-4 flex flex-col'>
        {isAdmin() && (
          <ul className='px-3'>
            {SIDEBAR_MENU_ADMIN.map((tab: SidebarTab, index: number) => (
              <div key={index}>
                <div
                  className={`${location.pathname === tab.href ? 'text-hw-orange-1' : 'text-hw-white-1'
                    } flex items-center justify-between px-3 py-3 h-14 lg:h-12 text-base font-light leading-none hover:bg-hw-gray-9 transition-all duration-100 rounded-md`}
                >
                  <Link
                    to={tab.href}
                    className='flex-grow'
                    // onClick={tab.name === 'userManagement' ? handleUserManagementClick : undefined}
                    >
                    {trans(tab.name)}
                  </Link>
                  {tab.name === 'userManagement' && (
                    <div
                    className={cn('rotate-0 transition-all duration-100', isUserManagementOpen && 'rotate-180 duration-300')}
                    onClick={handleUserManagementClick} >
                    <Arrow
                      className={'stroke-hw-white-1'}
                    />
                  </div>

                  )}
                </div>
                {tab.name === 'userManagement' && isUserManagementOpen && tab.subMenu && (
                  <ul className='pl-6'>
                    {tab.subMenu.map((subTab: SubmenuItem, subIndex: number) => (
                      <li key={subIndex}>
                        <Link
                          to={subTab.href}
                          className={`${location.pathname === subTab.href ? 'text-hw-orange-1' : 'text-hw-white-1'
                            } flex items-center px-3 py-2 text-base font-light leading-none hover:bg-hw-gray-9 transition-all duration-100 rounded-md`}>
                          {trans(subTab.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        )}
        {!isAdmin() && (
          <>
            <Link
              to='/'
              className={cn(
                'w-full h-[56px] lg:h-fit py-3 pl-4 pr-4 mb-2 lg:mb-0 flex items-center font-light text-[16px] transition-all',
                location.pathname === '/' && 'text-hw-orange-1',
              )}>
              Home
            </Link>
            <div className='hidden lg:block min-h-[2px] h-[2px] mx-auto w-[calc(100%-16px)] bg-hw-gray-7.5 my-4'></div>
            <SidebarExtraMenu />
          </>
        )}
        <div className='pr-[6px] pt-[10px] pb-[18px] mt-2 h-12 items-center justify-end flex lg:hidden'>
          <span
            className={cn(
              'flex items-center gap-2 text-[14px] font-light leading-[14px] px-5 py-[10px] text-hw-white-2',
            )}>
            <UserProfile />
            <span>hanwha</span>
          </span>
          <Divider />
          <span className={cn('flex items-center px-5 py-[10px]')}>
            {/* <LanguageSetting /> */}
          </span>
        </div>
      </div>
    </div>
  );
}
