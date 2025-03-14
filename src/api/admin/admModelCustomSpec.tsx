import { create } from 'zustand';
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmModelCustomSpecList } from '@/api/types/admin/typeAdmModelCustomSpec';

interface AdmModelCustomSpec {
    dataListModelCustomSpec: Array<typeAdmModelCustomSpecList> | null;
    storeModelCustomSpecList: (customer_id: number, trans: (key: string) => string) => void;

    rtnMsg_create: rtnMsg | null;
    storeModelCustomSpecCreate: (
        name: string,
        referred_manufacturer: number,
        type: number,
        unit: string,
        trans: (key: string) => string
    ) => void;

    rtnMsg_delete: rtnMsg | null;
    storeModelCustomSpecDelete: (id: string, trans: (key: string) => string) => void;

    rtnMsg_edit: rtnMsg | null;
    storeModelCustomSpecEdit: (
        id: string,
        name: string,
        referred_manufacturer: number,
        type: number,
        unit: string,
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

const useAdmModelCustomSpec = create<AdmModelCustomSpec>((set) => ({
    dataListModelCustomSpec: null,
    storeModelCustomSpecList: async (customer_id: number, trans: (key: string) => string) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_custom_configurations/', {
                customer_id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmModelCustomSpecList> = response.data.data;
                    set({ dataListModelCustomSpec: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제원 데이터를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제원 데이터를 조회할 수 없습니다.'));
        }
    },

    rtnMsg_create: null,
    storeModelCustomSpecCreate: async (
        name: string,
        referred_manufacturer: number,
        type: number,
        unit: string,
        trans: (key: string) => string
    ) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_custom_configuration/', {
                name,
                referred_manufacturer,
                type,
                unit
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_create: response.data });
                    alert(trans('제원 데이터를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제원 데이터를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제원 데이터를 생성할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeModelCustomSpecDelete: async (id: string, trans: (key: string) => string) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_custom_configuration/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('제원 데이터를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제원 데이터를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제원 데이터를 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeModelCustomSpecEdit: async (
        id: string,
        name: string,
        referred_manufacturer: number,
        type: number,
        unit: string,
        trans: (key: string) => string
    ) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_custom_configuration/', {
                id,
                name,
                referred_manufacturer,
                type,
                unit
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('제원 데이터를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('제원 데이터를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('제원 데이터를 수정할 수 없습니다.'));
        }
    }
}));

export default useAdmModelCustomSpec; 