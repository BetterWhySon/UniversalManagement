import { useRef, useEffect, useState } from 'react';
import { init, getInstanceByDom } from 'echarts';
import type { ECharts } from 'echarts';
import { ChartData } from '@/types/chart.type';
import { useTranslation } from 'react-i18next';
import { convertEnergyUnit } from '@/helpers/energyUnitConverter.helper';

const DEFAULT_OPTION = {
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      return `<div class='whitespace-normal'>${params.marker} ${params.name} <strong>${convertEnergyUnit(params.value)}</strong></div>`;
    },
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['45%', '90%'],
      avoidLabelOverlap: false,
      label: {
        formatter: function (params: any) {
          return `${convertEnergyUnit(params.value)}`;
        },
        show: true,
        position: 'inside',
        fontWeight: 500,
        lineHeight: 1,
        color: '#FFFFFF',
        fontSize: 14,
        textStyle: {
          fontFamily: 'Nunito Sans',
        },
      },
      labelLine: {
        show: false,
      },
      data: [] as any[],
      color: ['#FFA84A', '#247F78', '#00C6AC', '#274350', '#99D679'],
    },
  ],
};

export default function ChartWrapper({ data }: { data: ChartData }) {
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
      DEFAULT_OPTION.series[0].name = trans(data.title);
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
    <div className='relative select-none pt-6 pr-[22px] pb-5 pl-6 w-[284px] h-[260px] bg-hw-dark-2 rounded-lg shrink-0'>
      <div className='flex flex-col w-fit h-full'>
        <span className='text-hw-white-2 text-[16px] leading-5 sm:text-lg sm:leading-[18px] transition-all font-light mb-4'>
          {trans(data.title)}
        </span>
        <span className='text-hw-white-1 text-[32px] leading-normal sm:text-[40px] sm:leading-none  font-bold mb-1'>
          {data.total}
        </span>
        <span className='text-hw-white-3 text-sm font-light leading-[18px]'>{data.unit}</span>
      </div>
      <div ref={chartRef} className='absolute right-[12px] bottom-5 h-[150px] w-[170px]' />
    </div>
  );
}
