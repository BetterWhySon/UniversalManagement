import useSystemInfoDiagnostics1 from '@/api/systemInfoDiagnostics1';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DiagRingChart from "./graph/DiagRingGraph"
import DiagBarChart from "./graph/DiagBarGraph"
import DiagLineChart from "./graph/DiagLineGraph"
import DiagPieChart from "./graph/DiagPieGraph"
import DiagBarMultyWindow from "./graph/DiagBarMultyWindow"
import { useEffect, useRef, useState } from 'react';
import { GraphData, LineDataType, PieDataType, MultyWindowData } from "./graph/GraphTypes.type"

type CommonBox = {
    title: string;
    body: string | Function | React.ReactNode;
    // body: string | React.ReactNode;
}

const FullWihthBox = ({ title, body }: CommonBox) => {
    if (typeof body === 'string') {
        return (
            <div className="w-full flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center p-5 border-t">{body}</div>
            </div>
        );
    } else if (typeof body === 'function') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center border-t">{body()}</div>
            </div>
        );
    } else {
        return (
            <div className="w-full flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center p-5 border-t">{body}</div>
            </div>
        );
    }
};

const HalfWihthBox = ({ title, body }: CommonBox) => {
    if (typeof body === 'string') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center p-5 border-t">{body}</div>
            </div>
        );
    } else if (typeof body === 'function') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center border-t">{body()}</div>
            </div>
        );
    }
    else {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center border-t">{body}</div>
            </div>
        );
    }
};

const QuarterWidthBox = ({ title, body }: CommonBox) => {
    if (typeof body === 'string') {
        return (
            <div className="w-1/4 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center p-5 border-t">{body}</div>
            </div>
        );
    } else if (typeof body === 'function') {
        return (
            <div className="w-1/4 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center border-t">{body()}</div>
            </div>
        );
    }
    else {
        return (
            <div className="w-1/4 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center border-t">{body}</p>
            </div>
        );
    }
};

