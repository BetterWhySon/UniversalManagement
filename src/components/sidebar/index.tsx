import { cn } from '@/helpers/class-name.helper';
import { Link, useLocation } from 'react-router-dom';
import { SidebarTab, SubmenuItem } from '@/types/sidebar-menu.type';
import { Arrow } from '../icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SIDEBAR_MENU } from '@/constants/sidebar.constant';

type Props = {
  isOpenSidebar: boolean;
};

export default function Sidebar({ isOpenSidebar }: Props) {
  const location = useLocation();
  const { t: trans } = useTranslation('translation');
  const [openMenus, setOpenMenus] = useState<string[]>(
    SIDEBAR_MENU.map(menu => menu.name)
  );

  const handleMenuClick = (menuName: string) => {
    setOpenMenus(prev => {
      if (prev.includes(menuName)) {
        return prev.filter(name => name !== menuName);
      } else {
        return [...prev, menuName];
      }
    });
  };

  return (
    <div
      className={cn(
        'w-full h-full no-scrollbar bg-hw-dark-1 lg:w-[15.3125rem] transition-all fixed left-0 lg:!left-0 top-14 z-50',
        !isOpenSidebar && 'left-[-100%]',
      )}>
      <div className='no-scrollbar w-full max-h-[calc(100vh-56px)] lg:h-[56.4375rem] overflow-y-auto bg-hw-dark-2 pt-4 flex flex-col'>
        <div className="text-yellow-300 text-2xl px-6 mb-8">Menu</div>
        <ul className='px-3'>
          {SIDEBAR_MENU.map((menu, index) => (
            <div key={index}>
              <div
                className="text-white flex items-center justify-between px-3 py-3 h-12 text-lg font-bold leading-none hover:bg-hw-gray-9 transition-all duration-100 rounded-md cursor-pointer"
                onClick={() => handleMenuClick(menu.name)}
              >
                <span>{menu.name}</span>
                <div className={cn('rotate-0 transition-all duration-100', openMenus.includes(menu.name) && 'rotate-180')}>
                  <Arrow className="stroke-hw-white-1" />
                </div>
              </div>
              {openMenus.includes(menu.name) && menu.subMenu && (
                <ul className='pl-6'>
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subMenu.href}
                        className={cn(
                          'flex items-center px-3 py-2 text-base font-light leading-none hover:bg-hw-gray-9 transition-all duration-100 rounded-md',
                          location.pathname === subMenu.href ? 'text-hw-orange-1' : 'text-gray-400'
                        )}>
                        {subMenu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
