import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const DiagPieChart = ({ 
    datas, 
    radius = ['40%', '70%'],
    itemGap = 4,
    labelColor = '#fff',
    labelSize = 16
}: { 
    datas: Array<{ name: string; value: number; itemStyle: { color: string } }>;
    radius?: [string, string];
    itemGap?: number;
    labelColor?: string;
    labelSize?: number;
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);

    useEffect(() => {
        if (chartRef.current && datas) {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }

            chartInstance.current = echarts.init(chartRef.current, 'dark');

            const options = {
                animation: false,
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: function(params: any) {
                        if (params.name === '충전중') {
                            return '집합건물 내 충전기에서 현재 충전이 진행 중인 차량';
                        }
                        if (params.name === '충전완료') {
                            return '집합건물 내 충전기에서 충전이 완료되었으나, 충전 커넥터가 체결되어 있는 상태인 차량';
                        }
                        if (params.name === '완속충전') {
                            return '집합건물 내 완속 충전기에 연결된 차량';
                        }
                        if (params.name === '급속충전') {
                            return '집합건물 내 급속 충전기에 연결된 차량';
                        }
                        return params.name;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: radius,
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 4,
                            borderColor: '#2A2F3A',
                            borderWidth: itemGap
                        },
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{c}',
                            fontSize: labelSize,
                            fontWeight: 'bold',
                            color: labelColor
                        },
                        labelLine: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: labelSize + 4,
                                fontWeight: 'bold'
                            }
                        },
                        data: datas
                    }
                ]
            };

            chartInstance.current.setOption(options);
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, [datas, radius, itemGap, labelColor, labelSize]);

    return (
        <div ref={chartRef} className='w-full h-full' />
    );
}

export default DiagPieChart;