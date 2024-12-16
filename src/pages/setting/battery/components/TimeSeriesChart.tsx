import React from 'react';
import BarChart from '@/components/charts/BarChart';

interface TimeSeriesChartProps {
  data: Array<{
    id: string;
    values: number[];
    dates: string[];
  }>;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = () => {
  // 시계열 데이터 예시
  const timeSeriesData = [
    { id: 't1', soc: 95 },
    { id: 't2', soc: 80 },
    { id: 't3', soc: 84 },
    { id: 't4', soc: 95 },
    { id: 't5', soc: 94 },
    { id: 't6', soc: 78 },
    { id: 't7', soc: 78 },
    { id: 't8', soc: 81 },
    { id: 't9', soc: 70 },
    { id: 't10', soc: 78 },
    { id: 't11', soc: 90 }
  ];

  return (
    <div>
      <h2 className="text-white text-xl mb-4">사용관리 지수</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(20).fill(null).map((_, index) => (
          <div key={index} className="bg-hw-dark-2 p-4 rounded-lg">
            <div className="text-yellow-300 text-lg font-bold mb-2 text-center">
              VABJ{String(index + 1).padStart(3, '0')}
            </div>
            
            <div className="h-[180px]">
              <BarChart 
                data={timeSeriesData}
                grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
                backgroundColor="transparent"
                showGrid={false}
                hideYAxis={true}
                isVertical={true}
                chartType="multiLine"
                showTooltip={false}
                tMargin={15}
                showValue={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSeriesChart; 