export default function DiagnosisTab() {
    const { diagnostics1Data, storeDiagnostics1Data } = useSystemInfoDiagnostics1();
    const location = useLocation();
    const { t: trans, i18n } = useTranslation('translation');
    const currentLanguage = i18n.language;
    const navigate = useNavigate();
    const [batGrade, setBatGrade] = useState<string>();
    const [graphDatas, setGraphDatas] = useState<any[]>([]);
    const [graphDatasMultyLine01, setGraphDatasMultyLine01] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine01, setKeyDatasMultyLine01] = useState<string[]>([]);
    const [graphDatasMultyLine02, setGraphDatasMultyLine02] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine02, setKeyDatasMultyLine02] = useState<string[]>([]);
    const [graphDatasMultyLine03, setGraphDatasMultyLine03] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine03, setKeyDatasMultyLine03] = useState<string[]>([]);
    const [graphDatasMultyLine04, setGraphDatasMultyLine04] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine04, setKeyDatasMultyLine04] = useState<string[]>([]);
    const [graphDatasMultyLine05, setGraphDatasMultyLine05] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine05, setKeyDatasMultyLine05] = useState<string[]>([]);
    const [graphDatasPie01, setGraphDatasPie01] = useState<PieDataType[]>([]);
    const [cellResiStatMinIdx, setCellResiStatMinIdx] = useState<number>(0);
    const [cellResiStatMaxIdx, setCellResiStatMaxIdx] = useState<number>(0);

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log(location);
        const token = localStorage.getItem("token");
        if (token === null) {
            navigate('/login');
            return;
        }
        const parts = location.pathname.split('/');
        storeDiagnostics1Data(Number(parts[2]), Number(parts[4]), trans)
    }, [location]);

    useEffect(() => {
        console.log(diagnostics1Data);

        // 배터리 종합 등급
        setBatGrade(diagnostics1Data?.batt_overall.batt_total_grade == 'None' || diagnostics1Data?.batt_overall.batt_total_grade == null
            ? '-' : diagnostics1Data?.batt_overall.batt_total_grade)
        let _datas: Array<any> = [];
        // 랙의 여러가지 용량 (Rack 용량)
        let _data0 = {
            keyDatas: ["공칭 용량", "셀 평균 용량", "안전 용량", "실 가용 용량"],
            // dataValues: [60, 80, 20, 90],
            dataValues: [diagnostics1Data?.rack_various_capacity.rack_capacity || 0,
            diagnostics1Data?.rack_various_capacity.cell_avg_capacity || 0,
            diagnostics1Data?.rack_various_capacity.safe_capacity || 0,
            diagnostics1Data?.rack_various_capacity.available_capacity || 0],

            type: 0,    // bar
            tooltip: {}
        };
        _datas.push(_data0)

        // 셀 용량(최대, 최소, 평균)
        let _data1 = {
            keyDatas: [
                `최대[${diagnostics1Data?.cell_capacity.cell_max_capacity.max_cr_idx || 'N/A'}]`,
                `최소[${diagnostics1Data?.cell_capacity.cell_min_capacity.min_cr_idx || 'N/A'}]`,
                "평균"
            ],
            // dataValues: [60, 80, 20],
            dataValues: [diagnostics1Data?.cell_capacity.cell_max_capacity.max_c_cr || 0,
            diagnostics1Data?.cell_capacity.cell_min_capacity.min_c_cr || 0,
            diagnostics1Data?.cell_capacity.avg_c_cr || 0],
            type: 0,    // bar
            tooltip: {
                trigger: "item",
                axisPointer: {
                    type: "shadow"
                },
                // formatter: function (params: any) {
                //     let indexValue = ''; // 툴팁에 표시될 값
                //     switch (params.dataIndex) {
                //         case 0:// 최대값의 인덱스(랙번호?)
                //             indexValue = `Max Index: ${diagnostics1Data?.cell_capacity.cell_max_capacity.max_cr_idx ?? 'N/A'}`;
                //             break;
                //         case 1:// 평균값
                //             indexValue = `Average Capacity: ${diagnostics1Data?.cell_capacity.avg_c_cr ?? 'N/A'}`;
                //             break;
                //         case 2:// 최대값의 인덱스(랙번호?)
                //             indexValue = `Min Index: ${diagnostics1Data?.cell_capacity.cell_min_capacity.min_cr_idx ?? 'N/A'}`;
                //             break;
                //     }
                //     return `${params.name}<br/>${indexValue}`;
                // }
            }
        };
        _datas.push(_data1)

        // cell 용량 분포                 
        // const arr = [120, 200, 120, 200, 70, 30, 70, 50, 200, 100, 100, 200, 30, 30, 70]
        const arr = diagnostics1Data?.cell_capacity_distribution.cell_capacity || [];
        if (Array.isArray(arr)) {
            const uniqueSortedArr = [...new Set(arr)].sort((a, b) => a - b);
            const counts = uniqueSortedArr.map(value => arr.filter(item => item === value).length);
            _datas.push({
                keyDatas: uniqueSortedArr,
                dataValues: counts,
                type: 1,    // bar + line
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params: any) {
                        const xValue = params[0].name;
                        const yValue = params[0].value;
                        return `X: ${xValue}<br/>Y: ${yValue}`;
                    }
                }
            });
        }

        // Cell 용량 변화 추세
        const cTrendMax = diagnostics1Data?.cell_capacity_change_trend.trend_max || [];
        const cTrendMin = diagnostics1Data?.cell_capacity_change_trend.trend_min || [];
        const cTrendMaxData = cTrendMax.map(item => item.max_c_cr);
        const cTrendMaxIdx = cTrendMax.map(item => item.max_cr_idx);
        const cTrendMinData = cTrendMin.map(item => item.min_c_cr);
        const cTrendMinIdx = cTrendMin.map(item => item.min_cr_idx);
        const cTrendAvgData = diagnostics1Data?.cell_capacity_change_trend.trend_avg || [];

        const tooltipFormatter = (params: any) => {
            const max = cTrendMaxData[params.dataIndex];
            const maxIdx = cTrendMaxIdx[params.dataIndex];
            const min = cTrendMinData[params.dataIndex];
            const minIdx = cTrendMinIdx[params.dataIndex];
            const avg = cTrendAvgData[params.dataIndex];
            return `
            Max: ${max}Ah [${maxIdx}번]<br/>
            Ave: ${avg}Ah<br/>
            Min: ${min}Ah [${minIdx}번]        
            `;
        };

        const columnsML01 = [
            {
                name: "Max",
                type: "line",
                data: cTrendMaxData,
                itemStyle: {},
                tooltip: {
                    trigger: 'item',
                    formatter: tooltipFormatter
                }
            },
            {
                name: "Ave",
                type: "line",
                data: cTrendAvgData,
                itemStyle: {},
                tooltip: {
                    trigger: 'item',
                    formatter: tooltipFormatter
                }
            },
            {
                name: "Min",
                type: "line",
                data: cTrendMinData,
                itemStyle: {},
                tooltip: {
                    trigger: 'item',
                    formatter: tooltipFormatter
                }
            },
        ];
        setKeyDatasMultyLine01(diagnostics1Data?.cell_capacity_change_trend.timestamp || []);
        setGraphDatasMultyLine01(columnsML01);

        // cell 잔량밸런스                 
        // // const arr2 = [120, 200, 120, 200, 70, 30, 70, 50, 200, 100, 100, 30, 30, 70, 70, 70]
        // const arr2 = [diagnostics1Data?.cell_rest_balance["100_zone_left"],
        //             diagnostics1Data?.cell_rest_balance["100_zone_right"],
        //             diagnostics1Data?.cell_rest_balance["0_zone_left"],
        //             diagnostics1Data?.cell_rest_balance["0_zone_right"],]
        // // 오름차순으로 정렬하고 중복을 제거
        // const uniqueSortedArr2 = [...new Set(arr2)].sort((a, b) => a - b);
        // // 각 값의 개수를 저장
        // const counts2 = uniqueSortedArr2.map(value => arr2.filter(item => item === value).length);
        // _datas.push({
        //     keyDatas: uniqueSortedArr2,
        //     dataValues: counts2,
        //     type: 1,    // bar + line
        //     tooltip: {}
        // })

        let _data2 = {
            keyDatas: [diagnostics1Data?.cell_rest_balance["100_zone_left"],
            diagnostics1Data?.cell_rest_balance["100_zone_right"].max_cac_idx,
            diagnostics1Data?.cell_rest_balance["0_zone_left"],
            diagnostics1Data?.cell_rest_balance["0_zone_right"].min_fac_idx
            ],
            // dataValues: [60, 80, 20, 90],
            dataValues100ZoneBase: [0, 0],
            dataValues100ZoneValue: [100, diagnostics1Data?.cell_rest_balance["100_zone_right"] ? 200 - diagnostics1Data?.cell_rest_balance["100_zone_right"].dsoc : 0],
            dataValues0ZoneBase: [diagnostics1Data?.cell_rest_balance["0_zone_right"] ? 100 - diagnostics1Data?.cell_rest_balance["0_zone_right"].dsoc : 0, 0],
            dataValues0ZoneValue: [100, diagnostics1Data?.cell_rest_balance["0_zone_right"] ? 200 - diagnostics1Data?.cell_rest_balance["0_zone_right"].dsoc : 0],

            type: 0,    // bar
            tooltip: {}
        };
        _datas.push(_data2)


        // 전체 구간 잔량 밸런스 (라인 하나)     
        const columnsML02 = [
            {
                name: "",
                type: "line",
                // data: [30, 50, 80, 30, 95, 20, 50, 90],
                data: diagnostics1Data?.allrange_rest_balance.max_soc || [],
                itemStyle: {}
            },
        ];
        // setKeyDatasMultyLine02(["21", "22", "23", "24", "25", "26", "27", "28"]);  // x축
        setKeyDatasMultyLine02(diagnostics1Data?.allrange_rest_balance.timestamp || []);  // x축        
        setGraphDatasMultyLine02(columnsML02);      // 값

        // RACK 저항 구성 (파이 그래프)
        const columnsPie01 = [
            {
                name: trans("rackResistance"),
                // value: 42,
                value: diagnostics1Data?.rack_resistance.rack_resistance || 0,

            },
            {
                name: trans("hwResistance"),
                // value: 58,
                value: diagnostics1Data?.rack_resistance.hw_resistance || 0,
            },
            // {
            //     name: "cell 합산 저항",
            //     value: 20,
            //     // value: diagnostics1Data?.rack_resistance.cell_resistance || 0,
            // }
        ];
        setGraphDatasPie01(columnsPie01);      // 값


        // cell 저항(최대, 최소, 평균)
        _datas.push({
            keyDatas: [`최대[${diagnostics1Data?.cell_resistance_statistics.resistance_max.max_cell_idx || '-'}]`,
            `최소[${diagnostics1Data?.cell_resistance_statistics.resistance_min.min_cell_idx || '-'}]`,
                "평균"],
            // dataValues: [90, 60, 75],
            dataValues: [diagnostics1Data?.cell_resistance_statistics.resistance_max.max_cell || 0,
            diagnostics1Data?.cell_resistance_statistics.resistance_min.min_cell || 0,
            diagnostics1Data?.cell_resistance_statistics.resistance_avg || 0],
            type: 0,    // bar
            tooltip: {}
        })
        // setCellResiStatMaxIdx(diagnostics1Data?.cell_resistance_statistics.resistance_max.max_cell_idx ?? 0)
        // setCellResiStatMinIdx(diagnostics1Data?.cell_resistance_statistics.resistance_min.min_cell_idx ?? 0)

        // Cell 저항 Histogram                 
        // const arr1 = [120, 200, 120, 200, 70, 30, 70, 50, 200, 100, 100, 200, 30, 30, 70]
        const arr1 = diagnostics1Data?.cell_resitance_histogram?.histogram || [];
        if (Array.isArray(arr1)) {
            const uniqueSortedArr1 = [...new Set(arr1)].sort((a, b) => a - b);
            const counts1 = uniqueSortedArr1.map(value => arr1.filter(item => item === value).length);
            _datas.push({
                keyDatas: uniqueSortedArr1,
                dataValues: counts1,
                type: 1,    // bar + line
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params: any) {
                        const xValue = params[0].name;  // x축 값
                        const yValue = params[0].value; // y축 값
                        return `X: ${xValue}<br/>Y: ${yValue}`;
                    }
                }
            });
        }


        // _datas.push({
        //     keyDatas: ["100", "200", "300", "400"],
        //     dataValues: [120, 200, 150, 80],
        //     type: 0,    // bar + line
        //     tooltip: {
        //         trigger: "axis",
        //         axisPointer: {
        //             type: "shadow"
        //         }
        //     }
        // })

        // Cell 저항 변화 추세
        const trendMax = diagnostics1Data?.cell_resistance_change_trend.max || [];
        const trendMin = diagnostics1Data?.cell_resistance_change_trend.min || [];
        const trendMaxData = trendMax.map(item => item.max_cell);
        const trendMaxIdx = trendMax.map(item => item.max_cell_idx);
        const trendMinData = trendMin.map(item => item.min_cell);
        const trendMinIdx = trendMin.map(item => item.min_cell_idx);
        const columnsML03 = [
            {
                name: "Max",
                type: "line",
                data: trendMaxData,
                itemStyle: {},
                tooltip: {
                    trigger: 'item',
                    formatter: (params: any) => {
                        return `${params.seriesName}<br/>Index: ${trendMaxIdx[params.dataIndex]}<br/>Value: ${params.value}`;
                    }
                }
            },
            {
                name: "Ave",
                type: "line",
                data: diagnostics1Data?.cell_resistance_change_trend.avg || [],
                itemStyle: {},
                tooltip: {
                    trigger: 'item',
                    formatter: (params: any) => {
                        return `${params.seriesName}<br/>Value: ${params.value}`;
                    }
                }
            },
            {
                name: "Min",
                type: "line",
                data: trendMinData,
                itemStyle: {},
                tooltip: {
                    trigger: 'item',
                    formatter: (params: any) => {
                        return `${params.seriesName}<br/>Index: ${trendMinIdx[params.dataIndex]}<br/>Value: ${params.value}`;
                    }
                }
            },
        ];
        setKeyDatasMultyLine03(diagnostics1Data?.cell_resistance_change_trend.timestamp || []);
        setGraphDatasMultyLine03(columnsML03);

        // Rack 온도별 가용용량 (라인 하나)     
        const columnsML04 = [
            {
                name: "Capacity",
                type: "line",        
                data: diagnostics1Data?.rack_available_capacity_per_temp.pack || [],
                itemStyle: {}
            },
        ];        
        setKeyDatasMultyLine04(diagnostics1Data?.rack_available_capacity_per_temp.temper || []);  // x축
        setGraphDatasMultyLine04(columnsML04);      // 값
        
        // Rack 온도별 저항 (라인 하나)     
        const columnsML05 = [
            {
                name: "Resistance",
                type: "line",
                // data: [30, 50, 20, 30, 50, 100, 80, 30],
                data: diagnostics1Data?.rack_resistance_per_temp.pack || [],
                itemStyle: {}
            },
        ];
        // setKeyDatasMultyLine05(["21", "22", "23", "24", "25", "26", "27", "28"]);  // x축
        setKeyDatasMultyLine05(diagnostics1Data?.rack_resistance_per_temp.temper || []);  // x축
        setGraphDatasMultyLine05(columnsML05);      // 값

        ///////
        setGraphDatas(_datas);
        ///////
    }, [diagnostics1Data, trans]);

    const DIAG_1 = [
        { title: 'rackRating', value: diagnostics1Data?.overall.rack_grade != null ? diagnostics1Data.overall.rack_grade : '-' },
        { title: 'rackLife', value: diagnostics1Data?.overall.rack_lifespan != null ? diagnostics1Data.overall.rack_lifespan + ' %' : '-' },
        { title: 'rackCapacity', value: diagnostics1Data?.overall.rack_capacity != null ? diagnostics1Data.overall.rack_capacity + ' Ah' : '-' },
        { title: 'rackEfficiency', value: diagnostics1Data?.overall.rack_efficiency != null ? diagnostics1Data.overall.rack_efficiency + ' %' : '-' },
        { title: 'rackCapacityBalance', value: diagnostics1Data?.overall.rack_capacity_blance != null ? diagnostics1Data.overall.rack_capacity_blance + ' %' : '-' },
        { title: 'socBalance', value: diagnostics1Data?.overall.soc_balance != null ? diagnostics1Data.overall.soc_balance + ' %' : '-' },
        { title: 'resistanceBalance', value: diagnostics1Data?.overall.resistance_balance != null ? diagnostics1Data.overall.resistance_balance + ' %' : '-' },
    ]
    const DIAG_2_A = [
        { title: 'batteryLife', value: diagnostics1Data?.batt_overall.batt_lifespan ?? 'A' },
        { title: 'batteryEfficiency', value: diagnostics1Data?.batt_overall.batt_efficiency ?? '-' },
        { title: 'batteryPowerUsage', value: diagnostics1Data?.batt_overall.power_usage ?? '-' },
        { title: 'properSocUsage', value: diagnostics1Data?.batt_overall.proper_soc_usage ?? '-' },
    ]
    const DIAG_2_B = [
        { title: 'actualUsableBatteryCapacity', value: diagnostics1Data?.batt_overall.avalable_batt_capacity ?? '-' },
        { title: 'aging', value: diagnostics1Data?.batt_overall.aging ?? '-' },
        { title: 'capacityDeviation', value: diagnostics1Data?.batt_overall.capacity_deviation ?? '-' },
        { title: 'residualAmountDeviation', value: diagnostics1Data?.batt_overall.rest_deviation ?? '-' },
        { title: 'resistance', value: diagnostics1Data?.batt_overall.resistance ?? '-' },
    ]

    // Cell 용량
    const CrDesc = () => {
        return (
            <div className="flex flex-col gap-4 w-full px-5">
                <div className="flex justify-between">
                    <div className="">{trans('avgRackCapacity')}</div>
                    <div className="">{diagnostics1Data?.cell_capacity_data.cell_average !== null ?
                        diagnostics1Data?.cell_capacity_data.cell_average : '-'} Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxRackCapacity')}
                        ( No. {diagnostics1Data?.cell_capacity_data.cell_max.max_cr_idx !== null ?
                            diagnostics1Data?.cell_capacity_data.cell_max.max_cr_idx : '-'} )
                    </div>
                    <div className="">{diagnostics1Data?.cell_capacity_data.cell_max.max_c_cr !== null ?
                        diagnostics1Data?.cell_capacity_data.cell_max.max_c_cr : '-'} Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('minRackCapacity')}
                        ( No. {diagnostics1Data?.cell_capacity_data.cell_min.min_cr_idx !== null ?
                            diagnostics1Data?.cell_capacity_data.cell_min.min_cr_idx : '-'} )
                    </div>
                    <div className="">{diagnostics1Data?.cell_capacity_data.cell_min.min_c_cr !== null ?
                        diagnostics1Data?.cell_capacity_data.cell_min.min_c_cr : '-'} Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('avgRackCapacityDeviation')}</div>
                    <div className="">{diagnostics1Data?.cell_capacity_data.cell_avg_deviation !== null ?
                        diagnostics1Data?.cell_capacity_data.cell_avg_deviation : '-'} Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxRackCapacityDeviation')}</div>
                    <div className="">{diagnostics1Data?.cell_capacity_data.cell_max_deviation !== null ?
                        diagnostics1Data?.cell_capacity_data.cell_max_deviation : '-'} Ah</div>
                </div>
            </div>
        );
    };
    // Cell 저항
    const DcirDesc = () => {
        return (
            <div className="flex flex-col gap-4 w-full px-5">
                <div className="flex justify-between">
                    <div className="">{trans('avgCellResistance')}</div>
                    <div className="">{diagnostics1Data?.cell_resistance.cell_avg_resistance !== null ?
                        diagnostics1Data?.cell_resistance.cell_avg_resistance : '-'} mΩ</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxCellResistance')}
                        ( No. {diagnostics1Data?.cell_resistance.cell_max_resistance.max_cell_idx !== null ?
                            diagnostics1Data?.cell_resistance.cell_max_resistance.max_cell_idx : '-'} )
                    </div>
                    <div className="">{diagnostics1Data?.cell_resistance.cell_max_resistance.max_cell !== null ?
                        diagnostics1Data?.cell_resistance.cell_max_resistance.max_cell : '-'} mΩ</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('minCellResistance')}
                        ( No. {diagnostics1Data?.cell_resistance.cell_min_resistance.min_cell_idx !== null ?
                            diagnostics1Data?.cell_resistance.cell_min_resistance.min_cell_idx : '-'} )
                    </div>
                    <div className="">{diagnostics1Data?.cell_resistance.cell_avg_resistance !== null ?
                        diagnostics1Data?.cell_resistance.cell_avg_resistance : '-'} mΩ</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('avgCellResistanceDeviation')}</div>
                    <div className="">{diagnostics1Data?.cell_resistance.cell_max_resistance_diviation !== null ?
                        diagnostics1Data?.cell_resistance.cell_max_resistance_diviation : '-'} mΩ</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxCellResistanceDeviation')}</div>
                    <div className="">{diagnostics1Data?.cell_resistance.cell_avg_resistance_diviation !== null ?
                        diagnostics1Data?.cell_resistance.cell_avg_resistance_diviation : '-'} mΩ</div>
                </div>
            </div>
        );
    };
    const chartBar = (datas: GraphData, xName: string, yName: string) => {
        return (
            <DiagBarChart datas={datas} xName={xName} yName={yName} />
        )
    };
    const chartMultyWindowBar = (datas: MultyWindowData, xName: string, yName: string) => {
        return (
            <DiagBarMultyWindow datas={datas} xName={xName} yName={yName} area100Title = {trans("100%Area")} area0Title = {trans("0%Area")} />
        )
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

    // const cellDetail = (datas: PieDataType[]) => {
    //     return (
    //         <DiagPieChart datas={datas} />
    //     )
    // };
    // 하단에 추가된 박스를 출력하는 부분
    const DetailBox = ({ index, c_cr, cell }: { index: number, c_cr: string, cell: string }) => {
        return (
            <div className="w-[110px] h-[130px] flex flex-col bg-hw-dark-1 rounded-2xl shadow-md m-2">
                <div style={{ height: '33.33%' }} className="flex items-center justify-center text-lg bg-hw-gray-7 rounded-t-2xl">Cell {index}</div>
                <div style={{ height: '66.67%' }} className="flex flex-col">
                    <div className="flex-1 flex items-center justify-center">{c_cr} Ah</div>
                    <div className="flex-1 flex items-center justify-center">{cell} mΩ</div>
                </div>
            </div>
        );
    };

    // FullWihthBox에 넣어서 표출하는 부분
    const DetailBoxes = () => {
        return (
            <div className="flex flex-wrap gap-4 justify-center">
                {diagnostics1Data?.whole_cell_details?.cell?.map((cell, index) => (
                    <DetailBox
                        key={index}
                        index={index + 1}
                        c_cr={(diagnostics1Data.whole_cell_details.c_cr[index] || 0).toFixed(2)}
                        cell={(cell || 0).toFixed(3)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 상단 데이터*/}
            <div className="flex justify-between space-x-4 " >
                {DIAG_1.map((elem, index) => (
                    <div key={index} className="flex-col flex-1 bg-hw-dark-2 rounded-2xl shadow-md p-3 overflow-hidden">
                        <p className="text-[15px] p-5">{trans(elem.title)}</p>
                        <p className="flex items-end justify-center p-5 border-t">{elem.value}</p>
                    </div>
                ))}
            </div>
            {/* 원형그래프들 */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex flex-col flex-4 bg-hw-dark-2 rounded-2xl shadow-md p-3 overflow-hidden">
                        <p className="text-xl p-5">{trans('batteryRating')}</p>
                        <p className="flex-1 flex items-center justify-center p-5 border-t text-6xl">{batGrade}</p>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-1 gap-5 bg-hw-dark-2 rounded-2xl shadow-md p-3">
                            {DIAG_2_A.map((elem, index) => <DiagRingChart key={index} title={elem.title} value={elem.value} />)}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="flex flex-1 gap-5 bg-hw-dark-2 rounded-2xl shadow-md p-3">
                            {DIAG_2_B.map((elem, index) => <DiagRingChart key={index} title={elem.title} value={elem.value} />)}
                        </div>
                    </div>
                </div>
            </div>
            {/* 박스형 그래프들 */}
            <div className="flex flex-col gap-4">
                {/* <FullWihthBox title={trans('rackCapacity')} body="-" /> */}
                <div className="flex gap-4">
                    <HalfWihthBox title={trans('rackCapacity')} body={chartBar(graphDatas[0], "", "Ah")} />{/*Rack 용량*/}
                    {/* <HalfWihthBox title={trans('cellCapacityMaxMinAve')} body="-" /> */}
                    <HalfWihthBox title={trans('cellCapacity')} body={chartBar(graphDatas[1], "", "Ah")} />{/*Cell 용량*/}
                </div>
                <div className="flex gap-4">
                    <HalfWihthBox title={trans('CellCapacityDistribution')} body={chartBar(graphDatas[2], "Ah", "Count")} />{/*Cell 용량 분포*/}
                    <HalfWihthBox title={trans('cellCapacity')} body={CrDesc} />{/*Cell 용량*/}
                </div>
                {/* <FullWihthBox title={trans('rackCapacityMaxMinAve')} body="-" /> */}
                <FullWihthBox title={trans('cellCapacityChangeTrend')} body={chartMultyLine(keyDatasMultyLine01, graphDatasMultyLine01, "Date", "Ah")} />{/*Cell 용량 변화 추세*/}
                <div className="flex gap-4">
                    <HalfWihthBox title={trans('cellRemainingBalance')} body={chartMultyWindowBar(graphDatas[3], "", "")} />{/*Cell 잔량 밸런스*/}
                    <HalfWihthBox title={trans('overallSectionRemainingBalance')} body={chartMultyLine(keyDatasMultyLine02, graphDatasMultyLine02, "Date", trans('maxSocDeviation'))} />{/*전체 구간 잔량 밸런스*/}
                </div>
                <div className="flex gap-4">
                    <HalfWihthBox title={trans('rackResistanceConfiguration')} body={chartPie(graphDatasPie01)} />{/*Rack저항 구성*/}
                    <HalfWihthBox title={trans('cellResistanceMaxMinAve')} body={chartBar(graphDatas[4], "", "mΩ")} /> {/*셀저항(최대,최소,평균)*/}
                </div>
                <div className="flex gap-4">
                    <HalfWihthBox title={trans('cellResistanceHistogram')} body={chartBar(graphDatas[5], "mΩ", "Cnt")} />{/*Cell 저항 Histogram*/}
                    <HalfWihthBox title={trans('cellResistance')} body={DcirDesc} />{/*Cell 저항*/}
                </div>
                <FullWihthBox title={trans('cellResistanceChangeTrendMaxMinAve')} body={chartMultyLine(keyDatasMultyLine03, graphDatasMultyLine03, "Date", "mΩ")} />{/*Cell 저항 변화추세*/}
                <div className="flex gap-4">
                    <HalfWihthBox title={trans('availableCapacityByRackTemperature')} body={chartMultyLine(keyDatasMultyLine04, graphDatasMultyLine04, "℃", "Ah")} />{/*Rack 온도별 가용용량*/}
                    <HalfWihthBox title={trans('resistanceByRackTemperature')} body={chartMultyLine(keyDatasMultyLine05, graphDatasMultyLine05, "℃", "mΩ")} />{/*Rack 온도별 저항*/}
                </div>
                {/* <FullWihthBox title={trans('fullCellDetails')} body="-" /> */}
                <FullWihthBox title={trans('fullCellDetails')} body={DetailBoxes} />
            </div>

        </div>

    )
}