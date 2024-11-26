import { useTranslation } from 'react-i18next';
import DiagBarChart from "../graph/DiagBarGraph"
import DiagLineChart from "../graph/DiagLineGraph"
import DiagPieChart from "../graph/DiagPieGraph"
import { useEffect, useRef, useState } from 'react';
import { GraphData, LineDataType, PieDataType } from "../graph/GraphTypes.type"

type CommonBox = {
    title: string;
    body: string | Function | React.ReactNode;
    // body: string | React.ReactNode;
}

const FullWihthBox = ({ title, body }: CommonBox) => {
    if (typeof body === 'string') {
        return (
            <div className="w-full flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center p-5 border-t">{body}</p>
            </div>
        );
    } else if (typeof body === 'function') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center border-t">{body()}</p>
            </div>
        );
    } else {
        return (
            <div className="w-full flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center p-5 border-t">{body}</p>
            </div>
        );
    }
};

const HalfWihthBox = ({ title, body }: CommonBox) => {
    if (typeof body === 'string') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center p-5 border-t">{body}</p>
            </div>
        );
    } else if (typeof body === 'function') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center border-t">{body()}</p>
            </div>
        );
    }
    else {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <p className="text-xl p-5">{title}</p>
                <p className="flex-1 flex items-center justify-center border-t">{body}</p>
            </div>
        );
    }
};


