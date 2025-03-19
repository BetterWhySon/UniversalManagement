import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import BarChart from '@/components/charts/BarChart';
import { debounce } from 'lodash';

interface ComparisonChartProps {
  data: any[];
  pageType: 'item' | 'device';
  selectedCondition: '사업장' | '그룹' | '기기';
}

interface TooltipData {
  company: string;
  group: string;
  deviceId: string;
  application: string;
  packId: string;
  packModel: string;
  user: string;
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
      <div>• 그룹 : {data.group}</div>
      <div>• 기기명 : {data.deviceId}</div>
      <div>• 어플리케이션 : {data.application}</div>
      <div>• 팩ID : {data.packId}</div>
      <div>• 팩모델 : {data.packModel}</div>
      <div>• 사용자 : {data.user}</div>
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
          { id: '직전', soc: item.before, style: { color: '#A9D18E' } },
          { id: '이번', soc: item.after, style: { color: '#8AA8DA' } }
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

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, pageType, selectedCondition }) => {
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

  const getChartTitle = (item: any) => {
    switch (selectedCondition) {
      case '사업장':
        return item.company || '사업장명';
      case '그룹':
        return item.group || '그룹명';
      case '기기':
        return item.deviceId || 'VABJ001';
      default:
        return '';
    }
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
      <h2 className="text-white text-[19px] mb-4 mt-2">{pageType === 'device' ? '사용관리' : '사용관리 지수'}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
        {pageType === 'device' ? (
          // device 타입일 때의 레이아웃
          deviceChartTitles.map((title, index) => (
            <div key={index} className="bg-hw-dark-2 p-3 rounded-lg relative will-change-transform">
              <div className="text-yellow-300 text-lg font-bold mb-0.5 text-center">
                {title}
              </div>
              <div className="text-white mb-0.5 text-center">
                {renderComparisonText(data[index].beforeDiff, data[index].afterDiff)}
              </div>
              <ChartItem item={data[index]} />
            </div>
          ))
        ) : (
          // item 타입일 때의 레이아웃
          data.map((item) => (
            <div key={item.id} 
              className="bg-hw-dark-2 p-3 rounded-lg relative will-change-transform"
            >
              <div 
                className="text-yellow-300 text-lg font-bold mb-0.5 text-center cursor-help"
                onMouseEnter={(e) => {
                  if (selectedCondition === '기기') {
                    setTooltip({
                      show: true,
                      x: e.clientX,
                      y: e.clientY,
                      data: item.info
                    });
                  }
                }}
                onMouseMove={(e) => {
                  if (selectedCondition === '기기') {
                    updateTooltipPosition(e.clientX, e.clientY);
                  }
                }}
                onMouseLeave={() => {
                  if (selectedCondition === '기기') {
                    setTooltip({ show: false, x: 0, y: 0, data: null });
                  }
                }}
              >
                {getChartTitle(item)}
              </div>
              
              <div className="text-white mb-0.5 text-center">
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
