// React 관련 임포트
import { useEffect, useState } from 'react';

// Swiper 관련 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css'; // Swiper 기본 CSS
import 'swiper/css/free-mode'; // Swiper Free Mode CSS
import 'swiper/css/pagination'; // Swiper Pagination CSS

// 컴포넌트 및 타입 관련 임포트
import ChartWrapper from './chart-wrapper';
import TimeChartWrapper from './timechart-wrapper';
import { ChartData, TimeChartData } from '@/types/chart.type';

// 훅 및 유틸리티 관련 임포트
import { cn } from '@/helpers/class-name.helper';
import { useTranslation } from 'react-i18next';
import useWebSocketStore from '@/api/socketStore';
import { convertEnergyValue, getEnergyUnit } from '@/helpers/energyUnitConverter.helper';

export default function ChartList() {
    const { t: trans, i18n } = useTranslation('translation');
    const currentLanguage = i18n.language;

    const [overlay, setOverlay] = useState({
        start: false,
        end: true,
    });

    const handleReachBeginning = () => {
        setOverlay((prev) => ({ ...prev, start: false }));
    };

    const handleReachEnd = () => {
        setOverlay((prev) => ({ ...prev, end: false }));
    };

    const handleSliderMove = (swiper: SwiperType) => {
        if (!swiper.isBeginning && !swiper.isEnd) {
            setOverlay(() => ({ start: true, end: true }));
        }
    };

    const [pieChartData, setPieChartData] = useState<ChartData[]>([]);
    const [pieTimeChartData, setPieTimeChartData] = useState<TimeChartData[]>([]);
    const [totalEmsCapacity, setTotalEmsCapacity] = useState<number>(0);

    const { dataList } = useWebSocketStore();

    const CHART_TEMPLETE = [
        {
            title: 'cumulativeDischarge',
            unit: 'kWh',
            key: 'ems_acc_dischg_amount',
        },
        {
            title: 'dischargeAmount',
            unit: 'kWh',
            key: 'ems_instant_dischg_amount',
        },
        {
            title: 'dailyDischarge',
            unit: 'kWh',
            key: 'ems_day_dischg_amount',
        }
    ];
    const TIME_CHART_TEMPLETE = [
        {
            title: 'cumulativeDischargeTime',
            key: 'ems_acc_dischg_time',
        },
        {
            title: 'dailyDischargeTime',
            key: 'ems_day_dischg_time',
        }
    ]

    useEffect(() => {
        if (!dataList) {
            return;
        }

        let _totalEmsCapacity = dataList.reduce((total, site) => {
            const siteTotal = site.shipList.reduce((shipTotal, ship) => {
                const shipTotalVolt = ship.bmsList
                    .filter((bms) => bms.bmsData !== null)
                    .reduce((bmsTotal, bms) => {
                        return bmsTotal + bms.bmsData.ems_capacity;
                    }, 0);
                return shipTotal + shipTotalVolt;
            }, 0);
            return total + siteTotal;
        }, 0)
        _totalEmsCapacity = Math.round(_totalEmsCapacity);
        setTotalEmsCapacity(_totalEmsCapacity);

        let _pieChartData: ChartData[] = [];
        CHART_TEMPLETE.map((item) => {
            const totalValue = Math.round(dataList.reduce((total, site) => {
                const siteTotal = site.shipList.reduce((shipTotal, ship) => {
                    const shipTotalVolt = ship.bmsList
                        .filter((bms) => bms.bmsData !== null)
                        .reduce((bmsTotal, bms) => {
                            return bmsTotal + bms.bmsData[item.key];
                        }, 0);
                    return shipTotal + shipTotalVolt;
                }, 0);
                return total + siteTotal;
            }, 0) * 100) / 100;
            _pieChartData.push({
                title: trans(item.title),
                unit: getEnergyUnit(totalValue),
                total: convertEnergyValue(totalValue)?.toFixed(2),
                pieData: dataList.map((site) => {
                    const shipTotal = Math.round(site.shipList.reduce((shipTotal, ship) => {
                        const shipTotalVolt = ship.bmsList
                            .filter((bms) => bms.bmsData !== null)
                            .reduce((bmsTotal, bms) => {
                                return bmsTotal + bms.bmsData[item.key];
                            }, 0);
                        return shipTotal + shipTotalVolt;
                    }, 0) * 100) / 100;
                    return {
                        name: currentLanguage == 'kr' ? site.siteName : site.siteName_foreign,
                        value: shipTotal,
                    };
                }),
            });
        }
        )
        setPieChartData(_pieChartData);

        let _pieTimeChartData: Array<TimeChartData> = [];
        TIME_CHART_TEMPLETE.map((templete) => {
            _pieTimeChartData.push({
                title: trans(templete.title),
                total: Math.round(dataList.reduce((total, site) => {
                    const siteTotal = site.shipList.reduce((shipTotal, ship) => {
                        const shipTotalVolt = ship.bmsList
                            .filter((bms) => bms.bmsData !== null)
                            .reduce((bmsTotal, bms) => {
                                return bmsTotal + bms.bmsData[templete.key];
                            }, 0);
                        return shipTotal + shipTotalVolt;
                    }, 0);
                    return total + siteTotal;
                }, 0)),
                pieData: dataList.map((site) => {
                    const shipTotal = Math.round(site.shipList.reduce((shipTotal, ship) => {
                        const shipTotalVolt = ship.bmsList
                            .filter((bms) => bms.bmsData !== null)
                            .reduce((bmsTotal, bms) => {
                                return bmsTotal + bms.bmsData[templete.key];
                            }, 0);
                        return shipTotal + shipTotalVolt;
                    }, 0) * 100) / 100;
                    return {
                        name: currentLanguage == 'kr' ? site.siteName : site.siteName_foreign,
                        value: shipTotal,
                    };
                }),
            })
        })
        setPieTimeChartData(_pieTimeChartData);

    }, [dataList]);

    if (!dataList) {
        return (
            <></>
        );
    }
    return (
        <div className='mt-5 mx-[18px] sm:mt-0 lg:mx-0'>
            {/* PC CHARTS */}
            <div className='relative hidden sm:flex items-center mt-[11px] sm:mt-0 transition-all'>
                <div
                    className={cn(
                        'absolute top-0 z-10 w-14 sm:w-40 h-[260px] flex justify-end items-start bg-gradient-to-r from-[rgb(43,49,59)] 1.16% to-[rgba(43,49,59,0)] 48.6% left-0 rounded-r-lg transition-all',
                        overlay.start ? 'visible' : 'invisible',
                    )}
                />
                <div className='relative flex w-fit items-stretch gap-5 3xl:justify-center overflow-x-scroll'>
                    <Swiper
                        slidesPerView='auto'
                        spaceBetween={20}
                        freeMode
                        onReachBeginning={handleReachBeginning}
                        onReachEnd={handleReachEnd}
                        onSliderMove={handleSliderMove}
                        modules={[FreeMode]}
                        className='mySwiper'>
                        <SwiperSlide className='!w-fit'>
                            <div className='flex flex-col justify-between pt-[27px] pr-8 pb-6 pl-[26px] w-[278px] h-[260px] bg-hw-dark-2 rounded-lg shrink-0'>
                                <span className='text-hw-white-2 text-lg leading-[22px] font-light mb-4'>{trans('installed')}</span>
                                <p className='text-right text-hw-white-1 text-[40px] leading-normal font-bold'>
                                    <span>{totalEmsCapacity}</span> <span className='text-2xl font-normal'>kWh</span>
                                </p>
                            </div>
                        </SwiperSlide>
                        {
                            pieChartData.map((chartData: ChartData, index: number) => (
                                <SwiperSlide key={index} className='!w-fit max-sm:!mr-[12px]'>
                                    <ChartWrapper key={'ChartWrapper-' + index} data={chartData} />
                                </SwiperSlide>
                            ))
                        }
                        {
                            pieTimeChartData.map((chartData: TimeChartData, index: number) => (
                                <SwiperSlide key={index} className='!w-fit max-sm:!mr-[12px]'>
                                    <TimeChartWrapper key={'ChartWrapper-' + index} data={chartData} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div
                    className={cn(
                        'absolute h-[260px] top-0 z-10 w-14 sm:w-40 flex justify-end items-start bg-gradient-to-l from-[#2B313B] 14.16% to-[rgba(43,49,59,0)] 48.6% right-0 rounded-r-lg transition-all',
                        overlay.end ? 'visible' : 'invisible',
                    )}></div>
            </div>
        </div>
    );
}
