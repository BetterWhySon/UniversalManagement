import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { GraphInfo, GraphType } from '@/api/systemEmsGraphStore';
import { useTranslation } from 'react-i18next';

const GraphEchart = (props: any) => {
    var chart: echarts.EChartsType | null = null;
    const graphInfo: GraphInfo = props.graphInfo;
    const chartRef = useRef<HTMLDivElement>(null);
    const { t: trans } = useTranslation('translation');
    const options = {
        backgroundColor: '#232931',
        xAxis: {
            type: 'time',
        },
        yAxis: {
            type: 'value',
            name: graphInfo.unit,
            min: graphInfo.min,
            max: graphInfo.max
        },
        toolbox: {
            itemSize: 25,
            feature: {
                dataZoom: {}
            }
        },
        animation: false,
    };

    setOptionByType(options, graphInfo);

    useEffect(() => {
        if (chartRef.current) {
            chart = echarts.init(chartRef.current, 'dark');
            chart.setOption(options);
        }
    }, []);
    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.getInstanceByDom(chartRef.current);
            chart?.clear();
            chart?.setOption(options);
        }
    }, [graphInfo.count]);
    return (
        <div className='flex flex-col h-[400px]'>
            <span className='mb-[16px] text-[16px] font-bold leading-[20px]'>{trans(graphInfo.name)}</span>
            <div ref={chartRef} className='w-full flex-1 flex items-center justify-center  bg-[#232931] text-black text-[64px] leading-[20px]'>
            </div>
        </div>
    );
}

