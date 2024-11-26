import { create } from 'zustand';
import { SystemInfoRtBmsType, SystemInfoRtRackType } from '@/types/systemInfoRt.type';
import useSystemInfoStatusData from './systemInfoStatusData';


interface SystemInfoRtSocketState {
    systemInfoRtRackData: SystemInfoRtRackType | null; 
    trans_status: number | -1; 

    socket: WebSocket | null;
    timeoutID: NodeJS.Timeout | number;
    setSocket: (socket: WebSocket | null) => void;
    connectBms: (url: string) => void;
    disconnectBms: () => void;
}

interface ConnectInfo {
    connCount: number;
}

const useSystemInfoRtStore = create<SystemInfoRtSocketState>((set) => ({
    // systemInfoRtBmsData: null,
    systemInfoRtRackData: null,
    trans_status: -1,

    socket: null,
    timeoutID: 0,
    // setData: (data) => set({ data }),
    setSocket: (socket) => set({ socket }),
    connectBms: (url) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('WebSocket Connected: useSystemInfoRtStore');
            socket.send(JSON.stringify({ 
                type: 'connect'                 
            }));
        }
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);
            if( response ) {
                useSystemInfoStatusData.getState().setSystemInfoRtBmsData(response.bms_data);   // 직접 useSystemInfoStatusData값 업데이트
                const sysInfoR: SystemInfoRtRackType = response.rack_data//.connCount
                // set({ systemInfoRtBmsData: sysInfoB });
                set({ systemInfoRtRackData: sysInfoR });
                set({ trans_status:  response.bms_data.trans_status});
                // console.log(cConut);
            } else {
                useSystemInfoStatusData.getState().setSystemInfoRtBmsData(null);   // 직접 useSystemInfoStatusData값 업데이트
                set({ systemInfoRtRackData: null });
            }
            
        }
        socket.onerror = (error) => {
            console.error('WebSocket Error', error);
        }
        socket.onclose = () => {
            console.log('WebSocket Disconnected : useSystemInfoRtStore');
        }
        set({ socket });
    },
    disconnectBms: () => {
        set((state) => {
            state.socket?.close();
            return { socket: null };
        });
    },
}));

export default useSystemInfoRtStore;