export default function Diag_3() {
    const { t: trans } = useTranslation('translation');
    const [graphDatas, setGraphDatas] = useState<GraphData[]>([]);
    const [graphDatasMultyLine01, setGraphDatasMultyLine01] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine01, setKeyDatasMultyLine01] = useState<string[]>([]);
    const [graphDatasMultyLine02, setGraphDatasMultyLine02] = useState<LineDataType[]>([]);
    const [keyDatasMultyLine02, setKeyDatasMultyLine02] = useState<string[]>([]);
    const [graphDatasPie01, setGraphDatasPie01] = useState<PieDataType[]>([]);
    // const gaugeData = ;


    useEffect(() => {
        let _datas: Array<GraphData> = [];
        let _data: GraphData = {
            keyDatas: ["공칭 용량", "셀 평균 용량", "셀 최소 용량", "안전 용량", "실 가용 용량"],
            dataValues: [120, 200, 150, 80, 70],
            type: 0,    // bar
        };
        _datas.push(_data)
        _datas.push({
            keyDatas: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
            dataValues: [120, 200, 150, 80, 70, 140, 240, 50, 20],
            type: 1,    // bar + line
        })
        _datas.push({
            keyDatas: ["100", "200", "300", "400"],
            dataValues: [120, 200, 150, 80],
            type: 0,    // bar + line
        })
        setGraphDatas(_datas);
        // try {
        //     const response = await axios.get('https://api.mysite.com/data');
        //     const rawData = response.data;
        //     // 데이터 가공
        //     const seriesArray = rawData.map(item => ({
        //         name: item.name,
        //         type: item.type,
        //         data: item.values
        //     }));
        //     setChartData(seriesArray);
        // } catch (error) {
        //     console.error('Error fetching data: ', error);
        // }

        // 멀티라인 그래프 1         
        const columnsML01 = [
            {
                name: "Max",
                type: "line",
                data: [40, 50, 80, 140, 110, 20, 120, 90]
            },
            {
                name: "Ave",
                type: "line",
                data: [25, 35, 60, 130, 80, 15, 85, 85]
            },
            {
                name: "Min",
                type: "line",
                data: [10, 20, 40, 120, 50, 10, 50, 80]
            },
        ];
        setKeyDatasMultyLine01(["21", "22", "23", "24", "25", "26", "27", "28"]);  // x축
        setGraphDatasMultyLine01(columnsML01);      // 값

        // 멀티라인 그래프 2 (라인 하나)     
        const columnsML02 = [
            {
                name: "Max",
                type: "line",
                data: [30, 50, 80, 30, 95, 20, 50, 90]
            },

        ];
        setKeyDatasMultyLine02(["21", "22", "23", "24", "25", "26", "27", "28"]);  // x축
        setGraphDatasMultyLine02(columnsML02);      // 값

        // 파이 그래프 1
        const columnsPie01 = [
            {
                name: "Rack 저항",
                value: 42,
            },
            {
                name: "H/W 저항",
                value: 58,
            }
        ];
        setGraphDatasPie01(columnsPie01);      // 값

    }, []);

    const CrDesc = () => {
        return (
            <div className="flex flex-col gap-4 w-full px-5">
                <div className="flex justify-between">
                    <div className="">{trans('avgRackCapacity')}</div>
                    <div className="">- Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxRackCapacity')}</div>
                    <div className="">- Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('minRackCapacity')}</div>
                    <div className="">- Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('avgRackCapacityDeviation')}</div>
                    <div className="">- %</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxRackCapacityDeviation')}</div>
                    <div className="">- %</div>
                </div>
            </div>
        );
    };
    const DcirDesc = () => {
        return (
            <div className="flex flex-col gap-4 w-full px-5">
                <div className="flex justify-between">
                    <div className="">{trans('avgRackCapacity')}</div>
                    <div className="">- Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxRackCapacity')}</div>
                    <div className="">- Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('minRackCapacity')}</div>
                    <div className="">- Ah</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('avgRackCapacityDeviation')}</div>
                    <div className="">- %</div>
                </div>
                <div className="flex justify-between">
                    <div className="">{trans('maxRackCapacityDeviation')}</div>
                    <div className="">- %</div>
                </div>
            </div>
        );
    };
    const chartBar = (datas: GraphData) => {
        return (
            <DiagBarChart datas={datas} />
        )
    };
    const chartMultyLine = (keys: string[], datas: LineDataType[]) => {
        return (
            <DiagLineChart keys={keys} datas={datas} />
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


    return (
        <div className="flex flex-col gap-4">
            {/* <FullWihthBox title={trans('rackCapacity')} body="-" /> */}
            <div className="flex gap-4">
                <HalfWihthBox title={trans('rackCapacity')} body={chartBar(graphDatas[0])} />
                {/* <HalfWihthBox title={trans('cellCapacityMaxMinAve')} body="-" /> */}
                <HalfWihthBox title={trans('cellCapacity')} body={chartBar(graphDatas[0])} />
            </div>
            <div className="flex gap-4">
                <HalfWihthBox title={trans('CellCapacityDistribution')} body={chartBar(graphDatas[1])} />
                <HalfWihthBox title={trans('cellCapacity')} body={CrDesc} />
            </div>
            {/* <FullWihthBox title={trans('rackCapacityMaxMinAve')} body="-" /> */}
            <FullWihthBox title={trans('cellCapacityChangeTrend')} body={chartMultyLine(keyDatasMultyLine01, graphDatasMultyLine01)} />
            <div className="flex gap-4">
                <HalfWihthBox title={trans('cellRemainingBalance')} body={chartBar(graphDatas[2])} />
                <HalfWihthBox title={trans('overallSectionRemainingBalance')} body={chartMultyLine(keyDatasMultyLine02, graphDatasMultyLine02)} />
            </div>
            <div className="flex gap-4">
                <HalfWihthBox title={trans('rackResistanceConfiguration')} body={chartPie(graphDatasPie01)} />
                <HalfWihthBox title={trans('cellResistanceMaxMinAve')} body={chartBar(graphDatas[0])} />
            </div>
            <div className="flex gap-4">
                <HalfWihthBox title={trans('cellResistanceHistogram')} body={chartBar(graphDatas[1])} />
                <HalfWihthBox title={trans('cellResistance')} body={DcirDesc} />
            </div>
            <FullWihthBox title={trans('cellResistanceChangeTrendMaxMinAve')} body={chartMultyLine(keyDatasMultyLine01, graphDatasMultyLine01)} />
            <div className="flex gap-4">
                <HalfWihthBox title={trans('availableCapacityByRackTemperature')} body={chartMultyLine(keyDatasMultyLine02, graphDatasMultyLine02)} />
                <HalfWihthBox title={trans('resistanceByRackTemperature')} body={chartMultyLine(keyDatasMultyLine02, graphDatasMultyLine02)} />
            </div>
            {/* <FullWihthBox title={trans('fullCellDetails')} body="-" /> */}
        </div>
    );
};
