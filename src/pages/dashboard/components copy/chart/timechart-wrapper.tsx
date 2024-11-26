import { useRef, useEffect, useState } from 'react';
import { init, getInstanceByDom } from 'echarts';
import type { ECharts } from 'echarts';
import { ChartData, TimeChartData } from '@/types/chart.type';
import { useTranslation } from 'react-i18next';

const convertToDeltaTime = (seconds: number) => {
    const day = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (seconds >= 86400) {
        return `${day}d ${hours}h`;
    }
    if (seconds >= 3600) {
        return `${hours}h ${minutes}m`;
    }
    if (seconds >= 60) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
};


const DEFAULT_OPTION = {
    tooltip: {
        trigger: 'item',
        formatter: function (param: any) {
            return `${param.marker} ${param.name} <strong>${convertToDeltaTime(param.value)}</strong>`
        }
    },
    series: [
        {
            type: 'pie',
            radius: ['45%', '90%'],
            avoidLabelOverlap: false,
            label: {
                formatter: function (param: any) {
                    return convertToDeltaTime(param.value)
                },
                show: true,
                position: 'inside',
                fontWeight: 500,
                lineHeight: 1,
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'sans-serif',
            },
            labelLine: {
                show: false,
            },
            data: [] as any[],
            color: ['#FFA84A', '#247F78', '#00C6AC', '#274350', '#99D679'],
        },
    ],
};

export default function TimeChartWrapper({ data }: { data: TimeChartData }) {
    const { t: trans } = useTranslation('homeChart');

    const chartRef = useRef<HTMLDivElement>(null);
    const [chart, setChart] = useState<ECharts | undefined>();

    useEffect(() => {
        if (chartRef.current !== null) {
            setChart(init(chartRef.current));
        }
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            setChart(getInstanceByDom(chartRef.current));
            DEFAULT_OPTION.series[0].data = data.pieData;
            chart?.setOption(DEFAULT_OPTION);
        }
    }, [chart]);

    useEffect(() => {
        if (!chart) return;
        DEFAULT_OPTION.series[0].data = data.pieData;
        chart?.setOption(DEFAULT_OPTION);
        chart?.resize();
    }, [data]);

    return (
        <div className='relative pt-6 pr-[22px] pb-5 pl-6 w-[284px] h-[260px] bg-hw-dark-2 rounded-lg shrink-0'>
            <div className='flex flex-col w-fit h-full'>
                <span className='text-hw-white-2 text-lg leading-none font-light mb-4'>
                    {trans(data.title)}
                </span>
                <div>
                    {
                        (data.total >= 86400) ?
                            <>
                                <span className='text-hw-white-1 text-[40px] leading-none font-bold mr-1'>
                                    {Math.floor(data.total / 86400)}
                                </span>
                                <span className='text-hw-white-3 text-sm font-light leading-[18px]'>
                                    {trans('day')}
                                </span>
                            </>
                            :
                            null
                    }
                    {
                        (data.total >= 3600) ?
                            <>
                                <span className='text-hw-white-1 text-[40px] leading-none font-bold mr-1'>
                                    {Math.floor((data.total % 86400) / 3600)}
                                </span>
                                <span className='text-hw-white-3 text-sm font-light leading-[18px]'>
                                {trans('hour')}
                                </span>
                            </>
                            :
                            null
                    }
                    {
                        (data.total >= 60 && data.total < 86400) ?
                            <>
                                <span className='text-hw-white-1 text-[40px] leading-none font-bold mr-1'>
                                    {Math.floor((data.total % 3600) / 60)}
                                </span>
                                <span className='text-hw-white-3 text-sm font-light leading-[18px]'>
                                {trans('min')}
                                </span>
                            </>
                            :
                            null
                    }
                    {
                        (data.total < 3600) ?
                            <>
                                <span className='text-hw-white-1 text-[40px] leading-none font-bold mx-1'>
                                    {data.total % 60}
                                </span>
                                <span className='text-hw-white-3 text-sm font-light leading-[18px]'>
                                {trans('sec')}
                                </span>
                            </>
                            :
                            null
                    }
                </div>
            </div>
            <div
                ref={chartRef}
                className='absolute right-[12px] bottom-5 h-[150px] w-[170px]'
            />
        </div>
    );
}
