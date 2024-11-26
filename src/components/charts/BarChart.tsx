import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  data: Array<{ id: string; soc?: number; time?: number }>;
  onBarClick?: (id: string) => void;
  isTimeData?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ data, onBarClick, isTimeData = false }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  // 최대 값에 따라 동적으로 오른쪽 마진 계산
  const rightMargin = useMemo(() => {
    if (isTimeData) {
      const maxTime = Math.max(...data.map(item => item.time || 0));
      const formattedTime = formatTime(maxTime);
      const digitCount = formattedTime.length;
      return `${10 + digitCount * 2}%`; // 기본 10% + 자릿수에 따라 증가
    }
    return '10%'; // 기본 마진
  }, [data, isTimeData]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      const options = {
        backgroundColor: '#2B313B',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 16
          },
          formatter: isTimeData ? 
            (params: any) => `${params[0].name}: ${formatTime(params[0].value)}` :
            undefined
        },
        grid: {
          top: '5%',
          left: '8%',
          right: rightMargin, // 동적으로 계산된 오른쪽 마진 사용
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff',
            fontSize: 12
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        },
        yAxis: {
          type: 'category',
          triggerEvent: true,
          data: data.map(item => item.id),
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            color: '#fff',
            fontSize: 16,
            align: 'right',
            padding: [0, 10, 0, 0]
          }
        },
        series: [
          {
            name: isTimeData ? '경과시간' : 'SOC',
            type: 'bar',
            barWidth: '60%',
            data: data.map((item, index) => ({
              value: isTimeData ? item.time : item.soc,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: getColor(index, 0) },
                  { offset: 1, color: getColor(index, 1) }
                ])
              }
            })),
            label: {
              show: true,
              position: 'right',
              formatter: isTimeData ? 
                (params: any) => formatTime(params.value) :
                '{c}',
              color: '#fff',
              fontSize: 14,
              distance: 5
            }
          }
        ]
      };

      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(options);

      // 클릭 이벤트 추가
      if (onBarClick) {
        chartInstance.current.on('click', (params) => {
          if (params.componentType === 'yAxis' || params.componentType === 'series') {
            const clickedId = String(params.componentType === 'yAxis' ? params.value : data[params.dataIndex].id);
            onBarClick(clickedId);
          }
        });
      }

      const resizeObserver = new ResizeObserver(() => {
        chartInstance.current?.resize();
      });
      resizeObserver.observe(chartRef.current);

      return () => {
        resizeObserver.disconnect();
        if (chartInstance.current) {
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    }
  }, [data, onBarClick, isTimeData, rightMargin]);

  const getColor = (index: number, offset: number) => {
    const colors = [
      ['#FF6B6B', '#FF8E8E'],
      ['#FF9F43', '#FFC180'],
      ['#FFCE56', '#FFE56E'],
      ['#54BAB9', '#7ED1D0'],
      ['#5E60CE', '#8B8EE5'],
      ['#FF6B6B', '#FF8E8E']
    ];
    const colorIndex = index % colors.length;
    return colors[colorIndex][offset];
  };

  return <div ref={chartRef} className="w-full h-full" />;
};

export default BarChart;
