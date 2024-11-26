import { Close } from '@/components/icons';
import { ChartData } from '@/types/chart.type';
import { init, getInstanceByDom } from 'echarts';
import type { ECharts } from 'echarts';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCaptionResponsive from '../caption/caption-responsive';

const DEFAULT_OPTION = {
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      return `<div class='w-full'>
                  <strong>${params.seriesName}</strong>
                  <div class='flex justify-between w-full mt-1 gap-2'>
                    <div class='whitespace-normal'>${params.marker} ${params.name}</div> 
                    <strong>${params.value}</strong>
                  </div>
                </div>`;
    },
  },
  series: [
    {
      name: '누적 방전용량',
      type: 'pie',
      radius: ['45%', '90%'],
      avoidLabelOverlap: false,
      label: {
        formatter: '{d}%',
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
      color: ['#FFA84A', '#247F78', '#00C6AC', '#FB67CA', '#9B88ED', '#04BFDA'],
    },
  ],
};

type ChartModalProps = {
  data: ChartData;
  closeModal: () => void;
};

export default function ChartModal({ data, closeModal }: ChartModalProps) {
  const { t: trans } = useTranslation('homeChart');
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: ECharts | undefined;
  useEffect(() => {
    if (chartRef.current !== null) {
      chart = init(chartRef.current);
    }
  }, []);
  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      DEFAULT_OPTION.series[0].data = data.pieData;
      DEFAULT_OPTION.series[0].name = trans(data.title);
      chart?.setOption(DEFAULT_OPTION);
    }
  }, [chart]);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex sm:hidden items-center justify-center transition-all z-50'>
      <div onClick={closeModal} className='relative z-50 w-full h-full bg-black bg-opacity-60'></div>
      <div className='absolute z-50 px-[18px] w-fit h-fit'>
        <div className='pt-3 pl-5 pr-[13px] pb-5 min-w-[339px] h-[440px] bg-hw-dark-2 rounded-lg'>
          <div className='w-full flex items-center justify-between'>
            <span className='text-[16px] font-normal leading-4 text-hw-white-2'>{trans(data.title)}</span>
            <div onClick={closeModal} className='flex items-center justify-center w-10 h-10'>
              <Close />
            </div>
          </div>
          <div className='w-full flex items-end justify-start mt-1 mb-5 gap-2'>
            <span className='text-[28px] font-bold leading-[34px] text-hw-white-1'> {data.total}</span>
            <span className='text-[16px] font-normal leading-[26px] text-hw-white-3'> {data.unit}</span>
          </div>
          <div ref={chartRef} className='h-[232px] w-[232px] mx-auto' />
          <DashboardCaptionResponsive />
        </div>
      </div>
    </div>
  );
}
