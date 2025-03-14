import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmModelCustomList } from '@/api/types/admin/typeAdmModelCustom';

interface AdmModelCustom {
    dataListModelCustom: Array<typeAdmModelCustomList> | null;        
    storeModelCustomList: (customer_id: number, trans: (key: string) => string) => void;    

    rtnMsg_create: rtnMsg | null;    
    storeModelCustomCreate: (
        name: string, 
        referred_manufacturer: number,
        realtime_item: any[],
        alarm_item: any[],
        device_item: any[],
        configuration_item: any[],
        trans: (key: string) => string
    ) => void;    
    
    rtnMsg_delete: rtnMsg | null;    
    storeModelCustomDelete: (id: string, trans: (key: string) => string) => void;    
    
    rtnMsg_edit: rtnMsg | null;    
    storeModelCustomEdit: (
        id: string,
        name: string,
        referred_manufacturer: number,
        realtime_item: any[],
        alarm_item: any[],
        device_item: any[],
        configuration_item: any[],
        trans: (key: string) => string
    ) => void;    
}

interface rtnMsg {
    error: number;    
}

const getErrorMessage = (error: number, trans: (key: string) => string) => {
    switch (error) {
        case 1:
            return trans('이미 등록된 항목입니다.');
        case 2:
            return trans('필수 입력 필드를 확인해주세요.');
        case 3:
            return trans('이미 처리된 ID 입니다.');
        case 4:
            return trans('서버오류(RDB) 입니다.');
        case 5:
            return trans('서버오류(View) 입니다.');
        default:
            return trans('데이터를 처리할 수 없습니다.');
    }
};

const checkAuthError = (status: number, trans: (key: string) => string) => {
    if (status === 401) {
        alert(trans('인증이 만료되었습니다. 다시 로그인해주세요.'));
        localStorage.clear();
        window.location.href = '/login';
        return true;
    }
    if (status === 403) {
        alert(trans('관리자 권한이 없습니다.'));
        return true;
    }
    return false;
};

const useAdmModelCustom = create<AdmModelCustom>((set) => ({
    dataListModelCustom: null,
    
    storeModelCustomList: async (customer_id: number, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_model_customs/', {
                customer_id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmModelCustomList> = response.data.data;
                    set({ dataListModelCustom: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제조자 지정 데이터를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제조자 지정 데이터를 조회할 수 없습니다.'));
        }
    },

    rtnMsg_create: null,
    storeModelCustomCreate: async (
        name: string,
        referred_manufacturer: number,
        realtime_item: any[],
        alarm_item: any[],
        device_item: any[],
        configuration_item: any[],
        trans
    ) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_model_custom/', {                
                name,
                referred_manufacturer,
                realtime_item,
                realtime_item_cnt: realtime_item.length,
                alarm_item,
                alarm_item_cnt: alarm_item.length,
                device_item,
                device_item_cnt: device_item.length,
                configuration_item,
                configuration_item_cnt: configuration_item.length
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_create: response.data });
                    alert(trans('제조자 지정 데이터를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제조자 지정 데이터를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제조자 지정 데이터를 생성할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeModelCustomDelete: async (id: string, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_model_custom/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('제조자 지정 데이터를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제조자 지정 데이터를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제조자 지정 데이터를 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeModelCustomEdit: async (
        id: string,
        name: string,
        referred_manufacturer: number,
        realtime_item: any[],
        alarm_item: any[],
        device_item: any[],
        configuration_item: any[],
        trans
    ) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_model_custom/', {
                id,
                name,
                referred_manufacturer,
                realtime_item,
                realtime_item_cnt: realtime_item.length,
                alarm_item,
                alarm_item_cnt: alarm_item.length,
                device_item,
                device_item_cnt: device_item.length,
                configuration_item,
                configuration_item_cnt: configuration_item.length
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('제조자 지정 데이터를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제조자 지정 데이터를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제조자 지정 데이터를 수정할 수 없습니다.'));
        }
    },    
}));

export default useAdmModelCustom; 