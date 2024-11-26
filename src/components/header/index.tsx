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


type Props = {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
};

export default function Header({ isOpenSidebar, toggleSidebar }: Props) {
  const { t: trans } = useTranslation('translation');
  const [time, setTime] = useState(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  const { username, storeUsername, storeIsAdminUser, storeIsLevel1, storeIsLevel2 } = useLoginStore();
  const { connect, disconnect, setNavigateCB } = useAccessInfoStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ... (기존 useEffect 코드 유지)
  }, []);

  function tick() {
    setTime(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  }

  const handleSettingsClick = () => {
    navigate('/admin/e-vehicle-registration');  // 실제 관리 페이지 경로로 수정해주세요
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleStatusItemClick = () => {
    navigate(PATH.DASHBOARD.MANAGEMENT_STATUS);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMonitoringClick = () => {
    navigate(PATH.MONITORING.get());
  };

  return (
    <header className={cn('z-50 h-14 flex items-center justify-between px-6 bg-hw-dark-2 w-full fixed top-0 left-0')}>
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
        <span className="text-white text-2xl font-bold">강남 푸르지오 EV 관리현황</span>
      </div>
      <div className="flex items-center gap-8 ml-auto">
        <StatusItem label="총 관리대수" value="28" unit="대" onClick={handleStatusItemClick} />
        <StatusItem label="단지 이동" value="2" unit="대" textColor="text-green-500" onClick={handleStatusItemClick} />
        <StatusItem label="충전중" value="6" unit="대" textColor="text-green-500" onClick={handleStatusItemClick} />
        <StatusItem label="주차중" value="12" unit="대" onClick={handleStatusItemClick} />
        <StatusItem label="외부 이동" value="8" unit="대" onClick={handleStatusItemClick} />
        <div className="flex items-center gap-2">
          <button 
            onClick={handleMonitoringClick}
            className="px-3 py-1 text-base font-medium text-white hover:bg-hw-dark-1 rounded transition-colors"
          >
            모니터링
          </button>
          <button 
            onClick={handleSettingsClick}
            className="px-3 py-1 text-base font-medium text-white hover:bg-hw-dark-1 rounded transition-colors"
          >
            설정
          </button>
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
  onClick?: () => void; // onClick 속성 추가
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
