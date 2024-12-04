import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

const EVPolicyComplianceRate: React.FC = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState<'soc' | 'charge' | false>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    navigate(`${PATH.DASHBOARD.POLICY_COMPLIANCE}`);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const tooltipText = '집합 건물 단위의 전기차 관리 정책 및 규약에 따라 설정된 항목 값의 실제 준수 여부를 모니터링. ' +
    '설정 기준을 기반으로 차량이 규약을 얼마나 준수하고 있는지 평가\n' +
    ' - 집합건물 입차시, Soc 제한\n'+
    ' - 집합건물 내 충전시, 충전율 제한\n'+
    ' - 전기차 safety zone 주차 준수\n'+
    ' - 사용자 설정 가능';

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-white h-full flex flex-col overflow-hidden">
      <h3 className="text-white text-lg mb-4 text-left">전기차 관리정책 준수율</h3>
      <div className="flex justify-between flex-grow overflow-auto">
        <div 
          className="w-[48%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('soc')}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-white text-xl font-semibold mb-2">주의</p>
          <p className="text-yellow-500 text-7xl font-bold mb-2">2</p>
          <p className="text-gray-400 text-base">신규 ± 1 / 해제 0</p>
        </div>
        <div 
          className="w-[48%] flex flex-col justify-center items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip('charge')}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-white text-xl font-semibold mb-2">경고</p>
          <p className="text-orange-500 text-7xl font-bold mb-2">0</p>
          <p className="text-gray-400 text-base">신규 ± 1 / 해제 0</p>
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

export default EVPolicyComplianceRate;