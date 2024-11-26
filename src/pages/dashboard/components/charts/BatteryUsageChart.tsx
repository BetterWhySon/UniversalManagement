import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PieChart from '@/components/charts/PieChart';

const BatteryUsageChart: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipText = '집합건물에서 관리 중인 전기차의 대수와 관리 차량 및 미관리 차량에 대한 정보를 제공.\n배터리 진단이 가능하지만 관리 차량으로 등록되지 않은 차량에 대해서는, 집합건물 전체의 안전을 강화하기 위해 등록을 독려';

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const [data] = useState([
    { name: '등록차', value: 28, itemStyle: { color: '#3B82F6' } },
    { name: '미등록(지원가능)', value: 13, itemStyle: { color: '#EF4444' } },
    { name: '미등록(지원불가)', value: 6, itemStyle: { color: '#6B7280' } },
  ]);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const handleSliceClick = (name: string) => {
    if (name === '미등록(지원가능)' || name === '미등록(지원불가)') {
      navigate('/battery-usage-chart', { state: { type: name } });
    }
  };

  return (
    <div className="bg-hw-dark-2 p-3 rounded-lg border border-white h-full flex flex-col">
      <h3 
        className="text-white text-lg mb-1 cursor-help"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {trans("전기차 미등록 현황")}
      </h3>
      <div className="flex-grow flex flex-col">
        <div className="flex-grow">
          <PieChart data={data} onSliceClick={handleSliceClick} />
        </div>
        <div className="flex text-sm justify-center space-x-3 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
              <span className="text-gray-400 whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center text-white text-lg font-semibold mt-2">
          총 {total}대
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

export default BatteryUsageChart;
