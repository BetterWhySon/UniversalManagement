import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';

interface LineChartProps {
    keys: string[];
    datas: any;
    xName: string;
    yName: string;
}

const DiagLineChart = ({ keys, datas, xName, yName }: LineChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        if (chartRef.current && datas) {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }

            const options = {
                animation: false,
                backgroundColor: '#2B313B',
                tooltip: {},//datas.tooltip,
                legend: {},
                grid: {
                    left: '0%',
                    right: '7%',
                    bottom: '1%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    name: xName,
                    data: keys,
                },
                yAxis: {
                    type: 'value',
                    name: yName,
                },
                series: datas,
            };

            chartInstance.current = echarts.init(chartRef.current, 'dark');
            chartInstance.current.setOption(options);
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, [datas, keys]);

    return (
        <div ref={chartRef} className='flex-1 w-[100px] h-[300px] items-center justify-center text-black text-[64px] leading-[20px] p-5 rounded-2xl' />
    );
}

export default DiagLineChart;