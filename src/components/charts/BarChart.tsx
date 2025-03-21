import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  data: Array<{ id: string; soc?: number; time?: number; style?: { color: string } }> | Array<{
    name: string;
    data: Array<{ id: string; soc: number }>;
    color: string;
    hideValue?: boolean;
  }>;
  onBarClick?: (id: string) => void;
  isTimeData?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  backgroundColor?: string;
  isVertical?: boolean;
  showGrid?: boolean;
  rMargin?: number;
  tMargin?: number;
  showTooltip?: boolean;
  chartType?: 'bar' | 'line' | 'both' | 'multiLine';
  grid?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  yAxis?: {
    max?: number;
  };
  showValue?: boolean;
  labelFontSize?: number;
  barColor?: string;
  markLine?: Array<{
    name: string;
    value: number;
    lineStyle?: {
      type?: 'solid' | 'dashed';
      color?: string;
    };
    label?: {
      align?: string;
      verticalAlign?: string;
      position?: string;
    };
  }>;
  tooltipFormatter?: (params: any) => string;
}

const isMultiLineData = (data: any[]): data is Array<{name: string; data: Array<{ id: string; soc: number }>; color: string}> => {
  return 'data' in data[0];
};

const isSingleData = (data: any[]): data is Array<{ id: string; soc?: number; time?: number }> => {
  return 'id' in data[0];
};

