import { cn } from '@/helpers/class-name.helper';
import { PeriodType_StatisticsTab, PeriodType_StatisticsDataFilter, PeriodType_StatisticsDataFilterBasic } from '@/enums/statistics';
import systemEmsStatisticsStore from '@/api/systemEmsStatisticsStore';
import { useTranslation } from 'react-i18next';
import DiagLineChart from "./graph/DiagLineGraph"
import DiagPieChart from './graph/DiagPieGraph';
import DiagBarChart from "./graph/DiagBarGraph"
import DiagBarHistogram from "./graph/DiagBarHistogram"
import { useEffect, useRef, useState } from 'react';
import { GraphData, LineDataType, PieDataType, HistogramData } from "./graph/GraphTypes.type"
import { useLocation } from 'react-router-dom';

type CommonBox = {
    title: string;
    body: string | Function | React.ReactNode;
    // body: string | React.ReactNode;
}
const GRAPH_BUTTONS = [
    {
        id: 1,
        name: 'basicStatistics',
        periodType: PeriodType_StatisticsTab.BASIC,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 2,
        name: 'hourlyStatistics',
        periodType: PeriodType_StatisticsTab.HOUR,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 3,
        name: 'weekStatistics',
        periodType: PeriodType_StatisticsTab.WEEK,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
];

const GRAPH_DATA_FILTER = [
    {
        id: 1,
        name: 'daily',
        periodType: PeriodType_StatisticsDataFilter.DAILY,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 2,
        name: 'weekly',
        periodType: PeriodType_StatisticsDataFilter.WEEKLY,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 3,
        name: 'monthly',
        periodType: PeriodType_StatisticsDataFilter.MONTHLY,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 4,
        name: 'accumulate',
        periodType: PeriodType_StatisticsDataFilter.ACC,
        className:
            'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
];


const GRAPH_DATA_FILTER_BASIC = [
    {
        id: 1,
        name: 'socChange',
        periodType: PeriodType_StatisticsDataFilterBasic.SOCCHANGE,
        className:
            'text-[14px] h-8 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 2,
        name: 'tempChange',
        periodType: PeriodType_StatisticsDataFilterBasic.TEMPCHANGE,
        className:
            'text-[14px] h-8 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
    {
        id: 3,
        name: 'stressChange',
        periodType: PeriodType_StatisticsDataFilterBasic.STRESSCHANGE,
        className:
            'text-[14px] h-8 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
    },
];

const convertPeriodTypeToString = (periodType: PeriodType_StatisticsTab): string => {
    switch (periodType) {
        case PeriodType_StatisticsTab.BASIC:
            return 'basic';
        case PeriodType_StatisticsTab.HOUR:
            return 'hour';
        case PeriodType_StatisticsTab.WEEK:
            return 'day';
        default:
            return 'basic';
    }
};

const convertDataFilterToString = (dataFilter: PeriodType_StatisticsDataFilter): string => {
    switch (dataFilter) {
        case PeriodType_StatisticsDataFilter.DAILY:
            return 'day';
        case PeriodType_StatisticsDataFilter.WEEKLY:
            return 'week';
        case PeriodType_StatisticsDataFilter.MONTHLY:
            return 'month';
        case PeriodType_StatisticsDataFilter.ACC:
            return 'acc';
        default:
            return 'day';
    }
};


export default function StatisticsTab() {
    const { t: trans } = useTranslation('translation');
    const [bmsId, setBmsId] = useState<string>('');
    const [rackNum, setRackNum] = useState<string>('');
    const { periodType, periodType_filter, periodType_filter_basic, setPeriodType, setPeriodType_filter, setPeriodType_filter_basic } = systemEmsStatisticsStore();
    const { statisticsList, statisticsList2, storeStatisticsList } = systemEmsStatisticsStore();
    const [graphDatas, setGraphDatas] = useState<GraphData[]>([]);
    const [keyDatasMultyLine01, setKeyDatasMultyLine01] = useState<string[]>([]);
    const [graphDatasMultyLine01, setGraphDatasMultyLine01] = useState<LineDataType[]>([]); // 각종변화    
    const [xNameMultyLine01, setXNameMultyLine01] = useState<string>(""); // x축단위
    const [yNameMultyLine01, setYNameMultyLine01] = useState<string>(""); // y축단위
    const [graphDatasHistogram01, setGraphDatasHistogram01] = useState<HistogramData | null>(null); // 파워사용률    
    const [graphDatasPie01, setGraphDatasPie01] = useState<PieDataType[]>([]);
    const [graphDatasPie02, setGraphDatasPie02] = useState<PieDataType[]>([]);
    const [graphDatasHistogram02, setGraphDatasHistogram02] = useState<HistogramData | null>(null); // 사용시간대
    const [graphDatasHistogram03, setGraphDatasHistogram03] = useState<HistogramData | null>(null); // 평균파워
    const [graphDatasHistogram04, setGraphDatasHistogram04] = useState<HistogramData | null>(null); // 에너지
    const [keyDatasMultyLine02, setKeyDatasMultyLine02] = useState<string[]>([]);   // 스트레스
    const [graphDatasMultyLine02, setGraphDatasMultyLine02] = useState<LineDataType[]>([]); // 스트레스
    const [xNameMultyLine02, setXNameMultyLine02] = useState<string>(""); // x축단위
    const [yNameMultyLine02, setYNameMultyLine02] = useState<string>(""); // y축단위
    const location = useLocation();
    const keyTime = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",];
    const keyWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => {
        const parts = location.pathname.split('/');
        const bmsId = parts[2];
        const rackNum = parts.pop()!;
        setBmsId(bmsId);
        setRackNum(rackNum);
        if (bmsId && rackNum && convertPeriodTypeToString(periodType) && convertDataFilterToString(periodType_filter))
            storeStatisticsList(bmsId, rackNum, convertPeriodTypeToString(periodType), convertDataFilterToString(periodType_filter), trans);

    }, []);

    useEffect(() => {
        // 요일별 선택하면 서브필터는 주별을 선택(일별은 사라지기 때문)
        if (periodType == PeriodType_StatisticsTab.WEEK)
            setPeriodType_filter(PeriodType_StatisticsDataFilter.WEEKLY)
        else // 그 이외에는 일별이 선택
            setPeriodType_filter(PeriodType_StatisticsDataFilter.DAILY)

        // 서버로 조회
        if (bmsId && rackNum && convertPeriodTypeToString(periodType) && convertDataFilterToString(periodType_filter))
            storeStatisticsList(bmsId, rackNum, convertPeriodTypeToString(periodType), convertDataFilterToString(periodType_filter), trans);
    }, [periodType]);

    useEffect(() => {
        // 서버로 조회
        if (bmsId && rackNum && convertPeriodTypeToString(periodType) && convertDataFilterToString(periodType_filter))
            storeStatisticsList(bmsId, rackNum, convertPeriodTypeToString(periodType), convertDataFilterToString(periodType_filter), trans);
    }, [periodType_filter]);



    useEffect(() => {
        if (bmsId && rackNum && convertPeriodTypeToString(periodType) && convertDataFilterToString(periodType_filter))
            storeStatisticsList(bmsId, rackNum, convertPeriodTypeToString(periodType), convertDataFilterToString(periodType_filter), trans);
    }, [periodType_filter_basic]);

    useEffect(() => {
        console.log("statisticsList = ", statisticsList)
        console.log("statisticsList2 = ", statisticsList2)

        // 기본통계
        if (periodType == PeriodType_StatisticsTab.BASIC) {
            // 여러가지 변화
            setPeriodTypeFilterBasic();
            // 파워사용률
            setPowerUsageRate();
            // 충 방 휴지 시간비율
            setChargingDischargingRrestTimeRatio();
            // 충 방전 파워비율
            setChargingDischargingRrestPowerRatio();
        } else {    // 시간별, 요일별 통계
            // 사용시간대
            setTimeOfUse();
            // 평균파워
            setAveragePower();
            // 에너지
            setEnergy();
            // 스트레스
            setStress();
        }
    }, [statisticsList, statisticsList2, trans]);

    // 기본통계 - 여러가지변화 그래프 (일별, 주별, 월별)
    const setPeriodTypeFilterBasic = () => {
        var datas01: LineDataType[] | null = null;
        if (periodType_filter_basic == PeriodType_StatisticsDataFilterBasic.SOCCHANGE) {
            datas01 = [
                { 
                    name: trans("socChange"),
                    type: "line",
                    data: statisticsList?.last_soc ?? [],
                    itemStyle: {},
                },
            ];
            setYNameMultyLine01("SOC[%]")
        } else if (periodType_filter_basic == PeriodType_StatisticsDataFilterBasic.TEMPCHANGE) {
            datas01 = [
                {
                    name: trans("tempChange"),
                    type: "line",
                    data: statisticsList?.avg_temp ?? [],
                    itemStyle: {},
                },
            ];
            setYNameMultyLine01("Temp[℃]")
        } else {    // STRESSCHANGE 
            datas01 = [
                {
                    name: "스트레스 변화",
                    type: "line",
                    data: statisticsList?.avg_stress ?? [],
                    itemStyle: {},
                },
            ];
            setYNameMultyLine01("Stress")
        }
        setKeyDatasMultyLine01(statisticsList?.timestamp ?? []);
        setGraphDatasMultyLine01(datas01);
        setXNameMultyLine01("Date")
    };

    // 파워 사용률    
    const setPowerUsageRate = () => {
        var datas01: HistogramData | null = null;

        datas01 =
        {
            name1: trans("charge"),
            name2: trans("discharge"),
            keyDatas: statisticsList?.timestamp ?? [],
            dataValues1: statisticsList?.chg_power_rate.map(value => Math.abs(value)) ?? [],
            dataValues2: statisticsList?.dchg_power_rate.map(value => -Math.abs(value)) ?? [],
            type: 0,    // bar
            tooltip: {},
            itemStyle1: {
                color: '#e76e30'  // 주황색
            },
            itemStyle2: {
                color: '#4069bb'  // 파란색
            },
        };
        setGraphDatasHistogram01(datas01);
    };

    // 충 방 휴지 시간비율
    const setChargingDischargingRrestTimeRatio = () => {
        const columnsPie = [
            {
                name: trans("discharge"),
                value: Math.abs(statisticsList?.chg_time ?? 0),
                itemStyle: {
                    color: '#4069bb'
                }
            },
            {
                name: trans("charge"),
                value: Math.abs(statisticsList?.dchg_time ?? 0),
                itemStyle: {
                    color: '#e76e30'
                }
            },
            {
                name: trans("rest"),
                value: Math.abs(statisticsList?.rest_time ?? 0),
                itemStyle: {
                    color: '#9b9b9b'
                }
            }
        ];
        setGraphDatasPie01(columnsPie);      // 값
    };

    // 충 방 파워비율
    const setChargingDischargingRrestPowerRatio = () => {
        const columnsPie = [
            {
                name: trans("discharge"),
                value: Math.abs(statisticsList?.chg_power ?? 0),
                itemStyle: {
                    color: '#4069bb'
                }
            },
            {
                name: trans("charge"),
                value: Math.abs(statisticsList?.dchg_power ?? 0),
                itemStyle: {
                    color: '#e76e30'
                }
            },
        ];
        setGraphDatasPie02(columnsPie);      // 값
    };

    // 사용 시간대
    const setTimeOfUse = () => {
        var datas01: HistogramData | null = null;

        datas01 =
        {
            name1: trans("charge"),
            name2: trans("discharge"),
            keyDatas: periodType == PeriodType_StatisticsTab.HOUR ? keyTime : keyWeek,
            dataValues1: statisticsList2?.chg_time ?? [],
            dataValues2: statisticsList2?.dchg_time ?? [],
            type: 0,    // bar
            tooltip: {},
            itemStyle1: {
                color: '#e76e30'  // 주황색
            },
            itemStyle2: {
                color: '#4069bb'  // 파란색
            },
        };
        setGraphDatasHistogram02(datas01);
    };

    // 평균파워
    const setAveragePower = () => {
        var datas01: HistogramData | null = null;

        datas01 =
        {
            name1: trans("charge"),
            name2: trans("discharge"),
            keyDatas: periodType == PeriodType_StatisticsTab.HOUR ? keyTime : keyWeek,
            dataValues1: statisticsList2?.chg_power.map(value => Math.abs(value)) ?? [],
            dataValues2: statisticsList2?.dchg_power.map(value => -Math.abs(value)) ?? [],
            type: 0,    // bar
            tooltip: {},
            itemStyle1: {
                color: '#e76e30'  // 주황색
            },
            itemStyle2: {
                color: '#4069bb'  // 파란색
            },
        };
        setGraphDatasHistogram03(datas01);
    };

    // 에너지
    const setEnergy = () => {
        var datas01: HistogramData | null = null;

        datas01 =
        {
            name1: trans("charge"),
            name2: trans("discharge"),
            keyDatas: periodType == PeriodType_StatisticsTab.HOUR ? keyTime : keyWeek,
            dataValues1: statisticsList2?.chg_energy.map(value => Math.abs(value)) ?? [],
            dataValues2: statisticsList2?.dchg_energy.map(value => -Math.abs(value)) ?? [],
            type: 0,    // bar
            tooltip: {},
            itemStyle1: {
                color: '#e76e30'  // 주황색
            },
            itemStyle2: {
                color: '#4069bb'  // 파란색
            },
        };
        setGraphDatasHistogram04(datas01);
    };

    // 스트레스
    const setStress = () => {
        var datas01: LineDataType[] | null = null;
        datas01 = [
            {
                name: trans("charge"),
                type: "line",
                data: statisticsList2?.chg_stress ?? [],
                itemStyle: {
                    color: '#e76e30'
                }
            },
            {
                name: trans("discharge"),
                type: "line",
                data: statisticsList2?.dchg_stress ?? [],
                itemStyle: {
                    color: '#4069bb'
                }
            },

        ];
        setKeyDatasMultyLine02(periodType == PeriodType_StatisticsTab.HOUR ? keyTime : keyWeek);
        setGraphDatasMultyLine02(datas01);
        setYNameMultyLine02("Stress")
        setXNameMultyLine02("Hour")
    };


    const HalfWihthBox = ({ title, body }: CommonBox) => {
        const renderBody = () => {
            if (typeof body === 'string') {
                return <div className="flex-1 flex items-center justify-center p-5 border-t">{body}</div>;
            } else if (typeof body === 'function') {
                return <div className="flex-1 flex items-center justify-center border-t">{body()}</div>;
            } else {
                return <div className="flex-1 flex items-center justify-center border-t">{body}</div>;
            }
        };

        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-150">
                <div className="flex items-center justify-between p-5">
                    <div className="text-xl">{title}</div>
                    {periodType === PeriodType_StatisticsTab.BASIC && title === trans('change') && (
                        <div className="flex items-center">
                            {GRAPH_DATA_FILTER_BASIC.map((btn) => (
                                <button
                                    key={btn.id}
                                    className={cn(btn.className, btn.periodType === periodType_filter_basic && 'bg-[#FFDAC2] border-hw-orange-1')}
                                    onClick={() => setPeriodType_filter_basic(btn.periodType)}
                                >
                                    {trans(btn.name)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {renderBody()}
            </div>
        );
    };

    const chartBar = (datas: GraphData) => {
        return (
            <DiagBarChart datas={datas} />
        )
    };
    const chartHistogram = (datas: HistogramData | null, xName: string, yName: string) => {
        if (!datas) return null;
        return (
            <DiagBarHistogram datas={datas} xName={xName} yName={yName}/>
        );
    };
    const chartMultyLine = (keys: string[], datas: LineDataType[], xName: string, yName: string) => {
        return (
            <DiagLineChart keys={keys} datas={datas} xName={xName} yName={yName} />
        )
    };
    const chartPie = (datas: PieDataType[]) => {
        return (
            <DiagPieChart datas={datas} />
        )
    };
    return (
        <div className="flex flex-col gap-5 p-4">
            <section className='h-full py-5 px-[18px] lg:px-8 lg:py-6 lg:pb-3 bg-hw-dark-2 rounded-none lg:rounded-lg flex flex-col'>
                <div className={cn('flex items-center w-full mb-6')}>
                    {GRAPH_BUTTONS.map((btn) => {
                        return (
                            <button
                                key={btn.id}
                                className={cn(btn.className, btn.periodType == periodType && 'bg-[#FFDAC2] border-hw-orange-1')}
                                onClick={() => {
                                    setPeriodType(btn.periodType);
                                }}>
                                {trans(btn.name)}
                            </button>
                        );
                    })}
                </div>
                <div className={cn('flex items-center w-full mb-6')}>
                    {GRAPH_DATA_FILTER.filter(btn => periodType !== PeriodType_StatisticsTab.WEEK || btn.periodType !== PeriodType_StatisticsDataFilter.DAILY).map((btn) => {
                        return (
                            <button
                                key={btn.id}
                                className={cn(btn.className, btn.periodType == periodType_filter && 'bg-[#FFDAC2] border-hw-orange-1')}
                                onClick={() => {
                                    setPeriodType_filter(btn.periodType);
                                }}>
                                {trans(btn.name)}
                            </button>
                        );
                    })}
                </div>
            </section >
            {periodType == PeriodType_StatisticsTab.BASIC ? // 기본통계
                <section className=''>

                    <div className="flex gap-4 mb-6">
                        <HalfWihthBox title={trans('change')} body={chartMultyLine(keyDatasMultyLine01, graphDatasMultyLine01, xNameMultyLine01, yNameMultyLine01)} />
                        {/* <HalfWihthBox title={trans('cellCapacityMaxMinAve')} body="-" /> */}
                        <HalfWihthBox title={trans('powerUsageRate')} body={chartHistogram(graphDatasHistogram01, "Date", "W")} />
                    </div>
                    <div className="flex gap-4 mb-6">
                        <HalfWihthBox title={trans('chargingDischargingRrestTimeRatio')} body={chartPie(graphDatasPie01)} />
                        {/* <HalfWihthBox title={trans('cellCapacityMaxMinAve')} body="-" /> */}
                        <HalfWihthBox title={trans('chargingDischargingRrestPowerRatio')} body={chartPie(graphDatasPie02)} />
                    </div>
                </section >
                :  // 시간별, 요일별 통계                
                <section className=''>
                    <div className="flex items-center w-full gap-4 mb-6">
                        <HalfWihthBox title={trans('timeOfUse')} body={chartHistogram(graphDatasHistogram02,"Hour", "h")} />
                        {/* <HalfWihthBox title={trans('cellCapacityMaxMinAve')} body="-" /> */}
                        <HalfWihthBox title={trans('averagePower')} body={chartHistogram(graphDatasHistogram03, "Hour", "W")} />
                    </div>
                    <div className="flex items-center w-full gap-4 mb-6">
                        <HalfWihthBox title={trans('energy')} body={chartHistogram(graphDatasHistogram04, "Hour", "W")} />
                        {/* <HalfWihthBox title={trans('cellCapacityMaxMinAve')} body="-" /> */}
                        <HalfWihthBox title={trans('stress')} body={chartMultyLine(keyDatasMultyLine02, graphDatasMultyLine02, xNameMultyLine02, yNameMultyLine02)} />
                    </div>
                </section >
            }

        </div>
    )
}