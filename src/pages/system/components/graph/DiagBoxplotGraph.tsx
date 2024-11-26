import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';

const DiagBoxplotChart = ({ boxplotData, barData, keyDays, xName, yName }: { boxplotData: any[], barData: any[], keyDays: any[], xName: string, yName: string }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        if (chartRef.current && boxplotData && barData) {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }

            const options = {
                backgroundColor: '#2B313B',
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    right: '5%',
                    bottom: '0%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    name: xName,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    //   data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
                    data: keyDays
                },
                yAxis: [
                    {
                        type: 'value',
                        name: yName,
                        position: 'left',
                        // splitArea: {
                        //   show: true
                        // }
                    },
                    {
                        type: 'value',
                        name: yName,
                        position: 'right',
                        // splitArea: {
                        //   show: true
                        // }
                    }
                ],
                series: [
                    {
                        barWidth: '40%',
                        name: 'bar',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: barData,
                        // data: [700, 800, 850, 900, 950],
                        itemStyle: {
                            color: '#ff7f50'
                        }
                    },
                    {
                        name: 'boxplot',
                        type: 'boxplot',
                        data: boxplotData,
                        // data: [
                        //   // [min, Q1, median, Q3, max]
                        //   [850, 900, 950, 980, 1070],
                        //   [800, 830, 860, 880, 960],
                        //   [720, 770, 810, 850, 950],
                        //   [740, 780, 810, 860, 920],
                        //   [200, 300, 880, 880, 940]
                        // ],
                        yAxisIndex: 1,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#333',
                            color: '#2072e5'
                        },
                        boxWidth: [10, 15],
                        whiskerStyle: {
                            width: 0,
                            opacity: 0
                        }
                    }
                ]
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
    }, [boxplotData, barData]);

    return (
        <div ref={chartRef} className='flex-1 w-[100px] h-[300px] items-center justify-center text-black text-[64px] leading-[20px] p-5 rounded-2xl' />
    );
}

export default DiagBoxplotChart;