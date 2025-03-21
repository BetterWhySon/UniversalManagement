import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const DiagRingChart = ({ value, color = '#5470c6', label, unit = '%', subLabel = '등록대수' }: { 
  value: number; 
  color?: string;
  label: string;
  unit?: string;
  subLabel?: string;
}) => {
    var chart: echarts.EChartsType | null | undefined = null;
    const chartRef = useRef<HTMLDivElement>(null);

    const gaugeData = [
        {
            value: value,
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '-10%'],
                fontSize: 32,
                color: '#fff',
                formatter: () => {
                    return `{mainText|${label}${unit}}\n{subText|${subLabel}}`;
                },
                rich: {
                    mainText: {
                        fontSize: 36,
                        color: '#fff',
                        padding: [0, 0, 2, 0]
                    },
                    subText: {
                        fontSize: 14,
                        color: '#fff',
                        padding: [2, 0, 0, 0]
                    }
                }
            }
        }
    ];
    const options = {
        series: [
            {
                type: 'gauge',
                radius: '100%',
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 0,
                        color: color
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 15,
                        color: [
                            [1, 'rgba(255, 255, 255, 0.1)']
                        ]
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                data: gaugeData,
                detail: {
                    width: 50,
                    height: 14,
                    fontSize: 48,
                    color: '#fff',
                    borderColor: 'transparent',
                    borderRadius: 20,
                    borderWidth: 0,
                    formatter: () => `${label}${unit}`
                }
            }
        ]
    };

    useEffect(() => {
        if (chartRef.current) {
            if (chart) {
                chart.dispose();
            }
            chart = echarts.init(chartRef.current);
            chart.setOption(options);

            const resizeObserver = new ResizeObserver(() => {
                chart?.resize();
            });
            resizeObserver.observe(chartRef.current);

            return () => {
                resizeObserver.disconnect();
                if (chart) {
                    chart.dispose();
                    chart = null;
                }
            };
        }
    }, [value, color, label, unit, options]);

    return (
        <div ref={chartRef} className='w-full h-full'/>
    );
}

export default DiagRingChart;