import React, { useState, useEffect } from 'react';
import { cn } from '@/helpers/class-name.helper';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Arrow } from '../icons';
import { useTranslation } from 'react-i18next';
import { SIDEBAR_MENU } from '@/constants/sidebar.constant';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t: trans } = useTranslation('translation');
  const [isVisible, setIsVisible] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(SIDEBAR_MENU.map(menu => menu.name));

  const handleMenuClick = (menuName: string) => {
    setOpenMenus(prev => {
      if (prev.includes(menuName)) {
        return prev.filter(name => name !== menuName);
      } else {
        return [...prev, menuName];
      }
    });
  };

  const handleSubMenuClick = (href: string) => {
    navigate(href);
    setIsVisible(false);  // 메뉴 선택 후 사이드바 숨기기
  };

  return (
    <>
      {/* 마우스 감지 영역 */}
      <div 
        className="fixed left-0 top-0 w-4 h-screen z-50"
        onMouseEnter={() => setIsVisible(true)}
      />

      {/* 사이드바 */}
      <div
        className={cn(
          'fixed left-0 top-14 w-[15.3125rem] h-[calc(100vh-56px)] bg-hw-dark-1 transition-transform duration-300 ease-in-out z-40',
          isVisible ? 'translate-x-0' : '-translate-x-full'
        )}
        onMouseLeave={() => setIsVisible(false)}
      >
        <div className='no-scrollbar w-full h-full overflow-y-auto bg-hw-dark-2 pt-4 flex flex-col'>
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
                          onClick={() => handleSubMenuClick(subMenu.href)}
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
    </>
  );
}
