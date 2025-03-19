import React from 'react';
import DiagPieChart from '@/components/charts/DiagPieGraph';

interface RatioChartProps {
  data: any[];
  pageType: 'item' | 'device';
  selectedCondition: '사업장' | '그룹' | '기기';
}

const RatioChart: React.FC<RatioChartProps> = ({ pageType, selectedCondition }) => {
  const legendData = [
    { name: '사용시간', color: '#8AA8DA' },  // 파랑
    { name: '충전시간', color: '#A9D18E' },  // 초록
    { name: '미사용', color: '#A1A1A1' }     // 회색
  ];

  // 예시 데이터
  const mockData = Array(20).fill(null).map((_, index) => ({
    id: `VABJ${String(index + 1).padStart(3, '0')}`,
    company: `사업장${index + 1}`,
    group: `그룹${index + 1}`,
    data: [
      { name: '사용시간', value: 55, itemStyle: { color: '#8AA8DA' } },  // 파랑
      { name: '충전시간', value: 25, itemStyle: { color: '#A9D18E' } },  // 초록
      { name: '미사용', value: 20, itemStyle: { color: '#A1A1A1' } }     // 회색
    ]
  }));

  const getChartTitle = (item: any) => {
    switch (selectedCondition) {
      case '사업장':
        return item.company;
      case '그룹':
        return item.group;
      case '기기':
        return item.id;
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h2 className="text-white text-[19px]">항목별 관리점수</h2>
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

      <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
        {mockData.map((item) => (
          <div key={item.id} className="bg-hw-dark-2 p-3 rounded-lg">
            <div className="text-yellow-300 text-lg font-bold mb-0.5 text-center">
              {getChartTitle(item)}
            </div>
            
            <div className="h-[180px] flex items-center justify-center">
              <div className="w-[180px] h-[180px]">
                <DiagPieChart 
                  datas={item.data}
                  radius={['35%', '85%']}
                  labelSize={19.2}
                  labelColor="#404040"
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
