import React, { useState } from 'react';
import DiagRingChart from '@/components/charts/DiagRingGraph';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

const ServiceRequirement: React.FC = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chartData = {
    value: 86
  };

  const tooltipText = '화재 발생 시 보상을 위한 필수 조건으로, 배터리 이상 사전 감지를 위해 주행 거리, 데이터 연동률, 미연동 기간 조건을 충족하는 관리 차량 비율. 해당 조건들은 배터리 상태를 지속적으로 모니터링하여 배터리 성능의 변화나 이상을 사전에 감지하기 위한 핵심 기준임\n' + 
    ' - 해당 조건을 충족하지 못하는 차량의 목록은 차트를 클릭하여 확인가능';

  const handleChartClick = () => {
    navigate(PATH.DASHBOARD.SERVICE_REQUIREMENT);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-white h-full flex flex-col">
      <h3 className="text-white text-lg mb-2">공동관제 보장서비스 요건 충족</h3>
      <div className="flex-grow flex items-center">
        <div 
          className="w-[55%] flex flex-col items-center justify-center cursor-pointer" 
          onClick={handleChartClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="w-44 h-44 mb-2">
            <DiagRingChart key="service-requirement" value={chartData.value} />
          </div>
          <div className="text-gray-400 text-sm">4대 미충족</div>
        </div>
        <div className="w-[45%] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mb-3">
            <span className="text-gray-400 text-sm">주행거리 3,000km</span>
            <span className="text-white font-bold text-lg">1</span>
          </div>
          <div className="flex flex-col items-center mb-3">
            <span className="text-gray-400 text-sm">데이터 연동율</span>
            <span className="text-white font-bold text-lg">3</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">미연동 기간</span>
            <span className="text-white font-bold text-lg">0</span>
          </div>
        </div>
      </div>

      {showTooltip && (
        <div 
          className="fixed bg-white text-gray-500 px-4 py-2.5 rounded text-sm pointer-events-none max-w-[300px] leading-5 whitespace-pre-line"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y - 40}px`,
            zIndex: 1000,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ServiceRequirement;