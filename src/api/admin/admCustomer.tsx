import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmCustomerList } from '@/api/types/admin/typeAdmCustomer';

interface AdmCustomer {
    dataListCustomer: Array<typeAdmCustomerList> | null;        
    storeCustomerList: (trans: (key: string) => string) => void;    

    rtnMsg_creat: rtnMsg | null;    
    storeCustomerCreate: ( name: string, address: string, identity_number: string, representative: string, phonenumber: string, business_field: string, email: string, trans: (key: string) => string) => void;    
    rtnMsg_delete: rtnMsg | null;    
    storeCustomerDelete: ( id: string, trans: (key: string) => string) => void;    
    rtnMsg_edit: rtnMsg | null;    
    storeCustomerEdit: (id: string, name: string, address: string, identity_number: string, representative: string, phonenumber: string, business_field: string, email: string, trans: (key: string) => string) => void;    
}
interface rtnMsg {
    error: string;    
}

const useAdmCustomer = create<AdmCustomer>((set) => ({
    dataListCustomer: null,
    
    storeCustomerList: async (trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_customers/',{                
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const dataList: Array<typeAdmCustomerList> = response.data.data
                set({ dataListCustomer: dataList });                
            } else {
                alert(trans('groupCannotBeRetrieve'));   //'폴더(그룹)를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('groupCannotBeRetrieve'));   //'폴더(그룹)를 조회 할 수 없습니다.'
        }
    },

    rtnMsg_creat: null,
    storeCustomerCreate: async ( name: string, address: string, identity_number: string, business_field: string, phonenumber: string, email: string, representative: string, trans ) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_customer/',{                
                "name": name,
                "address": address,
                "identity_number": identity_number,
                "business_field": business_field,
                "phonenumber": phonenumber,
                "email": email,
                "representative": representative,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const rtnMsg: rtnMsg = response.data
                set({ rtnMsg_creat: rtnMsg });             
                alert(trans('관리업체를 생성했습니다.')); // '파일을 생성했습니다.'
            } else {
                alert(trans('관리업체를 생성 할수 없습니다.')); // '파일를 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('관리업체를 생성 할수 없습니다.')); // '파일를 생성 할 수 없습니다.'
        }
    },

    rtnMsg_delete: null,
    storeCustomerDelete: async (id: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_customer/',{
                "id": id ,                
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const rtnMsg: rtnMsg = response.data
                set({ rtnMsg_delete: rtnMsg });
                // useNeedAdmEssReload()
                if(rtnMsg.error != "0") { 
                    alert(trans('관리업체를 삭제 할수 없습니다.'));    // '파일을 삭제 할 수 없습니다.'
                } else {
                    alert(trans('관리업체를 삭제 했습니다.')); // '파일을 삭제했습니다.'
                }
            } else {
                alert(trans('관리업체를 삭제 할수 없습니다.'));        // '파일을 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('관리업체를 삭제 할수 없습니다.'));        // '파일을 삭제 할 수 없습니다.'
        }
    },

    rtnMsg_edit: null,
    storeCustomerEdit: async (id: string, name: string, address: string, identity_number: string, representative: string, phonenumber: string, business_field: string, email: string, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_customer/',{
                "id": id,
                "name": name,
                "address": address,
                "identity_number": identity_number,
                "representative": representative,
                "phonenumber": phonenumber,
                "business_field": business_field,
                "email": email,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const rtnMsg: rtnMsg = response.data
                set({ rtnMsg_edit: rtnMsg });                
                alert(trans('관리업체를 수정했습니다.')); // '파일을 수정했습니다.'
            } else {
                alert(trans('관리업체를 수정 할수 없습니다.'));        //'파일을 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('관리업체를 수정 할수 없습니다.'));        //'파일을 수정 할 수 없습니다.'
        }
    },    
}));

export default useAdmCustomer;

