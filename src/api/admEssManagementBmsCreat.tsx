import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagementBmsCreate {    
    errorMsg_bmsCreat: rtnMsg | null;    
    storeBmsCreate: ( ship_id: string, model_id: number, bms_name: string, alias: string, aliasForeign: string, rack_count: number, capacity: number, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    error: string;    
}

const useAdmEssManagementBmsCreate = create<AdmEssManagementBmsCreate>((set) => ({
    errorMsg_bmsCreat: null,
    storeBmsCreate: async ( ship_id: string, model_id: number, bms_name: string, alias: string, aliasForeign: string, rack_count: number, capacity: number, trans ) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "bms" ,
                "action": "create",
                "ship_id": ship_id,
                "model_id": model_id,
                "bms_name": bms_name,
                "alias": alias,
                "alias_foreign": aliasForeign,
                "rack_count": rack_count,
                "capacity": capacity,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_bmsCreat: errorMsg });            
                if(errorMsg.error == "1") { 
                    alert(trans('thisIsAnESSIDAndESSModelThatAlreadyExists'));       //'사용할 수 없는 아이디 입니다.'                
                } else if(errorMsg.error == "9") { 
                    alert(trans('dataCreationError'));      //'데이터 생성 오류 입니다.'
                } else {
                    alert(trans('essHasBeenCreated'));    //'ESS를 생성했습니다.'
                }
                // 0 : 정상
                // 1 : db data 중복 불가(unique constraint)
                // 9: Unown Error
            } else {
                alert(trans('essCannotBeCreated'));   //'ESS를 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('essCannotBeCreated'));   //'ESS를 생성 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementBmsCreate;

