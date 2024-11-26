import { create } from 'zustand';
import { SystemInfoRtBmsType, SystemInfoRtRackDetailType, SystemInfoRtRackDetailAlarmType } from '@/types/systemInfoRt.type';
import useSystemInfoStatusData from './systemInfoStatusData';

interface SystemInfoRtSocketState {
    // systemInfoRtBmsData: SystemInfoRtBmsType | null; 
    systemInfoRtRackDetail: SystemInfoRtRackDetailType | null;
    systemInfoRtRackDetailAlarm: SystemInfoRtRackDetailAlarmType | null;
    socket: WebSocket | null;
    timeoutID: NodeJS.Timeout | number;
    setSocket: (socket: WebSocket | null) => void;
    connectReck: (url: string) => void;
    disconnectReck: () => void;
}

const useSystemInfoRtRackStore = create<SystemInfoRtSocketState>((set) => ({
    // systemInfoRtBmsData: null,
    systemInfoRtRackDetail: null,
    systemInfoRtRackDetailAlarm: null,
    socket: null,
    timeoutID: 0,
    // setData: (data) => set({ data }),
    setSocket: (socket) => set({ socket }),
    connectReck: (url) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('WebSocket Connected: useSystemInfoRtRackStore');
            socket.send(JSON.stringify({
                type: 'connect'
            }));
        }
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);
            if (response) {
                // const sysInfoB: SystemInfoRtBmsType = response.bms_data; 
                useSystemInfoStatusData.getState().setSystemInfoRtBmsData(response.bms_data);   // 직접 useSystemInfoStatusData값 업데이트
                const sysInfoR: SystemInfoRtRackDetailType = response.rack_data;
                const sysInfoA: SystemInfoRtRackDetailAlarmType = response.alarm_data;
                // set({ systemInfoRtBmsData: sysInfoB });
                set({ systemInfoRtRackDetail: sysInfoR });
                set({ systemInfoRtRackDetailAlarm: sysInfoA });
                // console.log(cConut);
            }

        }
        socket.onerror = (error) => {
            console.error('WebSocket Error', error);
        }
        socket.onclose = () => {
            console.log('WebSocket Disconnected: useSystemInfoRtRackStore');
        }
        set({ socket });
    },
    disconnectReck: () => {
        set((state) => {
            state.socket?.close();
            return { socket: null };
        });
    },
}));

export default useSystemInfoRtRackStore;
