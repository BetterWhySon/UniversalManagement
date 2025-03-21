import React from 'react';
import * as echarts from 'echarts';

interface DataPoint {
  id: string;
  start: number;
  end: number;
}

interface SeriesData {
  name: string;
  data: DataPoint[];
  color: string;
}

interface BatteryBalanceChartProps {
  data: SeriesData[];
  min: number;
  max: number;
  xAxisPosition?: 'top' | 'bottom';
}

const BatteryBalanceChart: React.FC<BatteryBalanceChartProps> = ({
  data,
  min,
  max,
  xAxisPosition = 'bottom'
}) => {
  const getChartOptions = () => {
    return {
      backgroundColor: 'transparent',
      grid: {
        top: 10,
        right: 10,
        bottom: 5,
        left: 5,
        containLabel: false
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(28, 28, 30, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: (params: any) => {
          const param = params[0];
          const dataItem = data[0].data[param.dataIndex];
          return `${param.name}<br/>시작: ${dataItem.start}%<br/>끝: ${dataItem.end}%`;
        }
      },
      xAxis: {
        type: 'category',
        data: data[0].data.map(d => d.id),
        position: xAxisPosition,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#4B5563',
            width: 1
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        min: min,
        max: max,
        interval: 20,
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        name: data[0].name,
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(0);
          const start = api.value(1);
          const end = api.value(2);
          
          const coordStart = api.coord([categoryIndex, start]);
          const coordEnd = api.coord([categoryIndex, end]);
          
          const rectWidth = api.size([1, 0])[0] * 0.4;  // 40% of category width
          const rectX = coordStart[0] - rectWidth / 2;
          
          return {
            type: 'rect',
            shape: {
              x: rectX,
              y: Math.min(coordStart[1], coordEnd[1]),
              width: rectWidth,
              height: Math.abs(coordEnd[1] - coordStart[1])
            },
            style: {
              fill: data[0].color
            }
          };
        },
        encode: {
          x: 0,
          y: [1, 2]
        },
        data: data[0].data.map((d, index) => [index, d.start, d.end])
      }]
    };
  };

  return (
    <div
      ref={(el) => {
        if (el && !el.getAttribute('data-initialized')) {
          const chart = echarts.init(el);
          chart.setOption(getChartOptions());
          el.setAttribute('data-initialized', 'true');

          const resizeObserver = new ResizeObserver(() => {
            chart.resize();
          });
          resizeObserver.observe(el);
        }
      }}
      className="w-full h-full"
    />
  );
};

export default BatteryBalanceChart; 