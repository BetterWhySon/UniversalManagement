import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmCustomerList } from '@/api/types/admin/typeAdmCustomer';

interface AdmCustomer {
    dataListCustomer: Array<typeAdmCustomerList> | null;        
    storeCustomerList: (trans: (key: string) => string, customer_id?: string) => void;    

    rtnMsg_creat: rtnMsg | null;    
    storeCustomerCreate: ( name: string, address: string, identity_number: string, representative: string, phonenumber: string, business_field: string, email: string, trans: (key: string) => string) => void;    
    rtnMsg_delete: rtnMsg | null;    
    storeCustomerDelete: ( id: string, trans: (key: string) => string) => void;    
    rtnMsg_edit: rtnMsg | null;    
    storeCustomerEdit: (id: string, name: string, address: string, identity_number: string, representative: string, phonenumber: string, business_field: string, email: string, trans: (key: string) => string) => void;    
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

const useAdmCustomer = create<AdmCustomer>((set) => ({
    dataListCustomer: null,
    
    storeCustomerList: async (trans, customer_id) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_customers/', 
                customer_id ? { customer_id } : {}, 
                {
                    headers: { Authorization: "Bearer " + token },            
                }
            );
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmCustomerList> = response.data.data;
                    set({ dataListCustomer: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리업체를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리업체를 조회할 수 없습니다.'));
        }
    },

    rtnMsg_creat: null,
    storeCustomerCreate: async (name, address, identity_number, business_field, phonenumber, email, representative, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_customer/', {                
                name, address, identity_number, business_field, phonenumber, email, representative
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_creat: response.data });
                    alert(trans('관리업체를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리업체를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리업체를 생성할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeCustomerDelete: async (id, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_customer/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('관리업체를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리업체를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리업체를 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeCustomerEdit: async (id, name, address, identity_number, representative, phonenumber, business_field, email, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_customer/', {
                id, name, address, identity_number, representative, phonenumber, business_field, email
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('관리업체를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리업체를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리업체를 수정할 수 없습니다.'));
        }
    }
}));

export default useAdmCustomer;

