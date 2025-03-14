import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmModelCustomDeviceGroupList } from '@/api/types/admin/typeAdmModelCustomDeviceGroup';

interface AdmModelCustomDeviceGroup {
    dataListModelCustomDeviceGroup: Array<typeAdmModelCustomDeviceGroupList> | null;
    storeModelCustomDeviceGroupList: (customer_id: number, trans: (key: string) => string) => void;

    rtnMsg_create: rtnMsg | null;
    storeModelCustomDeviceGroupCreate: (
        name: string,
        referred_manufacturer: number,
        device_list: number[],
        description: string,
        trans: (key: string) => string
    ) => void;

    rtnMsg_delete: rtnMsg | null;
    storeModelCustomDeviceGroupDelete: (id: string, trans: (key: string) => string) => void;

    rtnMsg_edit: rtnMsg | null;
    storeModelCustomDeviceGroupEdit: (
        id: string,
        name: string,
        referred_manufacturer: number,
        device_list: number[],
        description: string,
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
        alert(trans('인증 오류가 발생했습니다. 다시 로그인해주세요.'));
        window.location.href = '/login';
        return true;
    }
    return false;
};

const useAdmModelCustomDeviceGroup = create<AdmModelCustomDeviceGroup>((set) => ({
    dataListModelCustomDeviceGroup: null,
    storeModelCustomDeviceGroupList: async (customer_id: number, trans: (key: string) => string) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_group_custom_devices/', {
                customer_id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmModelCustomDeviceGroupList> = response.data.data;
                    set({ dataListModelCustomDeviceGroup: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기 그룹을 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기 그룹을 조회할 수 없습니다.'));
        }
    },

    rtnMsg_create: null,
    storeModelCustomDeviceGroupCreate: async (
        name: string,
        referred_manufacturer: number,
        device_list: number[],
        description: string,
        trans: (key: string) => string
    ) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_group_custom_device/', {
                name,
                referred_manufacturer,
                device_list,
                description
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_create: response.data });
                    alert(trans('기기 그룹을 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기 그룹을 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기 그룹을 생성할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeModelCustomDeviceGroupDelete: async (id: string, trans: (key: string) => string) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_group_custom_device/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('기기 그룹을 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기 그룹을 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기 그룹을 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeModelCustomDeviceGroupEdit: async (
        id: string,
        name: string,
        referred_manufacturer: number,
        device_list: number[],
        description: string,
        trans: (key: string) => string
    ) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_group_custom_device/', {
                id,
                name,
                referred_manufacturer,
                device_list,
                description
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('기기 그룹을 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기 그룹을 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기 그룹을 수정할 수 없습니다.'));
        }
    }
}));

export default useAdmModelCustomDeviceGroup; 