import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const DiagRingChart = (props: any) => {
    var chart: echarts.EChartsType | null | undefined = null;
    const chartRef = useRef<HTMLDivElement>(null);

    const gaugeData = [
        {
            value: props.value,
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '0%'],  // 중앙 정렬을 위해 수정
                fontSize: 24,
                color: '#fff',
                formatter: '{value}%'
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
                color: ['#5470c6'],
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
                        color: '#5470c6'
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
                    fontSize: 36,
                    color: '#fff',
                    borderColor: 'transparent',
                    borderRadius: 20,
                    borderWidth: 0,
                    formatter: '{value}%'
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
    }, [props.value]);

    return (
        <div ref={chartRef} className='w-full h-full'/>
    );
}

export default DiagRingChart;