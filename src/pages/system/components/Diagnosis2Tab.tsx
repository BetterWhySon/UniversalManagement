import useSystemInfoDiagnostics2 from '@/api/systemInfoDiagnostics2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DiagBarChart from "./graph/DiagBarGraph"
import DiagMultyBarChart from "./graph/DiagMultyBarGraph"
import DiagLineChart from "./graph/DiagLineGraph"
import DiagPieChart from "./graph/DiagPieGraph"
import DiagBoxplotChart from "./graph/DiagBoxplotGraph"
import { Diagnostics2 } from "@/types/diagnostics.type"

import { SetStateAction, useEffect, useRef, useState } from 'react';
import { GraphData, LineDataType, PieDataType } from "./graph/GraphTypes.type"
import { number } from 'echarts';
import { it } from 'node:test';
import { Dot } from '@/components/icons';

type CommonBox = {
    title: string;
    body: string | Function | React.ReactNode;
    dotType: number;
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

const HalfWihthBox = ({ title, body, dotType }: CommonBox) => {
    if (typeof body === 'string') {
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center p-5 border-t relative">
                    {body}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="dots-vertical" />
                    </div>
                </div>
            </div>
        );
    } else if (typeof body === 'function') {
        return (

            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-center border-t relative">
                    {body()}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="dots-vertical" />
                    </div>
                </div>
            </div>
        );
    } else {
        var dotColor1 = 'gray-7'
        var dotColor2 = 'gray-7'
        var dotColor3 = 'gray-7'
        if (dotType == 1) {
            dotColor1 = 'green-1'
        } else if (dotType == 2) {
            dotColor2 = 'orange-2'
        } if (dotType == 3) {
            dotColor3 = 'red-1'
        } else {
            dotColor3 = 'gray-7'
        }
        return (
            <div className="flex-1 flex flex-col bg-hw-dark-2 rounded-2xl shadow-md p-3 h-120">
                <div className="text-xl p-5">{title}</div>
                <div className="flex-1 flex items-center justify-start border-t relative">                    
                    <div className="flex flex-col justify-between h-16 ml-5 space-y-3">
                        <Dot color={dotColor1} />
                        <Dot color={dotColor2} />
                        <Dot color={dotColor3} />
                    </div>                 
                    <div className="ml-5 flex-grow flex justify-center items-center">
                        {body}
                    </div>
                </div>
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
    const { diagnostics2Data, storeDiagnostics2Data } = useSystemInfoDiagnostics2();
    const location = useLocation();
    const { t: trans } = useTranslation('translation');
    const navigate = useNavigate();
    // const keyDays = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
    // 날짜 : 오늘 이전 30일
    const [keyDays, setKeyDays] = useState<string[]>([]);
    // 전력제어진단 (boxplot)    
    const [boxplotData, setBoxplotData] = useState<any[]>([]);
    const [barData, setBarData] = useState<any[]>([]);
    // 배터리시스템 상세 전력 사용량 패턴 분석
    const [graphDatasMultyLine01, setGraphDatasMultyLine01] = useState<LineDataType[]>([]);
    // const [keyDatasMultyLine01, setKeyDatasMultyLine01] = useState<string[]>([]);

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
        storeDiagnostics2Data(Number(parts[2]), trans)
    }, [location]);

    useEffect(() => {
        console.log(diagnostics2Data);
        if (!diagnostics2Data) return;
    
        // 오늘 날짜로부터 30일 이전까지의 날짜 배열 생성 (역순)
        const today = new Date();
        const dateArray = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            dateArray.push(dateString);
        }
        setKeyDays(dateArray);
    
        const _boxplotData: any[] = [];
        const _barData: any[] = [];
        const _sysChg: (number | undefined)[] = [];
        const _sysDchg: (number | undefined)[] = [];
        const rackChgData: Record<number, (number | undefined)[]> = {}; // rack별 charge 데이터를 날짜별로 저장
        const rackDchgData: Record<number, (number | undefined)[]> = {}; // rack별 discharge 데이터를 날짜별로 저장
    
        let maxRackCount = 0;
    
        // 날짜 배열을 기반으로 diagnostics2Data를 채워넣음
        dateArray.forEach((date) => {
            const foundItem: Diagnostics2 | undefined = diagnostics2Data.find(item => item.date === date);
    
            // 전력제어 진단 (boxplot 데이터)
            const _tempArray = [];
            _tempArray[0] = foundItem?.power_control.min;
            _tempArray[1] = foundItem?.power_control.first_data;
            _tempArray[2] = foundItem?.power_control.last_data;
            _tempArray[3] = foundItem?.power_control.last_data;
            _tempArray[4] = foundItem?.power_control.max;
            _boxplotData.push(_tempArray);
    
            // 전력 초과 카운트 (bar 데이터)
            _barData.push(foundItem?.power_control.exceeded_count);
    
            // 시스템 전력 사용량 패턴 (system charge/discharge)
            _sysChg.push(foundItem?.power_pattern.system_chg);
            _sysDchg.push(foundItem?.power_pattern.system_dchg);
    
            // 먼저 maxRackCount를 확인하여 rack_data 갯수를 파악
            const currentRackCount = foundItem?.power_pattern.rack_data?.length || 0;
            maxRackCount = Math.max(maxRackCount, currentRackCount);
    
            // rack_data 갯수만큼 charge/discharge 데이터를 배열에 추가
            if (foundItem?.power_pattern.rack_data != undefined) {
                foundItem?.power_pattern.rack_data.forEach((rack, index) => {
                    const rackNumber = parseInt(Object.keys(rack)[0], 10); // rack_number를 동적으로 추출
                    const rackInfo = rack[rackNumber as unknown as keyof typeof rack]; // 해당 rack의 charge/discharge 데이터
    
                    // rackNumber에 해당하는 데이터가 없으면 초기화
                    if (!rackChgData[rackNumber]) {
                        rackChgData[rackNumber] = [];
                    }
                    if (!rackDchgData[rackNumber]) {
                        rackDchgData[rackNumber] = [];
                    }
    
                    // rack별 charge/discharge 데이터를 날짜별로 저장
                    rackChgData[rackNumber].push(rackInfo.chg ?? 0);
                    rackDchgData[rackNumber].push(rackInfo.dchg ?? 0);
                });
            } else {
                // rack_data가 없을 경우 undefined 값 저장
                for (let j = 0; j < maxRackCount; j++) {
                    const rackNumber = j + 1;
                    if (!rackChgData[rackNumber]) {
                        rackChgData[rackNumber] = [];
                    }
                    if (!rackDchgData[rackNumber]) {
                        rackDchgData[rackNumber] = [];
                    }
                    rackChgData[rackNumber].push(undefined);
                    rackDchgData[rackNumber].push(undefined);
                }
            }
        });
    
        setBoxplotData(_boxplotData);
        setBarData(_barData);
    
        // System Charge/Discharge 라인 추가
        const columns: LineDataType[] = [
            {
                name: "System Charge",
                type: "line",
                data: _sysChg.map(item => item ?? undefined),
                itemStyle: {},
            },
            {
                name: "System Discharge",
                type: "line",
                data: _sysDchg.map(item => item ?? undefined),
                itemStyle: {},
            },
        ];
    
        // 각 Rack의 Charge/Discharge 데이터를 라인으로 추가
        Object.keys(rackChgData).forEach((rackNumber) => {
            const rackNum = parseInt(rackNumber, 10);
            columns.push({
                name: `Rack${rackNum} Charge`,
                type: "line",
                data: rackChgData[rackNum] || [], // 해당 rack의 charge 데이터 배열
                itemStyle: {},
            });
            columns.push({
                name: `Rack${rackNum} Discharge`,
                type: "line",
                data: rackDchgData[rackNum] || [], // 해당 rack의 discharge 데이터 배열
                itemStyle: {},
            });
        });
    
        console.log(columns);
    
        setGraphDatasMultyLine01(columns); // 그래프 데이터 설정
    }, [diagnostics2Data]);
    
    


    const chartMultyLine = (keys: string[], datas: LineDataType[], xName: string, yName: string) => {
        return (
            <DiagLineChart keys={keys} datas={datas} xName={xName} yName={yName} />
        )
    };
    const chartBoxplot = (boxplotData: number[][], barData: number[], keyDays: string[], xName: string, yName: string) => {
        return (
            <DiagBoxplotChart boxplotData={boxplotData} barData={barData} keyDays={keyDays} xName={xName} yName={yName} />
        )
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 박스형 그래프들 */}
            <div className="flex flex-col gap-4">
                {/* <FullWihthBox title={trans('rackCapacity')} body="-" /> */}
                <div className="flex gap-4">
                    {diagnostics2Data && diagnostics2Data.length > 0 && (
                        <HalfWihthBox title={trans('powerControlDiagnosis')} body={chartBoxplot(boxplotData, barData, keyDays, "Day", "kW")} dotType={diagnostics2Data[0].power_control_signal} />
                    )}
                </div>
                <div className="flex gap-4">
                    {diagnostics2Data && diagnostics2Data.length > 0 && (
                        <HalfWihthBox title={trans('batterySystemDetailedPowerUsagePatternAnalysis')} body={chartMultyLine(keyDays, graphDatasMultyLine01, "Day", "kW")} dotType={diagnostics2Data[0].power_pattern_signal} />
                    )}
                </div>
            </div>
        </div>
    )
}