import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LineChartProps {
  labels: string[];
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLine: {
          lineStyle: {
            color: '#4B5563'
          }
        },
        axisLabel: {
          color: '#9CA3AF'
        }
      },
      yAxis: {
        type: 'value',
        min: 160,
        max: 190,
        interval: 10,
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#374151'
          }
        },
        axisLabel: {
          color: '#9CA3AF'
        }
      },
      series: [
        {
          data: data,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#F59E0B',
            width: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(245, 158, 11, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(245, 158, 11, 0)'
              }
            ])
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff'
        }
      }
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [labels, data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default LineChart; 