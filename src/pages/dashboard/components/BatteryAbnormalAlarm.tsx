import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';
import BatteryAlarmDetail from './BatteryAlarmDetail';
import PolicyCompliance from '@/pages/dashboard/pages/PolicyCompliancePage';

const BatteryAbnormalAlarm: React.FC = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState<'normal' | 'warning' | 'danger' | false>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'normal' | 'warning' | 'danger'>('normal');

  const handleAlarmClick = (type: 'normal' | 'warning' | 'danger') => {
    if (type === 'normal') {
      return;
    }
    setPopupType(type);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const getTooltipText = (type: 'normal' | 'warning' | 'danger') => {
    if (type === 'normal') {
      return '관리 시스템 中 안전상의 문제가 없는 차량 대수';
    }
    if (type === 'warning') {
      return '관리 시스템 中 배터리 이상이 의심되는 시스템 수';
    }
    return '관리 시스템 中 긴급 점검이 필요한 시스템 수';
  };

  return (
    <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
      <h3 className="text-white text-lg mb-4 text-left">배터리 이상알람</h3>
      <div className="flex justify-between flex-grow overflow-auto">
        <div 
          className="w-[32%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          onClick={() => handleAlarmClick('normal')}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('normal')}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-[#A9D18E] text-xl font-semibold mb-3">정상</p>
          <p className="text-[#A9D18E] text-8xl font-bold mb-3">25</p>
          <p className="text-gray-400 text-base">&nbsp;</p>
        </div>
        <div 
          className="w-[32%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          onClick={() => handleAlarmClick('warning')}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('warning')}
          onMouseLeave={() => setShowTooltip(false)}
        >          
          <p className="text-[#F4B183] text-xl font-semibold mb-3">경고</p>
          <p className="text-[#F4B183] text-8xl font-bold mb-3">2</p>
          <p className="text-gray-400 text-base">신규 ± 1 / 해제 0</p>
        </div>
        <div 
          className="w-[32%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          onClick={() => handleAlarmClick('danger')}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('danger')}
          onMouseLeave={() => setShowTooltip(false)}
        >          
          <p className="text-[#FF6969] text-xl font-semibold mb-3">위험</p>
          <p className="text-[#FF6969] text-8xl font-bold mb-3">1</p>
          <p className="text-gray-400 text-base">신규 ± 0 / 해제 0</p>
        </div>
      </div>
      
      {showTooltip && (
        <div 
          className="fixed bg-white text-gray-500 px-4 py-2.5 rounded text-sm pointer-events-none max-w-[300px] leading-5"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y - 40}px`,
            zIndex: 1000,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
          }}
        >
          {getTooltipText(showTooltip)}
        </div>
      )}

      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          <div 
            className="bg-gray-800 rounded-lg w-[90%] h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[90vh] overflow-auto">
              {popupType === 'normal' ? (
                <BatteryAlarmDetail onClose={handleClosePopup} />
              ) : (
                <PolicyCompliance alarmType={popupType === 'warning' ? '경고' : '위험'} />
              )}
            </div>
            <div className="absolute bottom-4 right-4">
              <button 
                onClick={handleClosePopup}
                className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatteryAbnormalAlarm;
