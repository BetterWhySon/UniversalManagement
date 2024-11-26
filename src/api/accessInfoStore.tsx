import { create } from 'zustand';

interface AccessInfoSocketState {
    connInfo: ConnectInfo | null;
    socket: WebSocket | null;
    navigateCB: Function;
    timeoutID: NodeJS.Timeout | number;
    setSocket: (socket: WebSocket | null) => void;
    connect: (url: string) => void;
    disconnect: (error: boolean) => void;
    setNavigateCB: (navigateCB: Function) => void;
}

interface ConnectInfo {
    connCount: number;
    version: string | undefined;
    location: string | undefined;
}

const useAccessInfoStore = create<AccessInfoSocketState>((set) => ({
    connInfo: null,
    socket: null,
    timeoutID: 0,
    navigateCB: () => { },
    // setData: (data) => set({ data }),
    setSocket: (socket) => set({ socket }),
    connect: (url) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('WebSocket Connected: useAccessInfoStore');
            socket.send(JSON.stringify({
                type: 'connect'

            }));
        }
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            const connectInfo: ConnectInfo = response
            
            set((state) => { 
                state.connInfo = {
                    connCount: connectInfo.connCount,
                    version: connectInfo.version ?? state.connInfo?.version,
                    location: connectInfo.location ?? state.connInfo?.location
                };
                return {};
            });
        }
        socket.onerror = (error) => {
            console.error('WebSocket Error', error);
            useAccessInfoStore.getState().navigateCB();
        }
        socket.onclose = (event) => {
            console.log('WebSocket Disconnected: useAccessInfoStore');
            if (event.wasClean == false) {
                const timeoutID = setTimeout(() => {
                    useAccessInfoStore.getState().connect(url);
                }, 5000);
                set({timeoutID});
            }
        }
        set({ socket });
    },
    
    disconnect: (error = true) => {
        set((state) => {
            state.socket?.close();
            return { socket: null };
        });
        console.log('useAccessInfoStore disconnect', error)
        setTimeout(() => {
            clearTimeout(useAccessInfoStore.getState().timeoutID)
        }, 2000);
        if (error) {
            useAccessInfoStore.getState().navigateCB();
        }
    },
    setNavigateCB: (navigateCB: Function) => set({ navigateCB }),
}));

export default useAccessInfoStore;
