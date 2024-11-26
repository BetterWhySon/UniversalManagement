import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';

const DiagRingChart = (props: any) => {
    var chart: echarts.EChartsType | null | undefined = null;
    const chartRef = useRef<HTMLDivElement>(null);
    const { t: trans } = useTranslation('translation');

    const gaugeData = [
        {
            value: props.value,
            name: trans(props.title),
            title: {
                offsetCenter: ['0%', '-15%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '15%']
            }
        }
    ];
    const options = {
        animation: false,
        backgroundColor: '#2B313B',
        series: [
            {
                type: 'gauge',
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
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#464646'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 10
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
                title: {
                    fontSize: 16
                },
                detail: {
                    width: 45,
                    height: 15,
                    fontSize: 14,
                    color: 'inherit',
                    borderColor: 'inherit',
                    borderRadius: 20,
                    borderWidth: 1,
                    formatter: (value: number) => !value ? '-' : `${value.toFixed(1)} %`
                }
            }
        ]
    };

    useEffect(() => {
        if (chartRef.current) {
            if (chart) {
                chart.dispose();
            }
            chart = echarts.init(chartRef.current, 'dark');
            chart.setOption(options);
        }
        // Cleanup on unmount
        return () => {
            if (chart) {
                chart.dispose();
                chart = null;
            }
        };
    }, [props.value, props.title]);

    return (
        <div ref={chartRef} className='flex-1 w-[100px] h-[300px] items-center justify-center text-black text-[64px] leading-[20px]'/>
    );
}

export default DiagRingChart;
