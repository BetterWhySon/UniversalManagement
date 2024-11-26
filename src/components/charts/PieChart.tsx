import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

interface PieChartProps {
  data: Array<{ name: string; value: number; itemStyle: { color: string } }>;
  onSliceClick?: (name: string) => void;
}

const PieChart = ({ data, onSliceClick }: PieChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      const options = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          confine: true
        },      
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: data,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              fontSize: '16',
              fontWeight: 'bold',
              color: '#fff'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: '#2B313B'
            }
          },
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: data,
            label: {
              show: true,
              position: 'outside',
              formatter: '{d}%',
              fontSize: '14',
              color: '#fff'
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 5,
              lineStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              color: 'transparent',
              borderColor: 'transparent'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            zlevel: 1
          }
        ]
      };

      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(options);

      if (onSliceClick) {
        chartInstance.current.on('click', (params) => {
          if (params.seriesType === 'pie') {
            onSliceClick(params.name);
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
  }, [data, onSliceClick]);

  return <div ref={chartRef} className="w-full h-full" />;
};

export default PieChart;