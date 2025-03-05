import { useState, useEffect } from 'react';
import { cn } from '@/helpers/class-name.helper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BWIcon from '@/assets/images/white-logo.png';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    // ... (기존 useEffect 코드 유지)
    const token = localStorage.getItem("token_admin");
    if (token === null) {
      navigate('/admin/login');
      return;
    }
  }, []);

  const handleLogout = () => {
    // localStorage.clear();
    localStorage.removeItem('token_admin');
    localStorage.removeItem('username_admin');
    localStorage.removeItem('is_admin_superuser');
    localStorage.removeItem('is_admin_admin');
    localStorage.removeItem('customer_id');
    localStorage.removeItem('customer_name');
    localStorage.removeItem('customer_id_selected');
    localStorage.removeItem('customer_name_selected');
    localStorage.removeItem('is_ManufacturerSelected');
    localStorage.removeItem('selected_manufacturer');
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-hw-dark-2 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={BWIcon} alt="BW Icon" className="h-8 w-auto" />
          <span className="text-lg font-bold text-white">관리자 시스템</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-hw-white-2 hover:text-hw-orange-1 transition-colors"
        >
          {trans('logout')}
        </button>
      </div>
    </header>
  );
} 