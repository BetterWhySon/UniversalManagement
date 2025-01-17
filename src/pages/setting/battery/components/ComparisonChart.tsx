import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import BarChart from '@/components/charts/BarChart';
import { debounce } from 'lodash';

interface ComparisonChartProps {
  data: any[];
  pageType: 'item' | 'device';
}

interface TooltipData {
  company: string;
  group: string;
  deviceId: string;
  user: string;
  birthDate: string;
  gender: string;
  contact: string;
}

const Tooltip = React.memo(({ data, x, y }: { data: TooltipData; x: number; y: number }) => {
  return createPortal(
    <div 
      className="fixed bg-hw-dark-1 text-white p-4 rounded shadow-lg z-50 pointer-events-none"
      style={{ 
        left: x + 20,
        top: y,
        transform: 'translateY(-50%)'
      }}
    >
      <div>• 사업장 : {data.company}</div>
      <div>• 그룹명 : {data.group}</div>
      <div>• 기기명 : {data.deviceId}</div>
      <div>• 사용자 : {data.user}</div>
      <div>• 생년월일 : {data.birthDate}</div>
      <div>• 성별 : {data.gender}</div>
      <div>• 연락처 : {data.contact}</div>
    </div>,
    document.body
  );
});

const ChartItem = React.memo(({ item }: { item: ComparisonChartProps['data'][0] }) => {
  return (
    <div className="h-[180px] pointer-events-none">
      <BarChart 
        data={[
          { id: '직전', soc: item.before },
          { id: '이번', soc: item.after }
        ]}
        grid={{ top: 40, right: 20, bottom: 20, left: 60 }}
        yAxis={{ max: 100 }}
        backgroundColor="transparent"
        isVertical={true}
        hideYAxis={true}
        showGrid={false}
        rMargin={12}
        showTooltip={false}
        tMargin={15}
        markLine={[
          {
            name: '평균\n' + item.average,
            value: item.average,
            lineStyle: {
              type: 'dashed',
              color: '#bbb'
            },
            label: {
              align: 'center',
              verticalAlign: 'middle',
              position: 'end'
            }
          }
        ]}
      />
    </div>
  );
});

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, pageType }) => {
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; data: TooltipData | null }>({ 
    show: false, x: 0, y: 0, data: null 
  });

  const updateTooltipPosition = useCallback(
    debounce((x: number, y: number) => {
      setTooltip(prev => ({ ...prev, x, y }));
    }, 16),
    []
  );

  const renderComparisonText = (beforeDiff: number, afterDiff: number) => {
    const isIncreaseFirst = beforeDiff >= 0;
    const isIncreaseSecond = afterDiff >= 0;
    
    const arrowFirst = isIncreaseFirst ? '↑' : '↓';
    const arrowSecond = isIncreaseSecond ? '↑' : '↓';
    const colorFirst = isIncreaseFirst ? 'text-blue-500' : 'text-red-500';
    const colorSecond = isIncreaseSecond ? 'text-blue-500' : 'text-red-500';
    
    return (
      <span>
        직전대비
        <span className={colorFirst}>{arrowFirst}{Math.abs(beforeDiff)}</span>
        / 평균대비
        <span className={colorSecond}>{arrowSecond}{Math.abs(afterDiff)}</span>
      </span>
    );
  };

  // device 타입일 때 사용할 차트 타이틀 배열
  const deviceChartTitles = [
    '사용관리 지수',
    '스트레스 지수',
    '운용시간',
    '사용 시간',
    '충전 시간',
    '미사용 시간',
    '충전시간당 사용시간',
    '사용 횟수',
    '사용량',
    '고속 사용량',
    '고속 사용 횟수',
    '사용시 평균 파워',
    '전시 평균 파워',
    '완속 충전 횟수'
  ];

  return (
    <div className="will-change-transform">
      <h2 className="text-white text-xl mb-4">{pageType === 'device' ? '사용관리' : '사용관리 지수'}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
        {pageType === 'device' ? (
          // device 타입일 때의 레이아웃
          deviceChartTitles.map((title, index) => (
            <div key={index} className="bg-hw-dark-2 p-4 rounded-lg relative will-change-transform">
              <div className="text-white text-lg mb-2 text-center">
                {title}
              </div>
              <div className="text-white mb-2 text-center">
                {renderComparisonText(data[index].beforeDiff, data[index].afterDiff)}
              </div>
              <ChartItem item={data[index]} />
            </div>
          ))
        ) : (
          // item 타입일 때의 레이아웃
          data.map((item) => (
            <div key={item.id} 
              className="bg-hw-dark-2 p-4 rounded-lg relative will-change-transform"
              onMouseEnter={(e) => {
                setTooltip({
                  show: true,
                  x: e.clientX,
                  y: e.clientY,
                  data: item.info
                });
              }}
              onMouseMove={(e) => {
                updateTooltipPosition(e.clientX, e.clientY);
              }}
              onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, data: null })}
            >
              <div className="text-yellow-300 text-lg font-bold mb-2 text-center">
                {item.id}
              </div>
              
              <div className="text-white mb-2 text-center">
                {renderComparisonText(item.beforeDiff, item.afterDiff)}
              </div>
              
              <ChartItem item={item} />
            </div>
          ))
        )}
      </div>

      {tooltip.show && tooltip.data && (
        <Tooltip data={tooltip.data} x={tooltip.x} y={tooltip.y} />
      )}
    </div>
  );
};

export default ComparisonChart;
