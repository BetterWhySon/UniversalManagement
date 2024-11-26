import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';

const DiagBarMultyWindow = ({ datas, xName, yName }: any) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);
    const { t: trans, i18n  } = useTranslation('translation');
    const currentLanguage = i18n.language;

    useEffect(() => {
        if (chartRef.current && datas) {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
            
            const seriesConfig = [
                {
                    name: 'Placeholder',
                    type: 'bar',
                    stack: '1',
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    },
                    data: datas.dataValues100ZoneBase,
                    xAxisIndex: 0,
                    yAxisIndex: 0,                   
                },
                {
                    name: 'Life Cost',
                    type: 'bar',
                    stack: '1',
                    data: datas.dataValues100ZoneValue,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    markLine: {  // Add markLine for the second series
                        data: [
                            { yAxis: 100 }
                        ],
                        lineStyle: {
                            color: 'white',
                            type: 'solid'
                        }, 
                        symbol: 'none',
                        label: {
                            show: true,
                            position: 'end',
                            formatter: '{c} %'
                        }
                    },
                    tooltip: {
                        formatter: (params: any) => {
                            return `X: ${params.name}<br/>Y: ${params.value}`; // 툴팁에서도 동일한 값 표시
                        },
                    },
                },
                {
                    name: 'Placeholder',
                    type: 'bar',
                    stack: '2',
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    },
                    data: datas.dataValues0ZoneBase,
                    xAxisIndex: 1,
                    yAxisIndex: 1,        
                             
                },
                {
                    name: 'Life Cost',
                    type: 'bar',
                    stack: '2',
                    data: datas.dataValues0ZoneValue,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    markLine: {  // Add markLine for the second series
                        data: [
                            { yAxis: datas.dataValues0ZoneBase[0] }
                        ],
                        lineStyle: {
                            color: 'white',
                            type: 'solid'
                        }, 
                        symbol: 'none',
                        label: {
                            show: true,
                            position: 'end',
                            formatter: '0 %'
                        }
                    },
                    tooltip: {
                        formatter: (params: any) => {
                            const originalValue = params.value;
                            let displayedValue;

                            // 실제 값을 조작하여 표시
                            if (originalValue === 100) {
                                displayedValue = 0;
                            } else {
                                displayedValue = originalValue - 100;                                
                            }

                            return `X: ${params.name}<br/>Y: ${displayedValue.toFixed(1)}`;
                        },
                    },
                }
            ];

            const options = {
                title: [
                    {
                        text: trans("100%Area"),
                        left: '20%',
                        top: '0%'
                    },
                    {
                        text: trans("0%Area"),
                        right: '20%',
                        top: '0%'
                    }
                ],
                animation: false,
                backgroundColor: '#2B313B',
                tooltip: {
                    show: true
                    // trigger: 'axis',
                    // axisPointer: { type: 'shadow' }
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        type: 'category',
                        name: xName,
                        data: [datas.keyDatas[0], datas.keyDatas[1]].map(value => `Cell ${value}`),
                        axisLine: {
                            show: false
                        }
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        name: xName,
                        data: [datas.keyDatas[2], datas.keyDatas[3]].map(value => `Cell ${value}`),
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: 'value',
                        name: yName,
                        show: false,
                    },
                    {
                        gridIndex: 1,
                        type: 'value',
                        name: yName,
                        show: false,
                    }
                ],
                grid: [
                    { left: '7%', top: '7%', width: '38%', height: '80%' },
                    { right: '7%', top: '7%', width: '38%', height: '80%' },
                ],
                // graphic: [
                //     {
                //         type: 'text',
                //         left: '15%',  // 텍스트 위치 설정
                //         top: 'center',   // 텍스트 위치 설정
                //         style: {
                //             text: '텍스트 내용',  // 텍스트 내용
                //             fill: '#fff',         // 텍스트 색상
                //             font: '14px Microsoft YaHei'
                //         }
                //     }
                // ],
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
    }, [datas, trans]);

    return (
        <div ref={chartRef} className='flex-1 w-[100px] h-[300px] items-center justify-center text-black text-[64px] leading-[20px] p-5 rounded-2xl' />
    );
}

export default DiagBarMultyWindow;
