import React from 'react';
import BarChart from '@/components/charts/BarChart';

interface TimeSeriesChartProps {
  data: any[];
  pageType: 'item' | 'device';
  selectedCondition: '사업장' | '그룹' | '기기';
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ pageType, selectedCondition }) => {
  // 시계열 데이터 예시
  const timeSeriesData = [{
    name: '시계열 데이터',
    data: [
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
    ],
    color: '#FFE699',
    labelFontSize: 14  // 기본 레이블 크기보다 20% 크게 설정
  }];

  const getChartTitle = (index: number) => {
    switch (selectedCondition) {
      case '사업장':
        return `사업장${index + 1}`;
      case '그룹':
        return `그룹${index + 1}`;
      case '기기':
        return `VABJ${String(index + 1).padStart(3, '0')}`;
      default:
        return '';
    }
  };

  return (
    <div>
      <h2 className="text-white text-[19px] mb-4 mt-2">종합관리점수</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(20).fill(null).map((_, index) => (
          <div key={index} className="bg-hw-dark-2 p-3 rounded-lg">
            <div className="text-yellow-300 text-lg font-bold mb-0.5 text-center">
              {getChartTitle(index)}
            </div>
            
            <div className="h-[180px] flex items-center justify-center">
              <BarChart 
                data={timeSeriesData}
                grid={{ top: 20, right: 15, bottom: 10, left: 15 }}
                backgroundColor="transparent"
                showGrid={false}
                hideYAxis={true}
                isVertical={true}
                chartType="multiLine"
                showTooltip={false}
                tMargin={18}
                rMargin={6}
                showValue={true}
                labelFontSize={14.4}  // 기본값 12의 20% 증가
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSeriesChart;

