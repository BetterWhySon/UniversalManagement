export type GraphData = {
    type: number;   // 0 : bar , 1 : bar + line
    keyDatas: string[];
    dataValues: number[];
    tooltip: any;
}

export type HistogramData = {    
    type: number;   // 0 : bar , 1 : bar + line
    keyDatas: string[];
    name1: string;
    name2: string;
    dataValues1: number[];
    dataValues2: number[];
    tooltip: any;
    itemStyle1: any;
    itemStyle2: any;
}

export type LineDataType = {
    name: string;
    type: string;
    // data: number[];
    data: (number | undefined)[];
    itemStyle: any;
};

export type PieDataType = {
    name: string;
    value: number;
};

export type MultyWindowData = {    
    type: number;   // 0 : bar , 1 : bar + line
    keyDatas: string[];
    name1: string;
    name2: string;
    dataValues100ZoneBase:number[];
    dataValues100ZoneValue:number[];
    dataValues0ZoneBase:number[];
    dataValues0ZoneValue:number[];
    tooltip: any;
    // itemStyle1: any;
    // itemStyle2: any;
}
            