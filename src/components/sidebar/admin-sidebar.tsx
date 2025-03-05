import React, { useState, useEffect } from 'react';
import { cn } from '@/helpers/class-name.helper';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Arrow } from '../icons';
import { useTranslation } from 'react-i18next';
import { ADMIN_SIDEBAR_MENU } from '@/constants/sidebar-admin.constant';
import { Select } from 'antd';
import CompanySearchPopup from '@/pages_bw/admin-user/components/CompanySearchPopup';

const MenuItem = ({ 
  title, 
  href, 
  indent,
  onMenuClick 
}: { 
  title: string; 
  href: string; 
  indent?: boolean;
  onMenuClick: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    onMenuClick();  // 부모로부터 전달받은 함수 호출
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        'flex items-center transition-all duration-100 rounded-md',
        indent 
          ? 'text-[15px] font-light leading-none hover:bg-hw-gray-9 pl-8'
          : 'text-[16px] font-normal leading-none hover:bg-hw-gray-9 pl-3',
        indent
          ? (isActive ? 'text-hw-orange-1' : 'text-gray-400')
          : (isActive ? 'text-hw-orange-1' : 'text-gray-100')
      )}
    >
      <span className="py-2">{title}</span>
    </Link>
  );
};

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t: trans } = useTranslation('translation');
  const [isVisible, setIsVisible] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(ADMIN_SIDEBAR_MENU.map(menu => menu.name));
  const isSuperUser = localStorage.getItem("is_admin_superuser") === "true";
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    localStorage.getItem("customer_name_selected") || null
  );
  const [isManufacturerSearchOpen, setIsManufacturerSearchOpen] = useState(false);
  const [isManufacturerSelected, setIsManufacturerSelected] = useState(
    localStorage.getItem("is_ManufacturerSelected") === "true"
  );

  // localStorage의 변경을 감지하여 상태 업데이트
  useEffect(() => {
    const isManufacturerSelected = localStorage.getItem("is_ManufacturerSelected") === "true";
    const customerNameSelected = localStorage.getItem("customer_name_selected");
    const customerName = localStorage.getItem("customer_name_selected");
    
    setIsManufacturerSelected(isManufacturerSelected);
    if (customerNameSelected) {
      setSelectedCompany(customerNameSelected);
    } else if (customerName) {
      setSelectedCompany(customerName);
    }
  }, []);

  // 메뉴 필터링 로직 수정
  const filteredMenu = ADMIN_SIDEBAR_MENU.map(menu => ({
    ...menu,
    subMenu: isSuperUser 
      ? (isManufacturerSelected 
          ? menu.subMenu  // 슈퍼유저이고 제조업체가 선택되었으면 모든 메뉴 표시
          : menu.subMenu?.filter(item => item.title === '회사'))  // 슈퍼유저이고 제조업체가 선택되지 않았으면 '회사'만 표시
      : menu.subMenu  // 슈퍼유저가 아니면 모든 메뉴 표시
  }));

  const handleMenuClick = (menuName: string) => {
    setOpenMenus(prev => {
      if (prev.includes(menuName)) {
        return prev.filter(name => name !== menuName);
      } else {
        return [...prev, menuName];
      }
    });
  };

  const handleMenuItemClick = () => {
    if (!isManufacturerSearchOpen) {
      setIsVisible(false);
    }
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
          'fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-hw-dark-2 transition-transform duration-300 z-40 flex flex-col',
          !isVisible && '-translate-x-60'
        )}
        onMouseLeave={() => {
          if (!isManufacturerSearchOpen) {
            setIsVisible(false);
          }
        }}
      >
        {/* 메인 메뉴 영역 */}
        <div className="flex-1 py-4 overflow-y-auto">
          <ul className='px-3'>
            {filteredMenu.map((menu, index) => (
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
                        <MenuItem 
                          title={subMenu.title} 
                          href={subMenu.href} 
                          indent={subMenu.indent}
                          onMenuClick={handleMenuItemClick}  // 함수 전달
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>

        {/* 제조업체 선택 영역 - 슈퍼유저일 때만 표시 */}
        {isSuperUser && (
          <div className="p-4 bg-gray-700 border-t border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm">제조업체 선택</span>
              <button 
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => setIsManufacturerSearchOpen(true)}
              >
                검색
              </button>
            </div>
            <div className="bg-gray-600 p-3 rounded">
              <div className="text-gray-300 text-base">
                {selectedCompany || '제조업체를 선택해주세요'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 제조업체 검색 팝업 - 슈퍼유저일 때만 표시 */}
      {isSuperUser && isManufacturerSearchOpen && (
        <CompanySearchPopup
          onClose={() => setIsManufacturerSearchOpen(false)}
          onSelect={(company) => {
            setSelectedCompany(company.name);
            setIsManufacturerSelected(true);
            setIsManufacturerSearchOpen(false);
            localStorage.setItem("is_ManufacturerSelected", "true");
            localStorage.setItem("customer_id_selected", company.id.toString());
            localStorage.setItem("customer_name_selected", company.name);
          }}
        />
      )}
    </>
  );
} 