const BarChart: React.FC<BarChartProps> = ({ data, onBarClick, isTimeData = false, hideXAxis = false, hideYAxis = false, backgroundColor = '#2B313B', isVertical = false, showGrid = true, rMargin, tMargin = 3, showTooltip = true, chartType = 'bar', showValue = false, labelFontSize = 12, barColor, markLine }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  // 최대 값에 따라 동적으로 오른쪽 마진 계산
  const rightMargin = useMemo(() => {
    if (rMargin !== undefined) {
      return `${rMargin}%`;
    }
    if (isTimeData && isSingleData(data)) {
      const maxTime = Math.max(...data.map(item => item.time || 0));
      const formattedTime = formatTime(maxTime);
      const digitCount = formattedTime.length;
      return `${5 + digitCount}%`;
    }
    return '10%';
  }, [data, isTimeData, rMargin]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      const options = {
        backgroundColor: backgroundColor,
        tooltip: {
          show: showTooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: `${tMargin}%`,
          left: '5%',
          right: rightMargin,
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: isVertical ? 'category' : 'value',
          data: isVertical ? 
            (isMultiLineData(data) ? data[0].data.map(d => d.id) : data.map(d => d.id)) 
            : undefined,
          axisLabel: {
            show: !hideXAxis,
            color: '#FFFFFF',
            fontSize: 12,
            interval: 0,
            rotate: 0
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: isVertical ? 'value' : 'category',
          data: isVertical ? undefined : 
            (isMultiLineData(data) ? data[0].data.map(d => d.id) : data.map(d => d.id)),
          axisLabel: {
            show: !hideYAxis,
            color: '#FFFFFF',
            fontSize: 12
          },
          splitLine: {
            show: false
          }
        },
        series: chartType === 'multiLine' ? 
          (isMultiLineData(data) ? 
            data.map(item => ({
              name: item.name,
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: item.data.map(d => d.soc),
              lineStyle: {
                color: item.color,
                width: 2
              },
              itemStyle: {
                color: item.color
              },
              label: {
                show: showValue && !item.hideValue,
                position: item.name === '평균값' || item.name === '최소값' ? 'bottom' : 'top',
                formatter: (params: any) => params.value,
                color: '#FFFFFF',
                fontSize: labelFontSize
              }
            })) :
            [{
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: data.map(d => d.soc),
              lineStyle: {
                color: '#FFFFFF',
                width: 2
              },
              itemStyle: {
                color: '#FFFFFF'
              },
              label: {
                show: showValue,
                position: 'top',
                formatter: (params: any) => params.value,
                color: '#FFFFFF',
                fontSize: labelFontSize
              }
            }]
          ) :
          chartType === 'both' && isSingleData(data) ? [
            {
              name: 'bar',
              type: 'bar',
              barWidth: '60%',
              data: data.map((item, index) => ({
                value: isTimeData ? item.time : item.soc,
                itemStyle: {
                  color: barColor || 
                    data[index].style?.color || 
                    new echarts.graphic.LinearGradient(isVertical ? 0 : 1, 0, isVertical ? 1 : 0, 0, [
                      { offset: 0, color: getColor(index, 0) },
                      { offset: 1, color: getColor(index, 1) }
                    ])
                }
              })),
              label: {
                show: true,
                position: isVertical ? 'top' : 'right',
                formatter: isTimeData ? (params: any) => formatTime(params.value) : '{c}',
                color: '#FFFFFF',
                fontSize: labelFontSize,
                distance: 2
              },
              markLine: markLine ? {
                silent: true,
                symbol: 'none',
                label: {
                  show: true,
                  position: 'end',
                  formatter: '{b}',
                  color: '#FFFFFF',
                  align: 'center',
                  verticalAlign: 'middle'
                },
                data: markLine.map(line => ({
                  name: line.name,
                  yAxis: line.value,
                  lineStyle: {
                    type: line.lineStyle?.type || 'dashed',
                    color: line.lineStyle?.color || '#666'
                  }
                }))
              } : undefined
            },
            {
              name: 'line',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              data: data.map(item => ({
                value: isTimeData ? item.time : item.soc
              })),
              lineStyle: {
                color: barColor || '#FFFFFF',
                width: 2
              },
              itemStyle: {
                color: barColor || '#FFFFFF'
              },
              z: 2
            }
          ] : 
          isSingleData(data) ? [
            {
              name: isTimeData ? '경과시간' : 'SOC',
              type: chartType,
              barWidth: '60%',
              smooth: chartType === 'line',
              symbol: 'circle',
              symbolSize: 8,
              data: data.map((item, index) => ({
                value: isTimeData ? item.time : item.soc,
                itemStyle: {
                  color: barColor || 
                    data[index].style?.color || 
                    new echarts.graphic.LinearGradient(isVertical ? 0 : 1, 0, isVertical ? 1 : 0, 0, [
                      { offset: 0, color: getColor(index, 0) },
                      { offset: 1, color: getColor(index, 1) }
                    ])
                }
              })),
              label: {
                show: true,
                position: isVertical ? 'top' : 'right',
                formatter: isTimeData ? (params: any) => formatTime(params.value) : '{c}',
                color: '#FFFFFF',
                fontSize: labelFontSize,
                distance: 5
              },
              markLine: markLine ? {
                silent: true,
                symbol: 'none',
                label: {
                  show: true,
                  position: 'end',
                  formatter: '{b}',
                  color: '#FFFFFF',
                  align: 'center',
                  verticalAlign: 'middle'
                },
                data: markLine.map(line => ({
                  name: line.name,
                  yAxis: line.value,
                  lineStyle: {
                    type: line.lineStyle?.type || 'dashed',
                    color: line.lineStyle?.color || '#666'
                  }
                }))
              } : undefined
            }
          ] : []
      };

      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(options);

      // 클릭 이벤트 추가
      if (onBarClick) {
        chartInstance.current.on('click', (params: any) => {
          if (params.componentType === 'yAxis' || params.componentType === 'series') {
            if (params.dataIndex !== undefined && params.seriesIndex !== undefined) {  // 두 값이 모두 있는지 확인
              const clickedId = isSingleData(data) ? 
                data[params.dataIndex].id : 
                data[params.seriesIndex].data[params.dataIndex].id;
              onBarClick(clickedId);
            }
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
  }, [data, onBarClick, isTimeData, rightMargin, hideXAxis, hideYAxis, backgroundColor, isVertical, showGrid, showTooltip, chartType, showValue, labelFontSize, barColor, markLine]);

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

  const renderItem = (params: any) => {
    if (chartType === 'multiLine') {
      const item = params.data;
      const showValue = item.soc !== undefined && item.soc !== null;
      const position = item.labelPosition || 'top';
      
      return {
        type: 'text',
        position: [params.coordSys.x, params.coordSys.y],
        style: {
          text: showValue ? item.soc.toFixed(1) : '',
          textAlign: 'center',
          textVerticalAlign: position === 'bottom' ? 'bottom' : 'top',
          fill: '#fff',
          fontSize: labelFontSize || 12,
          fontFamily: 'Pretendard'
        }
      };
    }
    return null;
  };

  return <div ref={chartRef} className="w-full h-full" />;
};

export default BarChart;
