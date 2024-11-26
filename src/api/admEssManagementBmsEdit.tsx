import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagementBmsEdit {    
    errorMsg_bmsEdit: rtnMsg | null;    
    storeBmsEdit: ( ship_id: string, model_id: number, bms_name: string, alias: string, aliasForeign: string, rack_count: number, capacity: number ,bms_id: number, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    error: string;    

}

const useAdmEssManagementBmsEdit = create<AdmEssManagementBmsEdit>((set) => ({
    errorMsg_bmsEdit: null,
    storeBmsEdit: async ( ship_id: string, model_id: number, bms_name: string, alias: string, aliasForeign: string, rack_count: number, capacity: number ,bms_id: number, trans ) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "bms" ,
                "action": "modify",
                "ship_id": ship_id,
                "model_id": model_id,
                "bms_name": bms_name,
                "alias": alias,
                "alias_foreign": aliasForeign,
                "rack_count": rack_count,
                "capacity": capacity,
                "bms_id": bms_id,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_bmsEdit: errorMsg });
                // useNeedAdmEssReload()
                alert(trans('essHasBeenModified'));   //'ESS를 수정했습니다.'
            } else {
                alert(trans('essCannotBeModified'));    //'BMS를 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('essCannotBeModified'));    //'BMS를 수정 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementBmsEdit;

