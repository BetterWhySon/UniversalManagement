import { create } from 'zustand';
import { SystemInfoRtCellDetailType } from '@/types/systemInfoRt.type';

interface SystemInfoRtCellState {    
    systemInfoRtCellDetail: SystemInfoRtCellDetailType | null;     
    socket: WebSocket | null;
    timeoutID: NodeJS.Timeout | number;
    setSocket: (socket: WebSocket | null) => void;
    connectCell: (url: string) => void;
    disconnectCell: () => void;
}

const useSystemInfoRtCellStore = create<SystemInfoRtCellState>((set) => ({
    systemInfoRtCellDetail: null,
    socket: null,
    timeoutID: 0,
    setSocket: (socket) => set({ socket }),
    connectCell: (url) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('WebSocket Connected: useSystemInfoRtCellStore');
            socket.send(JSON.stringify({ 
                type: 'connect'                 
            }));
        }
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);            
            const cellInfo: SystemInfoRtCellDetailType = response;
            set({ systemInfoRtCellDetail: cellInfo });
        }
        socket.onerror = (error) => {
            console.error('WebSocket Error', error);
        }
        socket.onclose = () => {
            console.log('WebSocket Disconnected: useSystemInfoRtCellStore');
        }
        set({ socket });
    },
    disconnectCell: () => {
        set((state) => {
            state.socket?.close();
            return { socket: null };
        });
    },
}));

export default useSystemInfoRtCellStore;
