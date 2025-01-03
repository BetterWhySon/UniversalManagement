import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';

const DiagBarChart = ({ datas, xName, yName  }: any) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        if (chartRef.current && datas) {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }

            const seriesConfig = [
                {
                    type: 'bar',
                    barWidth: '60%',
                    data: datas.dataValues,
                },
                ...(datas.type === 1 ? [{
                    type: 'line',
                    data: datas.dataValues,
                    smooth: true
                }] : [])
            ];

            const options = {
                animation: false,
                backgroundColor: '#2B313B',
                tooltip: datas.tooltip,
                xAxis: {
                    type: 'category',
                    name: xName,
                    data: datas.keyDatas,
                },
                yAxis: {
                    type: 'value',
                    name: yName,
                },
                grid: {
                    left: '0%',
                    right: '6%',
                    bottom: '0%',
                    top: '12%',
                    containLabel: true
                },
                series: seriesConfig
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
    }, [datas]);

    return (
        <div ref={chartRef} className='flex-1 w-[100px] h-[300px] items-center justify-center text-black text-[64px] leading-[20px] p-5 rounded-2xl' />
    );
}

export default DiagBarChart;