import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmUserList } from '@/api/types/admin/typeAdmUser';

interface AdmUser {
    dataListUser: Array<typeAdmUserList> | null;        
    storeUserList: (trans: (key: string) => string) => void;    

    rtnMsg_creat: rtnMsg | null;    
    storeUserCreate: (user_id: string, username: string, password: string, customer_id: string, phonenumber: string, email: string, is_staff: boolean, trans: (key: string) => string) => void;    
    rtnMsg_delete: rtnMsg | null;    
    storeUserDelete: ( id: string, trans: (key: string) => string) => void;    
    rtnMsg_edit: rtnMsg | null;    
    storeUserEdit: (id: string, username: string, password: string, customer_id: string, phonenumber: string, email: string, is_staff: boolean, trans: (key: string) => string) => void;    
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

const useAdmUser = create<AdmUser>((set) => ({
    dataListUser: null,
    
    storeUserList: async (trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_users/', {}, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmUserList> = response.data.data;
                    set({ dataListUser: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사용자를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사용자를 조회할 수 없습니다.'));
        }
    },

    rtnMsg_creat: null,
    storeUserCreate: async (user_id: string, username: string, password: string, customer_id: string, phonenumber: string, email: string, is_staff: boolean, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_user/', {                
                user_id,
                username,
                password,
                customer_id,
                phonenumber,
                email,
                is_staff
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_creat: response.data });
                    alert(trans('사용자를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사용자를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사용자를 생성할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeUserDelete: async (id: string, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_user/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('사용자를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사용자를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사용자를 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeUserEdit: async (id: string, username: string, password: string, customer_id: string, phonenumber: string, email: string, is_staff: boolean, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_user/', {
                id,
                username,
                password,
                customer_id,
                phonenumber,
                email,
                is_staff
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('사용자를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사용자를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사용자를 수정할 수 없습니다.'));
        }
    },    
}));

export default useAdmUser;

