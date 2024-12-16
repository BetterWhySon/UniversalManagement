import React from 'react';
import DiagPieChart from '@/components/charts/DiagPieGraph';

interface RatioChartProps {
  data: Array<{
    id: string;
    ratio: number;
    category: string;
  }>;
}

const RatioChart: React.FC<RatioChartProps> = () => {
  const legendData = [
    { name: '사용시간', color: '#60A5FA' },  // 파랑
    { name: '충전시간', color: '#4ADE80' },  // 초록
    { name: '미사용', color: '#94A3B8' }     // 회색
  ];

  // 예시 데이터
  const mockData = Array(20).fill(null).map((_, index) => ({
    id: `VABJ${String(index + 1).padStart(3, '0')}`,
    data: [
      { name: '사용시간', value: 55, itemStyle: { color: '#60A5FA' } },  // 파랑
      { name: '충전시간', value: 25, itemStyle: { color: '#4ADE80' } },  // 초록
      { name: '미사용', value: 20, itemStyle: { color: '#94A3B8' } }     // 회색
    ]
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white text-xl">사용관리 지수</h2>
        <div className="flex gap-4">
          {legendData.map((item, index) => (
            <div key={index} className="flex items-center">
              <span 
                className="w-2 h-2 rounded-full mr-1" 
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-400 text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {mockData.map((item) => (
          <div key={item.id} className="bg-hw-dark-2 p-4 rounded-lg">
            <div className="text-yellow-300 text-lg font-bold mb-2 text-center">
              {item.id}
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-[150px] h-[150px]">
                <DiagPieChart 
                  datas={item.data}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatioChart; 