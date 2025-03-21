import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LineChartProps {
  labels: string[];
  data: number[];
  yAxisFormatter?: (value: number) => string;
  height?: number;
  showGrid?: boolean;
  yAxisMin?: number;
  yAxisMax?: number;
  showMinMax?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  labels, 
  data, 
  yAxisFormatter = (value) => `${value}`,
  yAxisMin,
  yAxisMax,
  showGrid = true,
  showMinMax = false
}) => {
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
        min: yAxisMin,
        max: yAxisMax,
        axisLine: {
          show: false
        },
        splitLine: {
          show: showGrid,
          lineStyle: {
            color: '#374151'
          }
        },
        axisLabel: {
          show: showGrid,
          color: '#9CA3AF',
          formatter: yAxisFormatter
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
          },
          markPoint: showMinMax ? {
            data: [
              { 
                type: 'max', 
                label: { 
                  show: true,
                  formatter: (params: any) => yAxisFormatter(Math.round(params.value)),
                  position: 'top',
                  distance: 10
                }
              },
              { 
                type: 'min', 
                label: { 
                  show: true,
                  formatter: (params: any) => yAxisFormatter(Math.round(params.value)),
                  position: 'top',
                  distance: 10
                }
              }
            ],
            symbolSize: 0,
            label: {
              color: '#fff',
              fontSize: 12,
              backgroundColor: 'transparent',
              padding: [2, 4],
              borderRadius: 2
            }
          } : undefined
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
  }, [labels, data, yAxisFormatter, yAxisMin, yAxisMax, showGrid, showMinMax]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default LineChart; 