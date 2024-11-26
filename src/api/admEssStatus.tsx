import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { BMS_FILTERS, SHIP_FILTERS, SITE_FILTERS } from '@/constants/ship-status.constant';
import { backendURL } from './URLs';

interface AdmEssStatus {
    dataList: Array<ISite_admEssStatus> | null;
    dataList_ship: Array<IShip_admEssStatus> | null;
    dataList_bms: Array<IBMS_admEssStatus> | null;
    dataList_search: Array<ISearch_admEssStatus> | null;

    dataList_filter: Array<ISite_admEssStatus> | null;

    storeDataList: (trans: (key: string) => string) => void;
    storeDataList_ship: (site_id: number, trans: (key: string) => string) => void;
    storeDataList_bms: (site_id: number, trans: (key: string) => string) => void;
    storeDataList_bms_search: (site_id: any, ship_id: any, bms_id: any, trans: (key: string) => string) => void;
    storeResetErrorCount: (bms_id: any, trans: (key: string) => string) => void;
}

interface ISearch_admEssStatus {
    site_id: number;
    site_name: string;
    site_name_foreign: string;
    ship_id: number;
    ship_name: string;
    ship_name_foreign: string;
    bms_name: string;
    bms_id: number;
    rack_count: number;
    modbus_rawdata_updated: string;
    modbus_rawdata_updated_cached: string;
    can_rawdata_updated: string;
    can_rawdata_updated_cached: string;
    last_log_updated: string;
    error_count: number;
    delayed_time: number;
    network_status: string;    
    null_status: boolean;
}
interface IBMS_admEssStatus {
    bms_name: string;
    bms_name_foreign: string;
    bms_id: number;    
}
interface IShip_admEssStatus {
    ship_name: string;
    ship_name_foreign: string;
    ship_id: number;
    // bmsList: Array<IBMS_admEssStatus>;
}
interface ISite_admEssStatus {
    site_name: string;
    site_name_foreign: string;
    site_id: number;    
    // shipList: Array<IShip_admEssStatus>;
}


const useAdmEssStatus = create<AdmEssStatus>((set) => ({
    dataList: null,
    dataList_ship: null,
    dataList_bms: null,
    dataList_search: null,
    dataList_filter: null,

    // 사이트 조회
    // storeDataList: (dataList) => set({ dataList }),
    storeDataList: async (trans) => {

        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_status/', {
                "id": "status",
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<ISite_admEssStatus> = response.data.dataList
                set({ dataList: dataList });                
            } else {
                alert(trans('siteCannotBeRetrieve'));    //'사이트를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('siteCannotBeRetrieve'));    //'사이트를 조회 할 수 없습니다.'
        }
    },

    // 선박 조회
    storeDataList_ship: async (site_id: number, trans) => {

        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_status/', {
                "id": "get_ship",
                "site_id": site_id,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<IShip_admEssStatus> = response.data.dataList
                set({ dataList_ship: dataList });
                // let _filters: Array<string> = [];
                // _filters.push("전체")
                // {
                //     dataList ? dataList.map((item) => {
                //         _filters.push(item.ship_name);
                //     }) : null!
                // };
                // SHIP_FILTERS.values = [];
                // SHIP_FILTERS.values = _filters;
            } else {
                alert(trans('shipCannotBeRetrieve'));   //선박을 조회 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeRetrieve'));   //선박을 조회 할 수 없습니다.
        }
    },

    // bms 조회
    storeDataList_bms: async (ship_id: number, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_status/', {
                "id": "get_bms",
                "ship_id": ship_id,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<IBMS_admEssStatus> = response.data.dataList
                set({ dataList_bms: dataList });
                // let _filters: Array<string> = [];
                // _filters.push("전체")
                // {
                //     dataList ? dataList.map((ite m) => {
                //         _filters.push(item.bms_name);
                //     }) : null
                // };
                // BMS_FILTERS.values = [];
                // BMS_FILTERS.values = _filters;
            } else {
                alert(trans('essCannotBeRetrieve'));   //bms를 조회 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('essCannotBeRetrieve'));   //bms를 조회 할 수 없습니다.
        }
    },

     // bms 검색
     storeDataList_bms_search: async (site_id: any, ship_id: any, bms_id: any, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_bms_info/', {                
                'site_id': site_id ?? null,
                'ship_id': ship_id ?? null,
                'bms_id': bms_id ?? null,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<ISearch_admEssStatus> = response.data.dataList
                dataList.sort((a, b) => {
                    var res = a.site_name.localeCompare(b.site_name, 'ko');
                    if (res != 0) return res;
                    res = a.ship_name.localeCompare(b.ship_name, 'ko');
                    if (res != 0) return res;
                    return a.bms_name.localeCompare(b.bms_name, 'ko');
                })
                set({ dataList_search: dataList });               
            } else {
                alert(trans('essCannotBeRetrieve'));   //bms를 조회 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            // alert(trans('bmsCannotBeRetrieve'));   //bms를 조회 할 수 없습니다.
        }
    },

    // reset_error_count
    storeResetErrorCount: async (bms_id: any, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'reset_error_count/', {                                
                'bms_id': bms_id ?? null,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                alert(trans("errorCountUpdateMsg"));      // 에러 발생 횟수 업데이트 요청을 전송하였습니다.
            } else {
                alert(trans('unableToUpdateErrorCount'));   //에러 횟수를 업데이트 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('unableToUpdateErrorCount'));   //에러 횟수를 업데이트 할 수 없습니다.
        }
    },

}));


export default useAdmEssStatus;

