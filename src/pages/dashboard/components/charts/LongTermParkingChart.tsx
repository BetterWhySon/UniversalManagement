import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BarChart from '@/components/charts/BarChart';
import VehicleDetailPopup from '@/components/popup/VehicleDetailPopup';

const LongTermParkingChart: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipText = '집합건물 내 전기차의 안전 관리를 위해 세부 항목을 설정하여 모니터링.\n세부항목으로는 이상알람 누적 횟수, 충전 완료 후, 경과시간, 권장 SOC 범위 초과, 권장 충전율 초과, 장기주차, 배터리 스트레스, 온도/전류/전압/저항/용량 편차 등.\n세부 항목 설정을 통해 전기차의 안전성을 체계적으로 관리하고, 잠재적인 위험 요소를 조기에 감지하여 대응가능';

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  // 임시 데이터
  const [longTermParkingData] = useState([
    { id: '82라1810', soc: 129.6 },
    { id: '06가1919', soc: 115.2 },
    { id: '68사1744', soc: 86.4 },
    { id: '67사1606', soc: 76.8 },
    { id: '66어1468', soc: 52.8 },
    { id: '16사9947', soc: 40.8 },
  ].reverse());

  const handleBarClick = (id: string) => {
    // 실제 구현에서는 이 데이터를 API에서 가져와야 합니다.
    const vehicleDetail = {
      unitNumber: '202동 1002호',
      owner: '김영식',
      contact: '010-4827-7782',
      chargingStatus: '주차중',
      vehicleType: 'EV6',
      vehicleNumber: id,
      batteryStatus: 'C+',
      batteryHealth: '88점'
    };
    setSelectedVehicle(vehicleDetail);
  };

  const closePopup = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="bg-hw-dark-2 p-3 rounded-lg border border-white h-full flex flex-col">
      <h3 
        className="text-white text-lg mb-1 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {trans("장기주차 list (시간)")}
      </h3>
      <div className="flex-grow">
        <BarChart data={longTermParkingData} onBarClick={handleBarClick} />
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <VehicleDetailPopup vehicle={selectedVehicle} onClose={closePopup} />
        </div>
      )}

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

export default LongTermParkingChart;