import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagementShipCreate {    
    errorMsg_shipCreat: rtnMsg | null;    
    storeShipCreate: ( site_id: string, ship_name: string, ship_name_foreign: string, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    errorMsg: string;    
}

const useAdmEssManagementShipCreate = create<AdmEssManagementShipCreate>((set) => ({
    errorMsg_shipCreat: null,
    storeShipCreate: async ( site_id: string, ship_name: string, ship_name_foreign: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "ship" ,
                "action": "create",
                "site_id": site_id,
                "ship_name": ship_name,
                "ship_name_foreign": ship_name_foreign,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_shipCreat: errorMsg });            
                alert(trans('shipHasBeenCreated'));    //'선박을 생성했습니다.'
            } else {
                alert(trans('shipCannotBeCreated'));    // '선박을 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeCreated'));    // '선박을 생성 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementShipCreate;

