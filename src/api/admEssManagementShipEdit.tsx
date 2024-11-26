import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagementShipEdit {    
    errorMsg_shipEdit: rtnMsg | null;    
    storeShipEdit: ( ship_id: string, ship_name: string, ship_name_foreign: string, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    error: string;    
}

const useAdmEssManagementShipEdit = create<AdmEssManagementShipEdit>((set) => ({
    errorMsg_shipEdit: null,
    storeShipEdit: async ( ship_id: string, ship_name: string, ship_name_foreign: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "ship" ,
                "action": "modify",
                "ship_id": ship_id,
                "ship_name": ship_name,                
                "ship_name_foreign": ship_name_foreign,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_shipEdit: errorMsg });
                // useNeedAdmEssReload()
                alert(trans('shipHasBeenModified'));   //'선박정보를 수정했습니다.'
            } else {
                alert(trans('shipCannotBeModified'));   //'선박 정보를 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeModified'));   //'선박 정보를 수정 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementShipEdit;

