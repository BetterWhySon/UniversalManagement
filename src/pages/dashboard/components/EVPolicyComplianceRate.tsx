import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';
import PolicyCompliance from '@/pages/dashboard/pages/PolicyCompliancePage';

const EVPolicyComplianceRate: React.FC = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const tooltipText = '집합 건물 단위의 전기차 관리 정책 및 규약에 따라 설정된 항목 값의 실제 준수 여부를 모니터링';

  return (
    <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
      <h3 className="text-white text-lg mb-4 text-left">관리알람</h3>
      <div className="flex justify-center flex-grow overflow-auto">
        <div 
          className="w-full flex flex-col justify-center items-center py-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-[#FFE699] text-xl font-semibold mb-3">관리</p>
          <p className="text-[#FFE699] text-8xl font-bold mb-3">2</p>
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
              <PolicyCompliance alarmType="관리" />
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

export default EVPolicyComplianceRate;