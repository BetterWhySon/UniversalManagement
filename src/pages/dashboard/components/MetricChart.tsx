import React, { useState, useMemo } from 'react';
import BarChart from '@/components/charts/BarChart';
import VehicleDetailPopup from '@/components/popup/VehicleDetailPopup';
import FilterPopup from './subComponents/FilterPopup';

interface MetricChartProps {
  type: 'stress' | 'soc' | 'efficiency';
  selectedTitle?: string;
  onMetricsSelect: (items: string[]) => void;
  selectedMetrics: string[];
}

const MetricChart: React.FC<MetricChartProps> = ({ 
  type, 
  selectedTitle, 
  onMetricsSelect,
  selectedMetrics 
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isWorst, setIsWorst] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const chartConfig = {
    stress: {
      title: '스트레스 지수',
      tooltipText: '스트레스 지수는 배터리의 상태와 사용 패턴을 분석하여 산출된 값으로, 배터리의 수명과 안전성을 예측하는 지표입니다.'
    },
    soc: {
      title: 'SOC',
      tooltipText: 'SOC(State of Charge)는 배터리의 현재 충전 상태를 나타내는 지표입니다. 권장 범위를 벗어난 SOC는 배터리 수명에 영향을 줄 수 있습니다.'
    },
    efficiency: {
      title: '전비',
      tooltipText: '전비(전력효율)는 단위 전력당 주행거리를 나타내는 지표입니다. 낮은 전비는 배터리 효율이 떨어지거나 비정상적인 전력 소비가 있을 수 있음을 의미합니다.'
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const [data] = useState([
    { id: '82라1810', time: 88 },
    { id: '06가1919', time: 81 },
    { id: '68사1744', time: 62 },
    { id: '67사1606', time: 55 },
    { id: '66어1468', time: 48 },
    { id: '16사9947', time: 40.8 },
  ]);

  const sortedData = useMemo(() => {
    return isWorst 
      ? [...data].sort((a, b) => a.time - b.time)
      : [...data].sort((a, b) => b.time - a.time);
  }, [data, isWorst]);

  const handleBarClick = (id: string) => {
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

  const handleFilterApply = (items: string[]) => {
    onMetricsSelect(items);
    setIsFilterOpen(false);
  };

  const displayTitle = selectedTitle || chartConfig[type].title;

  return (
    <div className="bg-slate-800 p-3 rounded-lg border border-white h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setIsFilterOpen(true)}
        >
          {displayTitle}
        </h3>
        <button 
          className="bg-blue-800 text-white px-2 py-0.5 text-sm rounded hover:bg-blue-700"
          onClick={() => setIsWorst(!isWorst)}
        >
          {isWorst ? 'worst' : 'best'}
        </button>
      </div>
      <div className="flex-grow">
        <BarChart 
          data={sortedData}
          isTimeData={true}
          onBarClick={handleBarClick}
          tMargin={type === 'stress' ? 5 : undefined}
        />
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <VehicleDetailPopup vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
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
          {chartConfig[type].tooltipText}
        </div>
      )}

      <FilterPopup 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        maxChecked={3}
        exactCount={true}
        onApply={handleFilterApply}
        selectedItems={selectedMetrics}
      />
    </div>
  );
};

export default MetricChart; 