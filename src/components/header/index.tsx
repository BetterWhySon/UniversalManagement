import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { cn } from '@/helpers/class-name.helper';
import { DATE_FORMAT } from '@/constants/time.constant';
import useLoginStore from '@/api/loginStore';
import useAccessInfoStore from '@/api/accessInfoStore';
import { websocketURL } from '@/api/URLs';
import { PATH } from '@/router/path';

import BWIcon from '@/assets/images/bw_icon.png';

export default function Header() {
  const { t: trans } = useTranslation('translation');
  const [time, setTime] = useState(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ... (기존 useEffect 코드 유지)
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate('/login');
      return;
    }
  }, []);

  function tick() {
    setTime(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  }

  const handleSettingsClick = () => {
    navigate(PATH.SETTING.get('STANDARD_INFO', 'SERVICE_STATUS'));
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleStatusItemClick = (status: string) => {
    navigate(PATH.DASHBOARD.BATTERY_STATUS, { state: { status } });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMonitoringClick = () => {
    navigate(PATH.MONITORING.get());
  };

  const handleOperationStatusClick = () => {
    navigate('/realtime/operation-status');
  };

  return (
    <header className={cn('z-50 h-16 flex items-center justify-between px-6 bg-slate-800 w-full fixed top-0 left-0')}>
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
      >
        <div className="bg-white p-1 rounded">
          <img src={BWIcon} alt="BW Icon" className="h-10 w-auto" />
        </div>
        <span className="text-white text-2xl font-bold">실시간 종합관제</span>
      </div>
      <div className="flex items-center gap-8 ml-auto">
        <StatusItem 
          label="사용대기" 
          value="28" 
          unit="대" 
          onClick={() => handleStatusItemClick('사용대기')} 
        />
        <StatusItem 
          label="방전중" 
          value="2" 
          unit="대" 
          textColor="text-green-500" 
          onClick={() => handleStatusItemClick('방전중')} 
        />
        <StatusItem 
          label="충전중" 
          value="6" 
          unit="대" 
          textColor="text-green-500" 
          onClick={() => handleStatusItemClick('충전중')} 
        />
        <StatusItem 
          label="오프라인" 
          value="12" 
          unit="대" 
          onClick={() => handleStatusItemClick('오프라인')} 
        />
        <div className="flex items-center gap-2">         
          <button 
            onClick={handleLogoutClick}
            className="px-3 py-1 text-base font-medium text-white hover:bg-hw-dark-1 rounded transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}

type StatusItemProps = {
  label: string;
  value: string;
  unit: string;
  textColor?: string;
  onClick?: () => void;
};

function StatusItem({ label, value, unit, textColor = 'text-white', onClick }: StatusItemProps) {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick && onClick()}
    >
      <span className="text-gray-400 text-sm">{label}</span>
      <div className={`font-bold ${textColor} flex items-end`}>
        <span className="text-2xl">{value}</span>
        <span className="text-l ml-1">{unit}</span>
      </div>
    </div>
  );
}
