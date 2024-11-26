import { create } from 'zustand';
import { PeriodType } from '@/enums/graph';
import { Dayjs } from 'dayjs';

export interface GraphInfo {
    gid: number;
    page: string;
    type: string;
    id: string;
    name: string;
    checked: boolean;
    graphType: GraphType;
    min: number | null;
    max: number | null;
    unit: string;
    data: Record<number, GraphData>;
    count: number;
}

export enum GraphType {
    LINE_1, LINE_3_RACK, LINE_3_CELL, LINE_3_MODULE, LINE_2_RACK
}

interface EmsGraphState {
    periodType: PeriodType;
    startTime: Dayjs | null;
    endTime: Dayjs | null;
    graphInfos: GraphInfo[];
    socket: WebSocket | null;
    setPeriodType: (type: PeriodType) => void;
    setStartTime: (startTime: Dayjs) => void;
    setEndTime: (endTime: Dayjs) => void;
    setCheckbox: (gid: number, checked: boolean) => void;
    connect: (url: string) => void;
    disconnect: () => void;
    setGraphInfos: (response: any, page: string) => void;
    resetGraphInfos: () => void;
}

interface GraphData {
    value: number | null;
    min: number | null;
    max: number | null;
    avg: number | null;
    rack_max_index: number | null;
    rack_min_index: number | null;
    module_max_index: number | null;
    module_min_index: number | null;
    cell_max_index: number | null;
    cell_min_index: number | null;
    cell_maxpack_index: number | null;
    cell_minpack_index: number | null;
}

const GRAPH_CHECKBOXS_EMS: Array<GraphInfo> = [
    { gid: 1, page: 'EMS', type: 'EMS', id: 'ems_volt', name: 'emsVolt', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: 'V', data: {}, count: 0 },
    { gid: 2, page: 'EMS', type: 'EMS', id: 'ems_crnt', name: 'emsCrnt', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: 'A', data: {}, count: 0 },
    { gid: 3, page: 'EMS', type: 'EMS', id: 'ems_soc', name: 'emsSoc', checked: true, graphType: GraphType.LINE_1, min: 0, max: 100, unit: '%', data: {}, count: 0 },
    { gid: 4, page: 'EMS', type: 'EMS', id: 'ems_temp_avg', name: 'emsTemp', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: '°C', data: {}, count: 0 },
    { gid: 5, page: 'EMS', type: 'EMS', id: 'ems_humi', name: 'emsHumi', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: '%', data: {}, count: 0 },
    { gid: 6, page: 'EMS', type: 'EMS', id: 'ems_acc_dischg_amount', name: 'emsAccDischgAmount', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: 'kWh', data: {}, count: 0 },
    { gid: 7, page: 'EMS', type: 'RACK', id: 'rack_volt', name: 'rackVolt', checked: true, graphType: GraphType.LINE_3_RACK, min: null, max: null, unit: 'V', data: {}, count: 0 },
    { gid: 8, page: 'EMS', type: 'RACK', id: 'rack_current', name: 'rackCrnt', checked: true, graphType: GraphType.LINE_2_RACK, min: null, max: null, unit: 'A', data: {}, count: 0 },
    { gid: 9, page: 'EMS', type: 'RACK', id: 'rack_temp', name: 'rackTemp', checked: true, graphType: GraphType.LINE_3_RACK, min: null, max: null, unit: '°C', data: {}, count: 0 },
    { gid: 10, page: 'EMS', type: 'CELL', id: 'cell_volt', name: 'cellVolt', checked: true, graphType: GraphType.LINE_3_CELL, min: null, max: null, unit: 'V', data: {}, count: 0 },
    { gid: 11, page: 'EMS', type: 'CELL', id: 'cell_temp', name: 'cellTemp', checked: true, graphType: GraphType.LINE_3_CELL, min: null, max: null, unit: '°C', data: {}, count: 0 },
    { gid: 12, page: 'RACK', type: 'RACK', id: 'rbms_volt', name: 'rbmsVolt', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: 'V', data: {}, count: 0 },
    { gid: 13, page: 'RACK', type: 'RACK', id: 'rbms_crnt', name: 'rbmsCrnt', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: 'A', data: {}, count: 0 },
    { gid: 14, page: 'RACK', type: 'RACK', id: 'rbms_soc', name: 'rbmsSoc', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: '%', data: {}, count: 0 },
    { gid: 15, page: 'RACK', type: 'RACK', id: 'rbms_soh', name: 'rbmsSoh', checked: true, graphType: GraphType.LINE_1, min: null, max: null, unit: '%', data: {}, count: 0 },
    { gid: 16, page: 'RACK', type: 'CELL', id: 'cell_volt', name: 'cellVolt', checked: true, graphType: GraphType.LINE_3_MODULE, min: null, max: null, unit: 'V', data: {}, count: 0 },
    { gid: 17, page: 'RACK', type: 'CELL', id: 'cell_temp', name: 'cellTemp', checked: true, graphType: GraphType.LINE_3_MODULE, min: null, max: null, unit: '°C', data: {}, count: 0 },
];

async function decompressGzipBlob(blob: Blob): Promise<string> {
    const response = new Response(blob);
    const decompressedStream = response.body!.pipeThrough(new DecompressionStream('gzip'));
    return await new Response(decompressedStream).text();
}


const systemEmsGraphStore = create<EmsGraphState>((set, get) => ({
    periodType: PeriodType.REALTIME,
    startTime: null,
    endTime: null,
    graphInfos: GRAPH_CHECKBOXS_EMS,
    socket: null,
    setPeriodType: (type: PeriodType) => set({ periodType: type }),
    setStartTime: (startTime: Dayjs) => set({ startTime }),
    setEndTime: (endTime: Dayjs) => set({ endTime }),
    setCheckbox: (gid: number, checked: boolean) => {
        set((state) => ({
            graphInfos: state.graphInfos.map(info =>
                info.gid === gid ? { ...info, checked } : info
            )
        }));
    },
    connect: (url: string) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('WebSocket systemEmsGraphStore Connected');
            socket.send(JSON.stringify({ type: 'connect' }));
        };
        socket.onmessage = async (event) => {
            try {
                const decompressedText = await decompressGzipBlob(event.data);
                const response = JSON.parse(decompressedText);
                set((state) => ({
                    graphInfos: state.graphInfos.map(info => ({
                        ...info,
                        data: response.reduce((acc: any, r: any) => {
                            acc[r.timestamp] = r[info.id];
                            return acc;
                        }, {}),
                        count: info.count + 1
                    }))
                }));
            } catch (error) {
                console.error('Error decompressing gzip Blob:', error);
            }
        };
        socket.onerror = (error) => {
            console.error('WebSocket Error', error);
        };
        socket.onclose = () => {
            console.log('WebSocket onclose systemEmsGraphStore');
        };
        set({ socket });
    },
    disconnect: () => {
        console.log('WebSocket disconnect');
        const { socket } = get();
        socket?.close();
        set({ socket: null });
    },
    setGraphInfos: (response: any, page: string) => {
        if (!response.dataList) {
            return;
        }
        set((state) => ({
            graphInfos: state.graphInfos.map(info =>
                info.page === page ? {
                    ...info,
                    data: response.dataList.reduce((acc: any, data: any) => {
                        acc[data.timestamp] = data[info.id];
                        return acc;
                    }, {}),
                    count: info.count + 1
                } : info
            )
        }));
    },
    resetGraphInfos: () => {
        set((state) => ({
            graphInfos: state.graphInfos.map(info => ({
                ...info,
                data: {},
                count: 0
            }))
        }));
    },
}));

export default systemEmsGraphStore;
