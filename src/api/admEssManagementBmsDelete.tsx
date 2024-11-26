import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';


interface AdmEssManagementBmsDelete {    
    errorMsg_bmsDelete: rtnMsg | null;    
    storeBmsDelete: ( bms_id: number, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmEssManagementBmsDelete = create<AdmEssManagementBmsDelete>((set) => ({
    errorMsg_bmsDelete: null,
    storeBmsDelete: async ( bms_id: number, trans ) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "bms" ,
                "action": "delete",
                "bms_id": bms_id,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                if( errorMsg.error === '23503' ) {
                    alert(trans('essCannotBeDeletedChild'));    //'하위 데이터를 삭제 후. 다시 실행해 주세요.'
                    return;
                }
                set({ errorMsg_bmsDelete: errorMsg });
                // useNeedAdmEssReload()                
                alert(trans('essHasBeenDeleted'));    //'ESS를 삭제했습니다.'
            } else {
                alert(trans('essCannotBeDeleted'));  //'ESS를 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('essCannotBeDeleted'));  //'ESS를 삭제 할 수 없습니다.'
        }
    },
}));
export default useAdmEssManagementBmsDelete;

