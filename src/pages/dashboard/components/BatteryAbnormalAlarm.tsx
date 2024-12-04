import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

const BatteryAbnormalAlarm: React.FC = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState<'normal' | 'alarm' | false>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleAlarmClick = () => {
    navigate(`/${PATH.DASHBOARD.BATTERY_ALARM}`);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const getTooltipText = (type: 'normal' | 'alarm') => {
    if (type === 'normal') {
      return '관리 시스템 中 안전상의 문제가 없는 차량 대수';
    }
    return '관리 시스템 中 배터리 이상이 의심되는 시스템 수. 배터리 진단 알고리즘을 적용해 이상이 감지된 시스템을 식별하여, 잠재적인 고장이나 안전 위험에 대해 선제적으로 관리.';
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-white h-full flex flex-col overflow-hidden">
      <h3 className="text-white text-lg mb-4 text-left">배터리 이상알람</h3>
      <div className="flex justify-between flex-grow overflow-auto">
        <div 
          className="w-[48%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('normal')}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-white text-xl font-semibold mb-2">정상</p>
          <p className="text-green-500 text-7xl font-bold mb-2">25</p>
          {/* <p className="text-gray-400 text-base">전일대비 ↑ 1건</p> */}
          <p className="text-gray-400 text-base">&nbsp;</p>
        </div>
        <div 
          className="w-[48%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          onClick={handleAlarmClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('alarm')}
          onMouseLeave={() => setShowTooltip(false)}
        >          
          <p className="text-white text-xl font-semibold mb-2">이상알람</p>
          <p className="text-red-500 text-7xl font-bold mb-2">3</p>
          <p className="text-gray-400 text-base">신규 ± 1 / 해제 0</p>
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
    </div>
  );
};

export default BatteryAbnormalAlarm;
