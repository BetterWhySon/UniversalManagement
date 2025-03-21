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
import BatteryStatusPage from '@/pages/dashboard/pages/BatteryStatusPage';

import BWIcon from '@/assets/images/bw_icon.png';

export default function Header() {
  const { t: trans } = useTranslation('translation');
  const [time, setTime] = useState(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

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
    setSelectedStatus(status);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedStatus(null);
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
    <>
      <header className={cn('z-50 h-16 flex items-center justify-between px-6 bg-[#2B313B] w-full fixed top-0 left-0')}>
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
            label="전체대수" 
            value="48" 
            unit="대" 
            labelColor="text-white"
            valueColor="text-white"
            onClick={() => handleStatusItemClick('전체대수')} 
          />
          <StatusItem 
            label="사용대기" 
            value="28" 
            unit="대" 
            labelColor="text-[#FFD03B]"
            valueColor="text-[#FFD03B]"
            onClick={() => handleStatusItemClick('사용대기')} 
          />
          <StatusItem 
            label="사용중" 
            value="2" 
            unit="대" 
            labelColor="text-[#6CFF31]"
            valueColor="text-[#6CFF31]"
            onClick={() => handleStatusItemClick('사용중')} 
          />
          <StatusItem 
            label="충전중" 
            value="6" 
            unit="대" 
            labelColor="text-[#8AA8DA]"
            valueColor="text-[#8AA8DA]"
            onClick={() => handleStatusItemClick('충전중')} 
          />
          <StatusItem 
            label="오프라인" 
            value="12" 
            unit="대" 
            labelColor="text-[#A1A1A1]"
            valueColor="text-[#A1A1A1]"
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

      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleClosePopup}
        >
          <div 
            className="bg-hw-dark-1 rounded-lg w-full max-w-[95%] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-hw-dark-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                {selectedStatus === '전체대수' ? '실시간 배터리 상태정보' : `${selectedStatus} 배터리 상태정보`}
              </h2>
              <button 
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="h-[calc(90vh-4rem)] overflow-auto">
              <BatteryStatusPage selectedStatus={selectedStatus || undefined} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type StatusItemProps = {
  label: string;
  value: string;
  unit: string;
  labelColor?: string;
  valueColor?: string;
  onClick?: () => void;
};

function StatusItem({ 
  label, 
  value, 
  unit, 
  labelColor = 'text-white', 
  valueColor = 'text-white', 
  onClick 
}: StatusItemProps) {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick && onClick()}
    >
      <span className={`text-sm ${labelColor}`}>{label}</span>
      <div className={`font-bold flex items-end ${valueColor}`}>
        <span className="text-2xl">{value}</span>
        <span className="text-l ml-1">{unit}</span>
      </div>
    </div>
  );
}
