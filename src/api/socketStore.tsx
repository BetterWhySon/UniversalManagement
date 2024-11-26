import { create } from 'zustand';

// 상태와 메서드 타입 정의
interface WebSocketState {
    dataList: Array<ISite> | null;
    sortedDataList: Array<ISite> | null;
    socket: WebSocket | null;
    navigateCB: Function;
    timeoutID: NodeJS.Timeout | number;
    setSocket: (socket: WebSocket | null) => void;
    connect: (url: string) => void;
    disconnect: (error: boolean) => void;
    setNavigateCB: (navigateCB: Function) => void;
}



interface IAlarm {
    level: number;
    alarm_id: string;
    alarm_item: string;
    rack_num: number;
    start_time: number;
}
interface IBMS {
    bmsName: string;
    bmsName_foreign: string;
    bms_id: number;
    alias: string;
    alias_foreign: string;
    bmsData: {
        trans_status: number;
        ems_mode: number;
        ems_status_info: number;
        ems_volt: number;
        ems_crnt: number;
        ems_soc: number;
        ems_temp_avg: number;
        ems_humi: number;
        ems_acc_dischg_amount: number;
        ems_capacity: number,
        ems_instant_dischg_amount: number,
        ems_day_dischg_amount: number,
        ems_acc_dischg_time: number,
        ems_day_dischg_time: number,
        ems_heartcnt: number,
        rack_alarmData: number,
        arack_cnt: number,
        status: {
            id: number,
            item: string,
        }
    };
    alarmData: Array<IAlarm>;
    rack_alarmData: Array<IAlarm>;
}
interface IShip {
    shipName: string;
    shipName_foreign: string;
    bmsList: Array<IBMS>;
}
interface ISite {
    siteName: string;
    siteName_foreign: string;
    left: number;
    top: number;
    shipList: Array<IShip>;
}

const splitDataList = (dataList: Array<ISite>) => {
    return dataList.flatMap(site =>
        site.shipList.flatMap(ship =>
            ship.bmsList.map(bms => ({
                ...site,
                shipList: [{
                    ...ship,
                    bmsList: [bms]
                }]
            }))
        )
    );
}

const sortDataList = (data: Array<ISite>) => {
    return data.sort((a, b) => {
        const aHasTransStatus = a.shipList.some(ship =>
            ship.bmsList.some(bms => bms.bmsData && bms.bmsData.trans_status !== undefined)
        );
        const bHasTransStatus = b.shipList.some(ship =>
            ship.bmsList.some(bms => bms.bmsData && bms.bmsData.trans_status !== undefined)
        );

        const aTransStatus = aHasTransStatus ? a.shipList[0].bmsList[0].bmsData.trans_status : 2;
        const bTransStatus = bHasTransStatus ? b.shipList[0].bmsList[0].bmsData.trans_status : 2;
        if (aTransStatus !== bTransStatus) {
            return aTransStatus - bTransStatus;
        }
        const aAlarmMax = a.shipList[0].bmsList[0].alarmData.reduce((max, alarm) => {
            return alarm.level > max ? alarm.level : max;
        }, 0);
        const bAlarmMax = b.shipList[0].bmsList[0].alarmData.reduce((max, alarm) => {
            return alarm.level > max ? alarm.level : max;
        }, 0);

        if (bAlarmMax !== aAlarmMax) {
            return bAlarmMax - aAlarmMax;
        }

        return a.shipList[0].shipName.localeCompare(b.shipList[0].shipName, 'ko');
    });
};


const useWebSocketStore = create<WebSocketState>((set) => ({
    dataList: null,
    sortedDataList: null,
    socket: null,
    timeoutID: 0,
    navigateCB: () => { },
    setSocket: (socket) => set({ socket }),
    connect: (url) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            // console.log('WebSocket Connected: useWebSocketStore');
            socket.send(JSON.stringify({ type: 'connect' }));
        }
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            const dataList: Array<ISite> = response.dataList
            dataList.sort((a, b) => a.siteName.localeCompare(b.siteName, 'ko'));
            dataList.forEach(site => {
                site.shipList.forEach(ship => {
                    ship.bmsList.forEach(bms => {
                        const bmsData = bms.bmsData;
                        if (bmsData) {
                            bmsData.ems_acc_dischg_amount = Math.abs(bmsData.ems_acc_dischg_amount);
                            bmsData.ems_day_dischg_amount = Math.abs(bmsData.ems_day_dischg_amount);
                            bmsData.ems_instant_dischg_amount = Math.abs(bmsData.ems_instant_dischg_amount);
                        }
                    });
                });
            });

            set({ dataList: dataList });
            console.log(dataList);
            const spData = splitDataList(dataList)
            sortDataList(spData)
            set({ sortedDataList: spData })
        }
        socket.onerror = (error) => {
            // 에러 발생시 로그인 페이지로 이동
            console.error('WebSocket Error', error);
            useWebSocketStore.getState().navigateCB();
        }
        socket.onclose = (event) => {
            console.log('WebSocket onclose: useWebSocketStore');
            console.log(event);

            // 비정상 종료시 재연결
            if (event.wasClean == false) {
                const timerId = setTimeout(() => {
                    useWebSocketStore.getState().connect(url);
                }, 5000);
                console.log('onclose timerID ', timerId);
                set({ timeoutID: timerId });
            }
        }
        set({ socket });
    },
    disconnect: (error = true) => {
        console.log('WebSocket disconnect: useWebSocketStore');
        set((state) => {
            state.socket?.close();
            return { socket: null };
        });

        // 페이지 이동시 재연결 취소
        setTimeout(() => {
            clearTimeout(useWebSocketStore.getState().timeoutID);
        }, 2000);
        if (error) {
            useWebSocketStore.getState().navigateCB();
        }
    },
    setNavigateCB: (navigateCB: Function) => set({ navigateCB }),
}));

export default useWebSocketStore;
