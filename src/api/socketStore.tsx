import { create } from 'zustand';

// 대시보드 맵 데이터 타입 정의
interface MapSiteData {
    site_id: number;
    site_name: string;
    group_id?: number;
    group_name?: string;
    whole: number;
    online: number;
    lat: number;
    lon: number;
}

interface MapRealtimeInfo {
    site_name: string;
    group_name: string | null;
    device_name: string;
    field: string;
    manufacturer: string;
    clientid: string;
    model_name: string;
    user_name: string;
    phonenumber: string;
}

interface MapRealtimeData {
    clientid: string;
    coordinates: {
        lat: number;
        lon: number;
    };
    info?: MapRealtimeInfo;
}

interface MapResponse {
    map: Array<MapSiteData | { [clientId: string]: MapRealtimeData }>;
}

// 상태와 메서드 타입 정의
interface WebSocketState {
    response: any | null;
    socket: WebSocket | null;
    navigateCB: Function;
    timeoutID: NodeJS.Timeout | number;
    setSocket: (socket: WebSocket | null) => void;
    connect: (url: string, params?: { site?: number; group?: number; category: 'sites' | 'realtime' }) => void;
    disconnect: (error: boolean) => void;
    setNavigateCB: (navigateCB: Function) => void;
    setResponse: (response: any) => void;
    isConnected: boolean;
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
    response: null,
    socket: null,
    timeoutID: 0,
    navigateCB: () => { },
    setSocket: (socket) => set({ socket }),
    setResponse: (response) => set({ response }),
    connect: (url, params) => {
        // 디버깅 로그
        console.log('[socketStore] connect 호출됨:', {
            url,
            params: params ? {
                site: params.site,
                group: params.group,
                category: params.category
            } : '없음'
        });

        // URL에 쿼리 파라미터 추가
        const queryParams = new URLSearchParams();
        if (params) {
            // site가 null이나 0이면 쿼리에 추가하지 않음
            if (params.site !== undefined && params.site !== null && params.site !== 0) {
                queryParams.append('site', params.site.toString());
                console.log('[socketStore] site 파라미터 추가:', params.site);
            }
            // group이 null이나 0이 아닐 때만 추가
            if (params.group !== undefined && params.group !== null && params.group !== 0) {
                queryParams.append('group', params.group.toString());
                console.log('[socketStore] group 파라미터 추가:', params.group);
            }
            // category는 항상 필요
            queryParams.append('category', params.category);
            console.log('[socketStore] category 파라미터 추가:', params.category);
        }
        
        // URL 생성
        const queryString = queryParams.toString();
        const fullUrl = `${url}${queryString ? '&' + queryString : ''}`;
        console.log('[socketStore] 최종 연결 URL:', fullUrl);

        try {
            // 기존 소켓 닫기
            const currentSocket = useWebSocketStore.getState().socket;
            if (currentSocket) {
                console.log('[socketStore] 기존 소켓 연결 종료 (readyState:', currentSocket.readyState, ')');
                currentSocket.close();
            }

            // 새 소켓 생성
            console.log('[socketStore] 새 소켓 생성 시작...');
            const newSocket = new WebSocket(fullUrl);
            console.log('[socketStore] 소켓 객체 생성됨');
            
            newSocket.onopen = () => {
                console.log('[socketStore] WebSocket 연결 성공 - CONNECTED');
                set({ socket: newSocket, isConnected: true });
            };

            newSocket.onmessage = (event) => {
                try {
                    const response = JSON.parse(event.data);
                    console.log('[socketStore] 메시지 수신:', 
                        typeof response, 
                        response.map ? (
                            Array.isArray(response.map) 
                                ? '배열(' + response.map.length + ')'
                                : '객체(' + Object.keys(response.map).length + '키)'
                        ) : '맵 없음'
                    );
                    set({ response });
                } catch (error) {
                    console.error('[socketStore] 메시지 파싱 오류:', error);
                }
            };

            newSocket.onerror = (error) => {
                console.error('[socketStore] WebSocket 오류:', error);
                set({ isConnected: false });
                // 에러 발생 시 재연결 시도
                setTimeout(() => {
                    console.log('[socketStore] 오류 후 재연결 시도');
                    useWebSocketStore.getState().connect(url);
                }, 1000);
            };

            newSocket.onclose = (event) => {
                console.log('[socketStore] WebSocket 연결 종료 - 코드:', event.code, '이유:', event.reason);
                set({ isConnected: false });
            };

        } catch (error) {
            console.error('[socketStore] 소켓 생성 오류:', error);
            set({ isConnected: false });
        }
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
    isConnected: true,
}));

export default useWebSocketStore;