const setOptionByType = (option: any, graphInfo: GraphInfo) => {
    if (
        Object.keys(graphInfo.data).length === 0 ||
        !Object.values(graphInfo.data).values().next().value
    ) {
        return;
    }
    let legend_data:String[];

    switch (graphInfo.graphType) {
        case GraphType.LINE_1:
            option['series'] = [{
                data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.value?.toFixed(2)]),
                type: 'line',
                lineStyle: {
                    color: '#0000'
                },
            }];
            option['tooltip'] = { trigger: 'axis' };
            break;
        case GraphType.LINE_3_RACK:
            legend_data = ['Max', "average", 'Min'];
            option['legend'] = {
                data: legend_data,
                selectedMode: false
            };
            option['series'] = [
                {
                    name: "Max",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.max?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "average",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.avg?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "Min",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.min?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
            ];
            option['tooltip'] = {
                trigger: 'axis',
                formatter: (params: any) => {
                    let str_arr = [`${params[0].axisValueLabel}`];
                    params.forEach((param: any) => {
                        const { seriesName, marker, value, axisValue } = param;
                        if (seriesName === 'average') {
                            str_arr.push(`${marker} ${seriesName} : <b>${value[1]}</b>`);
                        } else if (seriesName === 'Min') {
                            const { rack_min_index } = graphInfo.data[axisValue];
                            str_arr.push(`${marker} ${seriesName} Rack <b>${rack_min_index} : ${value[1]}</b>`);
                        } else if (seriesName === 'Max') {
                            const { rack_max_index } = graphInfo.data[axisValue];
                            str_arr.push(`${marker} ${seriesName} Rack <b>${rack_max_index} : ${value[1]}</b>`);
                        }
                    });
                    return str_arr.join('<br>')
                }
            };
            break;
        case GraphType.LINE_3_CELL:
            legend_data = ['Max', "average", 'Min'];
            option['legend'] = {
                data: legend_data,
                selectedMode: false
            };
            option['series'] = [
                {
                    name: "Max",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.max?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "average",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.avg?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "Min",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.min?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
            ];
            option['tooltip'] = {
                trigger: 'axis',
                formatter: (params: any) => {
                    let str_arr = [`${params[0].axisValueLabel}`];
                    params.forEach((param: any) => {
                        const { seriesName, marker, value, axisValue } = param;
                        if (seriesName === 'average') {
                            str_arr.push(`${marker} ${seriesName} : <b>${value[1]}</b>`);
                        } else if (seriesName === 'Min') {
                            const { rack_min_index, module_min_index, cell_min_index, cell_minpack_index } = graphInfo.data[axisValue];
                            if (cell_minpack_index) {
                                str_arr.push(`${marker} ${seriesName} Rack <b>${rack_min_index}</b>, Pack <b>${cell_minpack_index}</b>, Module <b>${module_min_index}</b>, Cell <b>${cell_min_index} : ${value[1]}</b>`);
                            }
                            else {
                                str_arr.push(`${marker} ${seriesName} Rack <b>${rack_min_index}</b>, Module <b>${module_min_index}</b>, Cell <b>${cell_min_index} : ${value[1]}</b>`);

                            }
                        } else if (seriesName === 'Max') {
                            const { rack_max_index, module_max_index, cell_max_index, cell_maxpack_index } = graphInfo.data[axisValue];
                            if (cell_maxpack_index) {
                                str_arr.push(`${marker} ${seriesName} Rack <b>${rack_max_index}</b>, Pack <b>${cell_maxpack_index}</b>, Module <b>${module_max_index}</b>, Cell <b>${cell_max_index} : ${value[1]}</b>`);
                            }
                            else {
                                str_arr.push(`${marker} ${seriesName} Rack <b>${rack_max_index}</b>, Module <b>${module_max_index}</b>, Cell <b>${cell_max_index} : ${value[1]}</b>`);

                            }
                        }
                    });
                    return str_arr.join('<br>')
                }
            };
            break;
        case GraphType.LINE_3_MODULE:
            legend_data = ['Max', "average", 'Min'];
            option['legend'] = {
                data: legend_data,
                selectedMode: false
            };
            option['series'] = [
                {
                    name: "Max",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.max?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "average",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.avg?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "Min",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.min?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
            ];
            option['tooltip'] = {
                trigger: 'axis',
                formatter: (params: any) => {
                    let str_arr = [`${params[0].axisValueLabel}`];
                    params.forEach((param: any) => {
                        const { seriesName, marker, value, axisValue } = param;
                        if (seriesName === 'average') {
                            str_arr.push(`${marker} ${seriesName} : <b>${value[1]}</b>`);
                        } else if (seriesName === 'Min') {
                            const { module_min_index, cell_min_index } = graphInfo.data[axisValue];
                            str_arr.push(`${marker} ${seriesName} Module <b>${module_min_index}</b>, Cell <b>${cell_min_index} : ${value[1]}</b>`);
                        } else if (seriesName === 'Max') {
                            const { module_max_index, cell_max_index } = graphInfo.data[axisValue];
                            str_arr.push(`${marker} ${seriesName} Module <b>${module_max_index}</b>, Cell <b>${cell_max_index} : ${value[1]}</b>`);
                        }
                    });
                    return str_arr.join('<br>')
                }
            };
            break;
        case GraphType.LINE_2_RACK:
            legend_data = ['Max', 'Min'];
            option['legend'] = {
                data: legend_data,
                selectedMode: false
            };
            option['series'] = [
                {
                    name: "Max",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.max?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
                {
                    name: "Min",
                    data: Object.entries(graphInfo.data).map(([key, value]) => [parseInt(key), value.min?.toFixed(2)]),
                    type: 'line',
                    lineStyle: {
                        color: '#0000'
                    },
                },
            ];
            option['tooltip'] = {
                trigger: 'axis',
                formatter: (params: any) => {
                    let str_arr = [`${params[0].axisValueLabel}`];
                    params.forEach((param: any) => {
                        const { seriesName, marker, value, axisValue } = param;
                        if (seriesName === 'Min') {
                            const { rack_min_index } = graphInfo.data[axisValue];
                            str_arr.push(`${marker} ${seriesName} Rack <b>${rack_min_index} : ${value[1]}</b>`);
                        } else if (seriesName === 'Max') {
                            const { rack_max_index } = graphInfo.data[axisValue];
                            str_arr.push(`${marker} ${seriesName} Rack <b>${rack_max_index} : ${value[1]}</b>`);
                        }
                    });
                    return str_arr.join('<br>')
                }
            };
            break;
        default:
            break;
    }
};

export default GraphEchart;